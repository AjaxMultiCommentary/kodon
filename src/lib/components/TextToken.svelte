<script lang="ts">
	import type { Word } from '$lib/types.js';

	import { getTokenSelectionContext } from '$lib/contexts/tokenSelection.js';

	/**
	 * The token to render here.
	 */
	export let token: Word;

	const { handleEndSelection, handleStartSelection } = getTokenSelectionContext();
</script>

<span
	id={token.xml_id}
	data-urn={token.urn}
	role="button"
	tabindex="0"
	on:mousedown={() => {
		handleStartSelection(token.urn);
	}}
	on:mouseup={() => {
		handleEndSelection(token.urn);
	}}
	>{token.text}
</span>
