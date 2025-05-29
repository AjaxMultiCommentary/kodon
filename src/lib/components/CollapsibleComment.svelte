<script lang="ts">
	import type { Author, Comment } from '$lib/types.js';
	import IIIFViewer from './IIIFViewer.svelte';

	interface Props {
		iiifURL: string;
		comment: Comment;
		stringifyCommentCitation: (comment: Comment) => string;
	}

	let { iiifURL, comment, stringifyCommentCitation }: Props = $props();

	let creators = $derived(comment.commentaryAttributes?.creators as Author[]);
	let isHighlighted = $derived(comment.isHighlighted);
	let isOpen = $derived(isHighlighted);
	let showIIIFViewer = $state(false);

	function commentHasIIIF(comment: Comment) {
		return (comment.image_paths || []).length > 0;
	}

	function toggleDetails(_e: Event) {
		isOpen = !isOpen;

		if (!isOpen) {
			isHighlighted = false;
		}
	}
</script>

<div
	class="border collapse collapse-arrow rounded-xs mb-2"
	class:border-2={isHighlighted}
	class:border-secondary={isOpen && isHighlighted}
	class:collapse-open={isOpen}
	id={comment.citable_urn}
>
	<div
		class="collapse-title"
		role="button"
		tabindex="0"
		onclick={toggleDetails}
		onkeyup={(event) => {
			if (event.key === 'Enter') {
				event.stopPropagation();
				toggleDetails(event);
			}
		}}
	>
		<h3 class="text-sm font-bold text-b ase-content cursor-pointer">
			<span class="text-sm font-medium text-slate-600"
				><a data-sveltekit-reload href={`?gloss=${comment.citable_urn}`}
					>{stringifyCommentCitation(comment)}</a
				></span
			>
			{creators.map((c) => c.last_name || c.name).join(', ')}
			{comment.commentaryAttributes?.publication_date}
		</h3>
		{#if comment.lemma}
			<small class="mt-1 mx-w-2xl text-sm text-slate-600">
				{comment.transcript || comment.lemma}
			</small>
		{/if}
	</div>
	<div class="collapse-content float-right">
		<p class="max-w-2xl text-sm text-gray-800 prose comment-body font-serif">
			{@html comment.body}
		</p>
		{#if commentHasIIIF(comment)}
			<div class="flex justify-center mt-2">
				{#if showIIIFViewer}
					<IIIFViewer url={iiifURL} {comment} />
				{:else}
					<button
						type="button"
						class="btn btn-xs btn-outline btn-secondary"
						onclick={() => (showIIIFViewer = true)}
					>
						Show page image
					</button>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.comment-body :global(a) {
		@apply underline;
	}
</style>
