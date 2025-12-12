<script lang="ts">
	import type { TextContainer } from '$lib/types.js';

	import CTS_URN from '$lib/cts_urn.js';
	import { getCommentsContext } from '$lib/contexts/comments.js';
	import { highlightComments } from '$lib/functions.js';
	import ReadableTextContainer from './ReadableTextContainer.svelte';
	import Speaker from './Speaker.svelte';

	interface Props {
		showHeatmap: boolean;
		locationContainer: TextContainer;
	}

	let { showHeatmap, locationContainer }: Props = $props();

	const { comments } = getCommentsContext();

	let ctsUrn = $derived(new CTS_URN(locationContainer.urn));
	let wholeLocationComments = $derived(
		comments.filter((c) => !c.ctsUrn.isEqual(locationContainer.ctsUrn as CTS_URN))
	);
</script>

<div class="rounded-sm">
	<div class="rounded-sm bg-base-100 flex justify-between">
		<div>
			{#each (locationContainer.children as TextContainer[]) as child}
				{#if child.speaker}
					<Speaker name={child.speaker} />
				{/if}
				<ReadableTextContainer {showHeatmap} {comments} textContainer={child} />
			{/each}
		</div>
		<div class="flex flex-col justify-center">
			{#if wholeLocationComments.length > 0}
				<a
					href={'#'}
					role="button"
					class={`base-content hover:opacity-70 cursor-pointer w-12 text-center inline-block comments-${wholeLocationComments.length} select-none`}
					class:comment-box-shadow={showHeatmap}
					tabindex="0"
					onclick={() =>
						highlightComments(
							comments,
							wholeLocationComments.map((c) => {
								// fall back on c.urn in case citable_urn is not defined
								return c.citable_urn || c.urn;
							})
						)}
					onkeyup={(event) => {
						if (event.key === 'Enter') {
							highlightComments(
								comments,
								wholeLocationComments.map((c) => c.citable_urn)
							);
						}
					}}
					data-citation={ctsUrn.citations.join('.')}>{ctsUrn.citations.join('.')}</a
				>
			{:else}
				<span class="base-content inline-block w-12 text-center select-none"
					>{ctsUrn.citations.join('.')}</span
				>
			{/if}
		</div>
	</div>
</div>

<style lang="postcss">
	.addition::before {
		content: '<';
	}

	.addition::after {
		content: '>';
	}

	.deletion {
		opacity: 0.7;
	}

	.deletion::before {
		content: '[';
	}

	.deletion::after {
		content: ']';
	}

	.comment-box-shadow.comments-1 {
		background-color: rgb(99, 162, 187, 0.2);
	}

	.comment-box-shadow.comments-2 {
		background-color: rgba(99, 162, 187, 0.4);
	}

	.comment-box-shadow.comments-3 {
		background-color: rgba(99, 162, 187, 0.6);
	}

	.comment-box-shadow.comments-4 {
		background-color: rgba(99, 162, 187, 0.8);
	}

	.comment-box-shadow.comments-5 {
		background-color: rgba(99, 162, 187, 0.9);
	}

	.comment-box-shadow.comments-6 {
		background-color: rgba(99, 162, 187, 1);
	}

	.comment-box-shadow.comments-7 {
		background-color: rgba(67, 121, 142, 0.8);
	}

	.comment-box-shadow.comments-8 {
		background-color: rgba(67, 121, 142, 0.9);
	}

	.comment-box-shadow.comments-9 {
		background-color: rgba(67, 121, 142, 1);
	}

	.comment-box-shadow.comments-10 {
		background-color: rgb(67, 121, 142, 1);
	}
</style>
