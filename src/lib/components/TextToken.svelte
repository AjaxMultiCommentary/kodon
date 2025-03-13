<script lang="ts">
	import { getTokenSelectionContext } from '$lib/contexts/tokenSelection.js';

	/**
	 * The token to render here.
	 */
	export let token: { text: string; urn: string; xml_id: string };

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
