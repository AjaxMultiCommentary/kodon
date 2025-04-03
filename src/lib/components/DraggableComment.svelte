<script lang="ts">
	import type { Comment } from '$lib/types.js';

	import { draggable } from '@neodrag/svelte';


	export let comment: Comment
	export let stringifyCommentCitation: (comment: Comment) => string;

	$: isExpanded = false;
</script>

<div use:draggable class="col-span-1 bg-gray-50 divide-gray-200 rounded-sm shadow p-3">
	<h3 class="text-sm font-bold cursor-pointer text-slate-800">
		<span class="text-sm font-medium text-slate-700"
			><a data-sveltekit-reload href={`?gloss=${comment.citable_urn}`}
				>{stringifyCommentCitation(comment)}</a
			></span
		>
		{comment.commentaryAttributes?.creators.map((c) => c.last_name || c.name).join(', ')}
		{comment.commentaryAttributes?.publication_date}
	</h3>
	{#if comment.lemma}
		<small class="mt-1 mx-w-2xl text-sm text-slate-700">
			{comment.transcript || comment.lemma}
		</small>
	{/if}
	<div class="max-w-2xl truncate">
		<p 
			class="text-sm text-slate-700 prose comment-body font-serif" 
			class:truncate={!isExpanded}
		>
			{@html comment.body}
		</p>
	</div>
</div>


<style lang="postcss">
	.comment-body :global(a) {
		@apply underline;
	}
</style>
