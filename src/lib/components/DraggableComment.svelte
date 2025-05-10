<script lang="ts">
	import type { Comment } from '$lib/types.js';

	import Maximize from '@lucide/svelte/icons/maximize-2';
	import Minimize from '@lucide/svelte/icons/minimize-2';

	import { draggable } from '@neodrag/svelte';

	interface Props {
		comment: Comment;
		stringifyCommentCitation: (comment: Comment) => string;
	}

	let { comment, stringifyCommentCitation }: Props = $props();
	let isExpanded = $state(false);

	let position: { x: number; y: number } = $state({ x: 0, y: 0 });

	function handleChange(e: any) {
		if (!e.target.checked) {
			position = { x: 0, y: 0 };
		}
	}
</script>

<div
	use:draggable={{
		position,
		onDrag: ({ offsetX, offsetY }) => {
			isExpanded = false;
			position = { x: offsetX, y: offsetY };
		}
	}}
	class="bg-gray-50 divide-gray-200 p-3 rounded-sm shadow transition-[height] duration-300 sm:max-w-96"
	aria-controls={`body-${comment.citable_urn}`}
	aria-expanded={isExpanded}
	class:absolute={isExpanded}
	class:border={isExpanded}
	class:border-gray={isExpanded}
	class:h-24={!isExpanded}
	class:h-96={isExpanded}
	class:overflow-y-scroll={isExpanded}
	class:truncate={!isExpanded}
	class:z-40={isExpanded}
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
					onchange={handleChange}
				/>
				<label for={`expand-input-${comment.citable_urn}`}>
					{#if isExpanded}
						<Minimize size={16} />
					{:else}
						<Maximize size={16} />
					{/if}
				</label>
			</div>
		</div>
	</div>
	{#if comment.lemma}
		<small class="mt-1 max-w-2xl text-sm text-slate-700">
			{comment.transcript || comment.lemma}
		</small>
	{/if}
	<div class="max-w-2xl" id={`body-${comment.citable_urn}`}>
		<p class="text-sm text-slate-700 prose comment-body font-serif" class:truncate={!isExpanded}>
			{@html comment.body}
		</p>
	</div>
</div>

<style lang="postcss">
	.comment-body :global(a) {
		@apply underline;
	}
</style>
