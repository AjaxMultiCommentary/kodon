import { setCommentsContext } from '$lib/contexts/comments.js';
import { setTokenSelectionContext } from '$lib/contexts/tokenSelection.js';

const decorator = (Story: any) => {
	const noop = () => {};

	setCommentsContext({ highlightComments: noop });
	setTokenSelectionContext({ handleEndSelection: noop, handleStartSelection: noop });

	return Story();
};

export default decorator;
