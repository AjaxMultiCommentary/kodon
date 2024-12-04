import { getContext, setContext } from 'svelte';
const tokenSelectionContextKey = Symbol('tokenSelection');
export function getTokenSelectionContext() {
    return getContext(tokenSelectionContextKey);
}
export function setTokenSelectionContext(obj) {
    setContext(tokenSelectionContextKey, obj);
}
