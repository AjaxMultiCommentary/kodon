<script lang="ts">
	import type { TextContainer } from '$lib/types.js';

	import LocationContainer from './LocationContainer.svelte';

	interface Props {
		showHeatmap: boolean;
		textContainers: TextContainer[];
	}

	let { showHeatmap, textContainers }: Props = $props();
</script>

{#each textContainers as textContainer}
	<LocationContainer locationContainer={textContainer} {showHeatmap} />
{/each}
