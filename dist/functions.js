import _ from 'lodash';
export function dropTokensUntilStartOfComment(tokens, comment) {
    return _.dropWhile(tokens, (t) => !(t.text.indexOf(_.first(comment.ctsUrn.tokens) || '') > -1 &&
        t.urn_index === _.first(comment.ctsUrn.tokenIndexes)));
}
export function takeTokensUntilEndOfComment(tokens, comment) {
    const exclusive = _.takeWhile(tokens, (t) => !(t.text.indexOf(_.last(comment.ctsUrn.tokens) || '') > -1 &&
        t.urn_index === _.last(comment.ctsUrn.tokenIndexes)));
    const excludedToken = tokens.find((t) => t.text.indexOf(_.last(comment.ctsUrn.tokens) || '') > -1 &&
        t.urn_index === _.last(comment.ctsUrn.tokenIndexes)) || [];
    return exclusive.concat(excludedToken);
}
export function isCommentContainedByTextContainer(comment) {
    return (comment.ctsUrn.integerCitations.length === 1 ||
        comment.ctsUrn.integerCitations[0].join('') === comment.ctsUrn.integerCitations[1].join(''));
}
export function tokenTestForCommentContainedByTextContainer(comment, token, tokens) {
    if (token.urn_index > 0) {
        const withoutLeadingTokens = dropTokensUntilStartOfComment(tokens, comment);
        const availableTokens = takeTokensUntilEndOfComment(withoutLeadingTokens, comment);
        return availableTokens.find((t) => t.xml_id === token.xml_id);
    }
}
export function tokenTestForCommentEndingInTextContainer(comment, token, tokens) {
    return takeTokensUntilEndOfComment(tokens, comment).find((t) => t.xml_id === token.xml_id);
}
export function tokenTestForCommentStartingInTextContainer(comment, token, tokens) {
    return dropTokensUntilStartOfComment(tokens, comment).find((t) => t.xml_id === token.xml_id);
}
