<script lang="ts">
	import type { PassageConfig } from '$lib/types.js';
	import { base } from '$app/paths';
	import { marked } from 'marked';
	import CTS_URN from '$lib/cts_urn.js';
	import NavigationItem from './NavigationItem.svelte';

	interface Props {
		passage: PassageConfig;
		currentPassageUrn: string;
	}

	let { passage, currentPassageUrn }: Props = $props();
	let currentUrn = new CTS_URN(currentPassageUrn);
	let passageUrn = new CTS_URN(passage.urn);
	let isUnderlined = $state(
		passageUrn.contains(currentUrn) ||
			(!passage.subpassages?.length && passageUrn.isEqual(currentUrn))
	);
</script>

<li class="rounded-none">
	{#if passage.subpassages?.length}
		<details open={isUnderlined}>
			<summary>
				<span class:underline={isUnderlined}>{@html marked(passage.label)}</span>
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
			<span class:underline={isUnderlined}>{@html marked(passage.label)}</span>
			{passage.ref}
		</a>
	{/if}
</li>
