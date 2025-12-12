<script lang="ts">
	import type { RenderablePassageConfig } from '$lib/types.js';
	import { marked } from 'marked';
	import CTS_URN from '$lib/cts_urn.js';
	import NavigationItem from './NavigationItem.svelte';

	interface Props {
		passage: RenderablePassageConfig;
		currentPassageURN: string;
	}

	let { passage, currentPassageURN }: Props = $props();
	let currentUrn = $derived(new CTS_URN(currentPassageURN));
	let passageUrn = $derived(new CTS_URN(passage.urn));
	let isUnderlined = $derived(
		passageUrn.contains(currentUrn) ||
			(!passage.subpassages?.length && passageUrn.isEqual(currentUrn))
	);
</script>

<li class="rounded-none" class:bg-secondary={isUnderlined}>
	{#if passage.subpassages?.length}
		<details open={isUnderlined}>
			<summary>
				<span class:underline={isUnderlined}>{@html marked(passage.label)}</span>
				{passage.ref}
			</summary>
			<ul>
				{#each passage.subpassages as subpassage}
					<NavigationItem passage={subpassage} {currentPassageURN} />
				{/each}
			</ul>
		</details>
	{:else}
		<a href={passage.url}>
			<span class:underline={isUnderlined}>{@html marked(passage.label)}</span>
			{passage.ref || ''}
		</a>
	{/if}
</li>
