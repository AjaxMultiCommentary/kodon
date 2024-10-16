import _ from 'lodash';
export function dropTokensUntilStartOfComment(tokens, comment) {
    return _.dropWhile(tokens, (t) => !(t.text.indexOf(_.first(comment.ctsUrn.tokens) || '') > -1 &&
        t.urn_index === _.first(comment.ctsUrn.tokenIndexes)));
}
function makeSpan(text = '', urn) {
    return {
        type: 'text_container',
        subtype: 'span',
        text,
        urn
    };
}
export function nestBlocks(blocks, root = undefined) {
    if (!root)
        return nestBlocks(blocks.slice(1), blocks[0]);
    blocks = blocks.sort((a, b) => a.start_offset - b.start_offset);
    function nestChildren(parent) {
        const urn = parent.urn;
        let children = [];
        for (let i = 0; i < blocks.length; i++) {
            const child = blocks[i];
            if (child.parentIndex === parent.index) {
                blocks.splice(i, 1);
                i--;
                child.children = nestChildren(child);
                if (child.children.length > 0) {
                    const preText = parent.text.slice(0, child.start_offset - parent.start_offset);
                    children.push(makeSpan(preText, urn));
                }
                children.push(child);
                if (child.children.length > 0) {
                    const nextChild = blocks[i + 1];
                    const postText = parent.text.slice(child.end_offset - parent.start_offset, nextChild ? nextChild.start_offset - parent.start_offset : parent.end_offset);
                    children.push(makeSpan(postText, urn));
                }
            }
        }
        return children;
    }
    root.children = nestChildren(root);
    return root;
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
