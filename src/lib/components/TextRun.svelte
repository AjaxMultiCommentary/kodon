<script lang="ts">
	import type { Word } from '$lib/types.js';

	/**
	 * A run of text is a series of tokens that all share
	 * a style. This will help us render things like additions,
	 * deletions, and even comments without resorting to funky hacks
	 * (added spaces) or other workarounds.
	 */

	import TextToken from './TextToken.svelte';

	export let run: Word[];
	export let showHeatmap: boolean = false;
</script>

{#each run as token (token.xml_id)}
	<TextToken {showHeatmap} {token} />
{/each}
