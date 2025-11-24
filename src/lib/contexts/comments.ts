import type { Comment } from '$lib/types.js';

import { getContext, setContext } from 'svelte';

const commentsContextKey = Symbol( 'comments');

type CommentsContext = {
  comments: Comment[],
};

export function getCommentsContext(): CommentsContext {
	return getContext(commentsContextKey) as CommentsContext;
}

export function setCommentsContext(obj: CommentsContext): void {
	setContext(commentsContextKey, obj);
}
