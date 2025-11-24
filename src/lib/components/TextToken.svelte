<script lang="ts">
	import type { Token } from '$lib/types.js';

	import { getTokenSelectionContext } from '$lib/contexts/tokenSelection.js';

	interface Props {
		/**
		 * The token to render here.
		 */
		token: Token;
	}

	let { token }: Props = $props();

	const { handleEndSelection, handleStartSelection } = getTokenSelectionContext();
</script>

<span
	id={token.xml_id}
	data-urn={token.urn}
	role="button"
	tabindex="0"
	onmousedown={() => {
		handleStartSelection(token.urn);
	}}
	onmouseup={() => {
		handleEndSelection(token.urn);
	}}
	>{token.text}{token.whitespace}</span>
