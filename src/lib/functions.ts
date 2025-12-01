import type { Comment, TextContainer, Token } from './types.js';

import lodash from 'lodash';
import frontMatter from 'front-matter';

import CTS_URN from '$lib/cts_urn.js';

const { dropWhile, isEqual, last, takeWhile } = lodash;

const GLOSSA_PROPERTY_REGEX = /^:(?<name>[^:\n]+):\s+(?<value>.*)(?:\n|$)/;
const URN_REGEX = /@(?<urn>[^\n]+)(?:\n|$)/u;

export function dropTokensUntilStartOfComment(tokens: Token[], comment: Comment) {
	return dropWhile(
		tokens,
		(t: Token) =>
			!(
				t.text.indexOf(comment.ctsUrn.tokens[0] || '') > -1 &&
				t.urn_index === comment.ctsUrn.tokenIndexes[0]
			)
	);
}

export function getCommentsForPassage(comments: Comment[], ctsUrn: CTS_URN) {
	return comments
		.filter((c) => c && ctsUrn.contains(c.ctsUrn))
		.sort((cA, cB) => {
			if (cA?.ctsUrn.integerCitations[0].every((v, i) => v === cB?.ctsUrn.integerCitations[0][i])) {
				if (cA?.ctsUrn.tokens.every((t) => typeof t === 'undefined')) {
					return -1;
				}

				if (cB?.ctsUrn.tokens.every((t) => typeof t === 'undefined')) {
					return 1;
				}

				return 0;
			}

			for (let i = 0, l = cA?.ctsUrn.integerCitations[0].length; i < l; i++) {
				if (cA?.ctsUrn.integerCitations[0][i] < cB?.ctsUrn.integerCitations[0][i]) {
					return -1;
				}

				if (cA?.ctsUrn.integerCitations[0][i] > cB?.ctsUrn.integerCitations[0][i]) {
					return 1;
				}
			}

			return 0;
		});
}

export function highlightComments(
	comments: Comment[],
	commentsToHighlight: (string | undefined)[]
) {
	const revisedComments = comments.map((comment: Comment) => {
		if (commentsToHighlight.includes(comment.citable_urn as string)) {
			return {
				...comment,
				isHighlighted: true
			};
		}

		return {
			...comment,
			isHighlighted: false
		};
	});

	return revisedComments;
}

interface TextContainerWithChildren extends TextContainer {
	children: TextContainerWithChildren[];
	parentIndex: number | null;
}

function nest(
	textContainers: TextContainerWithChildren[],
	parent: any = { index: -1 },
	tree: any = []
) {
	const children = textContainers.filter((child) => child.parentIndex === parent.index);

	if (parent.index === -1) {
		tree = children;
	} else {
		parent.children = children;
	}

	children.forEach((child) => nest(textContainers, child));

	return tree;
}

export function nestTextContainers(textContainers: TextContainer[]) {
	const sortedContainers = textContainers.toSorted(
		(a: TextContainer, b: TextContainer) =>
			a.char_offset - b.char_offset || a.end_char_offset - b.end_char_offset
	);

	const withParentIndexes = sortedContainers.map(
		(textContainer: TextContainer, index: number, containers: TextContainer[]) => {
			let parentIndex = containers.findLastIndex(
				(possibleParent: TextContainer) =>
					(!isEqual(possibleParent, textContainer) &&
						possibleParent.char_offset <= textContainer.char_offset &&
						possibleParent.end_char_offset > textContainer.end_char_offset) ||
					(possibleParent.char_offset < textContainer.char_offset &&
						possibleParent.end_char_offset >= textContainer.end_char_offset)
			);

			return {
				...textContainer,
				index,
				parentIndex
			};
		}
	) as TextContainerWithChildren[];

	const nestedContainers = nest(withParentIndexes);

	return nestedContainers;
}

export function parseCommentary(markdownString: string): Comment[] {
	// @ts-expect-error The frontMatter module isn't well-typed'
	const { attributes, body } = frontMatter(markdownString);
	const glossae = body
		.split('\n---\n')
		.map((g: string) => g.trim())
		.filter((g: string) => g !== '');

	return glossae.map((glossa: string) => parseGlossa(attributes, glossa));
}

export function parseGlossa(attributes: object, glossa: string) {
	const match = glossa.match(URN_REGEX);

	if (match?.groups?.urn) {
		const urn = match.groups.urn;
		let withProperties = glossa.replace(URN_REGEX, '').trim();
		const glossaProperties = {};

		let propMatch = withProperties.match(GLOSSA_PROPERTY_REGEX);

		while (propMatch?.groups?.name) {
			// @ts-expect-error glossaProperties are deliberately open-ended
			glossaProperties[propMatch.groups.name] = propMatch.groups.value;

			withProperties = withProperties.replace(GLOSSA_PROPERTY_REGEX, '').trim();
			propMatch = withProperties.match(GLOSSA_PROPERTY_REGEX);
		}

		return {
			commentaryAttributes: attributes,
			...glossaProperties,
			body: withProperties,
			ctsUrn: new CTS_URN(urn),
			rawBody: withProperties,
			urn
		};
	}
}

export function takeTokensUntilEndOfComment(tokens: Token[], comment: Comment) {
	const exclusive = takeWhile(
		tokens,
		(t: Token) =>
			!(
				t.text.indexOf(last(comment.ctsUrn.tokens) || '') > -1 &&
				t.urn_index === last(comment.ctsUrn.tokenIndexes)
			)
	);

	const excludedToken =
		tokens.find(
			(t) =>
				t.text.indexOf(last(comment.ctsUrn.tokens) || '') > -1 &&
				t.urn_index === last(comment.ctsUrn.tokenIndexes)
		) || [];

	return exclusive.concat(excludedToken);
}

export function isCommentContainedByTextContainer(comment: Comment) {
	return (
		comment.ctsUrn.integerCitations.length === 1 ||
		comment.ctsUrn.integerCitations[0].join('') === comment.ctsUrn.integerCitations[1].join('')
	);
}

export function tokenTestForCommentContainedByTextContainer(
	comment: Comment,
	token: Token,
	tokens: Token[]
) {
	if (token.urn_index > 0) {
		const withoutLeadingTokens = dropTokensUntilStartOfComment(tokens, comment);
		const availableTokens = takeTokensUntilEndOfComment(withoutLeadingTokens, comment);

		return availableTokens.find((t: Token) => t.xml_id === token.xml_id);
	}
}

export function tokenTestForCommentEndingInTextContainer(
	comment: Comment,
	token: Token,
	tokens: Token[]
) {
	return takeTokensUntilEndOfComment(tokens, comment).find((t: Token) => t.xml_id === token.xml_id);
}

export function tokenTestForCommentStartingInTextContainer(
	comment: Comment,
	token: Token,
	tokens: Token[]
) {
	return dropTokensUntilStartOfComment(tokens, comment).find(
		(t: Token) => t.xml_id === token.xml_id
	);
}
