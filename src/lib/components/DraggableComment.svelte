<script lang="ts">
	import type { Comment } from '$lib/types.js';

	import Expand from '@lucide/svelte/icons/expand';
	import { draggable } from '@neodrag/svelte';

	interface Props {
		comment: Comment;
		stringifyCommentCitation: (comment: Comment) => string;
	}

	let { comment, stringifyCommentCitation }: Props = $props();
	let isExpanded = $state(false);
</script>

<div
	use:draggable
	class="bg-gray-50 divide-gray-200 expandable max-h-40 p-3 rounded-sm shadow"
	aria-expanded={isExpanded}
	class:absolute={isExpanded}
>
	<div class="flex flex-wrap items-center justify-between sm:flex-nowrap">
		<h3 class="text-sm font-bold cursor-pointer text-slate-800">
			<span class="text-sm font-medium text-slate-700"
				><a data-sveltekit-reload href={`?gloss=${comment.citable_urn}`}
					>{stringifyCommentCitation(comment)}</a
				></span
			>
			{comment.commentaryAttributes?.creators?.map((c) => c.last_name || c.name).join(', ')}
			{comment.commentaryAttributes?.publication_date}
		</h3>
		<div class="shrink-0">
			<div
				class="relative inline-flex items-center p-0.5 rounded hover:bg-gray-300 hover:inset-shadow-sm hover:inset-shadow-gray-300"
			>
				<input
					type="checkbox"
					id={`expand-input-${comment.citable_urn}`}
					class="appearance-none"
					bind:checked={isExpanded}
				/>
				<label for={`expand-input-${comment.citable_urn}`}>
					<Expand size={16} />
				</label>
			</div>
		</div>
	</div>
	{#if comment.lemma}
		<small class="mt-1 max-w-2xl text-sm text-slate-700">
			{comment.transcript || comment.lemma}
		</small>
	{/if}
	<div class="max-w-2xl">
		<p class="text-sm text-slate-700 prose comment-body font-serif" class:truncate={!isExpanded}>
			{@html comment.body}
		</p>
	</div>
</div>

<style lang="postcss">
	.comment-body :global(a) {
		@apply underline;
	}

	.expandable {
		transition: max-height 250ms linear;
	}

	.expandable[aria-expanded='true'] {
		max-height: 480px;
		overflow-y: scroll;
		z-index: 40;
	}
</style>
