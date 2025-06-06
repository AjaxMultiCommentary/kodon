import _ from 'lodash';

import frontMatter from 'front-matter';

import CTS_URN from '$lib/cts_urn.js';

import type { Comment, Word } from './types.js';

const GLOSSA_PROPERTY_REGEX = /^:(?<name>[^:\n]+):\s+(?<value>.*)(?:\n|$)/;
const URN_REGEX = /@(?<urn>[^\n]+)(?:\n|$)/u;

export function dropTokensUntilStartOfComment(tokens: Word[], comment: Comment) {
	return _.dropWhile(
		tokens,
		(t: Word) =>
			!(
				t.text.indexOf(_.first(comment.ctsUrn.tokens) || '') > -1 &&
				t.urn_index === _.first(comment.ctsUrn.tokenIndexes)
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

function makeSpan(text: string = '', urn: string) {
	return {
		type: 'text_container',
		subtype: 'span',
		text,
		urn
	};
}

export function nestBlocks(blocks: any[], root: any = undefined) {
	if (!root) return nestBlocks(blocks.slice(1), blocks[0]);

	blocks = blocks.sort((a, b) => a.start_offset - b.start_offset);

	function nestChildren(parent: any) {
		const urn = parent.urn;

		let children = [];

		for (let i = 0; i < blocks.length; i++) {
			const child = blocks[i];

			if (child.parentIndex === parent.index) {
				blocks.splice(i, 1);
				i--;

				child.children = nestChildren(child);

				if (child.children.length > 0) {
					const preText = parent.text.slice(0, child.start_offset - parent.start_offset) as string;

					children.push(makeSpan(preText, urn));
				}

				children.push(child);

				if (child.children.length > 0) {
					const nextChild = blocks[i + 1];

					const postText = parent.text.slice(
						child.end_offset - parent.start_offset,
						nextChild ? nextChild.start_offset - parent.start_offset : parent.end_offset
					);

					children.push(makeSpan(postText, urn));
				}
			}
		}

		return children;
	}

	root.children = nestChildren(root);

	return root;
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

export function takeTokensUntilEndOfComment(tokens: Word[], comment: Comment) {
	const exclusive = _.takeWhile(
		tokens,
		(t: Word) =>
			!(
				t.text.indexOf(_.last(comment.ctsUrn.tokens) || '') > -1 &&
				t.urn_index === _.last(comment.ctsUrn.tokenIndexes)
			)
	);

	const excludedToken =
		tokens.find(
			(t) =>
				t.text.indexOf(_.last(comment.ctsUrn.tokens) || '') > -1 &&
				t.urn_index === _.last(comment.ctsUrn.tokenIndexes)
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
	token: Word,
	tokens: Word[]
) {
	if (token.urn_index > 0) {
		const withoutLeadingTokens = dropTokensUntilStartOfComment(tokens, comment);
		const availableTokens = takeTokensUntilEndOfComment(withoutLeadingTokens, comment);

		return availableTokens.find((t: Word) => t.xml_id === token.xml_id);
	}
}

export function tokenTestForCommentEndingInTextContainer(
	comment: Comment,
	token: Word,
	tokens: Word[]
) {
	return takeTokensUntilEndOfComment(tokens, comment).find((t: Word) => t.xml_id === token.xml_id);
}

export function tokenTestForCommentStartingInTextContainer(
	comment: Comment,
	token: Word,
	tokens: Word[]
) {
	return dropTokensUntilStartOfComment(tokens, comment).find(
		(t: Word) => t.xml_id === token.xml_id
	);
}
