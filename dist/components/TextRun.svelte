<script>import TextToken from "./TextToken.svelte";
export let run;
export let showHeatmap = false;
</script>

{#each run as token (token.xml_id)}
	<TextToken {showHeatmap} {token} />
{/each}
