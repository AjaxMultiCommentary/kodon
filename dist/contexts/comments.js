import { getContext, setContext } from 'svelte';
const commentsContextKey = Symbol('comments');
export function getCommentsContext() {
    return getContext(commentsContextKey);
}
export function setCommentsContext(obj) {
    setContext(commentsContextKey, obj);
}
