<script lang="ts">
	import type { PassageConfig } from '$lib/types.js';
	import { base } from '$app/paths';
	import { marked } from 'marked';
	import NavigationItem from './NavigationItem.svelte';

	interface Props {
		passage: PassageConfig;
		currentPassageUrn: string;
	}

	let { passage, currentPassageUrn }: Props = $props();
	let isHighlighted = false; //$derived(passage.urn === currentPassageUrn);
</script>

<li class="rounded-none" class:bg-secondary={isHighlighted} class:text-slate-100={isHighlighted}>
	{#if passage.subpassages?.length}
		<details>
			<summary>
				{@html marked(passage.label)}
				{passage.ref}
			</summary>
			<ul>
				{#each passage.subpassages as subpassage}
					<NavigationItem passage={subpassage} {currentPassageUrn} />
				{/each}
			</ul>
		</details>
	{:else}
		<a href="{base}/passages/{passage.urn}">
			{@html marked(passage.label)}
			{passage.ref}
		</a>
	{/if}
</li>
