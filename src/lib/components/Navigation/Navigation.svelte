<script lang="ts">
	import type { RenderablePassageConfig } from '$lib/types.js';

	import NavigationItem from './NavigationItem.svelte';

	interface Props {
		passages: RenderablePassageConfig[];
		currentPassageURN: string;
	}

	let { passages, currentPassageURN }: Props = $props();
</script>

<ul class="menu bg-base-200 p-0">
	{#each passages as passage}
		<NavigationItem {passage} {currentPassageURN} />
	{/each}
</ul>
