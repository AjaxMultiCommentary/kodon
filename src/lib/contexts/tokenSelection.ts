import { getContext, setContext } from 'svelte';

const tokenSelectionContextKey = Symbol('tokenSelection');

type TokenSelectionContext = {
	handleEndSelection: (selectionURN: string) => void;
	handleStartSelection: (selectionURN: string) => void;
};

export function getTokenSelectionContext() {
	return getContext(tokenSelectionContextKey) as TokenSelectionContext;
}

export function setTokenSelectionContext(obj: TokenSelectionContext) {
	setContext(tokenSelectionContextKey, obj);
}
