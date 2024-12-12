<script>import { getTokenSelectionContext } from "../contexts/tokenSelection.js";
export let token;
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
