<script lang="ts">
	import type { Comment, TextContainer } from '$lib/types.js';

	import { getContext } from 'svelte';

	import CTS_URN from '$lib/cts_urn.js';
	import ReadableTextContainer from './ReadableTextContainer.svelte';
	import Speaker from './Speaker.svelte';

	export let comments: Comment[];
	export let showHeatmap: boolean;
	export let locationContainer: TextContainer;

	// @ts-expect-error need to declare types for context
	const { highlightComments } = getContext('comments');

	$: children = (
		(locationContainer.children || []).length > 0 ? locationContainer.children : [locationContainer]
	) as TextContainer[];
	$: ctsUrn = new CTS_URN(locationContainer.urn);
	$: wholeLocationComments =
		comments
			?.filter((c) => !c.ctsUrn.tokens.some((t: string | undefined) => Boolean(t)))
			.filter((c) => ctsUrn.hasEqualStart(c.ctsUrn)) || [];
</script>

<div>
	{#each children as child}
		{#if child.speaker}
			<Speaker name={child.speaker} />
		{/if}
		<div class="flex justify-between">
			<ReadableTextContainer {showHeatmap} {comments} textContainer={child} />

			{#if wholeLocationComments.length > 0}
				<a
					href={'#'}
					role="button"
					class={`base-content hover:opacity-70 cursor-pointer w-12 text-center inline-block comments-${wholeLocationComments.length} select-none`}
					class:comment-box-shadow={showHeatmap}
					tabindex="0"
					on:click={() => highlightComments(wholeLocationComments.map((c) => c.citable_urn))}
					on:keyup={(event) => {
						if (event.key === 'Enter') {
							highlightComments(wholeLocationComments.map((c) => c.citable_urn));
						}
					}}
					data-citation={ctsUrn.citations[0]}>{ctsUrn.citations[0]}</a
				>
			{:else}
				<span class="base-content w-12 text-center inline-block select-none"
					>{ctsUrn.citations.join('.')}</span
				>
			{/if}
		</div>
	{/each}
</div>
