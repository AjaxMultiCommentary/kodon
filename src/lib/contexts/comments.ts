import { getContext, setContext } from 'svelte';

const commentsContextKey = Symbol('comments');

type CommentsContext = {
	highlightComments: (commentsToHighlight: (string | undefined)[]) => void;
};

export function getCommentsContext() {
	return getContext(commentsContextKey) as CommentsContext;
}

export function setCommentsContext(obj: CommentsContext) {
	setContext(commentsContextKey, obj);
}
