import _ from 'lodash';

import type { Comment, Word } from './types.js';

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
