<script lang="ts">
	import type { Comment, TextContainer } from '$lib/types.js';

	import CTS_URN from '$lib/cts_urn.js';
	import { getCommentsContext } from '$lib/contexts/comments.js';
	import CommentGrid from './CommentGrid.svelte';
	import ReadableTextContainer from './ReadableTextContainer.svelte';
	import Speaker from './Speaker.svelte';

	interface Props {
		comments: Comment[];
		showHeatmap: boolean;
		locationContainer: TextContainer;
	}

	let { comments, showHeatmap, locationContainer }: Props = $props();

	const { highlightComments } = getCommentsContext();

	let children = $derived(
		((locationContainer.children || []).length > 0
			? locationContainer.children
			: [locationContainer]) as TextContainer[]
	);
	let ctsUrn = $derived(new CTS_URN(locationContainer.urn));
	let wholeLocationComments = $derived(
		comments
			?.filter((c) => !c.ctsUrn.tokens.some((t: string | undefined) => Boolean(t)))
			.filter((c) => ctsUrn.hasEqualStart(c.ctsUrn)) || []
	);

	function stringifyCommentCitation(comment: Comment) {
		const { integerCitations } = comment.ctsUrn;

		// if (integerCitations.length === 2) {
		// 	if (integerCitations[0].join('') !== integerCitations[1].join('')) {
		// 		return `${integerCitations[0].join('')}-${integerCitations[1].join('')}`;
		// 	}
		// }

		return `${integerCitations[0].join('.')}`;
	}
</script>

<div class="collapse rounded-sm">
	<input type="checkbox" />
	<div
		class="rounded-sm bg-base-100 border border-base-300 p-4 shadow-sm collapse-title flex justify-between"
	>
		<div>
			{#each children as child}
				{#if child.speaker}
					<Speaker name={child.speaker} />
				{/if}
				<ReadableTextContainer {showHeatmap} {comments} textContainer={child} />
			{/each}
		</div>
		<div>
			{#if wholeLocationComments.length > 0}
				<a
					href={'#'}
					role="button"
					class={`base-content hover:opacity-70 cursor-pointer w-12 text-center inline-block comments-${wholeLocationComments.length} select-none`}
					class:comment-box-shadow={showHeatmap}
					tabindex="0"
					onclick={() =>
						highlightComments(
							wholeLocationComments.map((c) => {
								// fall back on c.urn in case citable_urn is not defined
								return c.citable_urn || c.urn;
							})
						)}
					onkeyup={(event) => {
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
	</div>
	<div class="collapse-content bg-base-200 inset-shadow-sm pt-4 rounded-b-sm">
		<CommentGrid {comments} {stringifyCommentCitation} />
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
