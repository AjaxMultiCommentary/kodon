<script lang="ts">
	import type { PassageConfig } from '$lib/types.js';

	import NavigationItem from './NavigationItem.svelte';

	interface Props {
		passages: PassageConfig[];
		currentPassageUrn: string;
	}

	let { passages, currentPassageUrn }: Props = $props();
</script>

<ul class="menu bg-base-200 p-0">
	{#each passages as passage}
		<NavigationItem {passage} {currentPassageUrn} />
	{/each}
</ul>
