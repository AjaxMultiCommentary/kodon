<script lang="ts">
	import type { TextContainer } from '$lib/types.js';

	import ReadableTextContainer from './ReadableTextContainer.svelte';

	export let handleHighlightComments: (e: CustomEvent) => void;
	export let handleEndSelection: (e: CustomEvent) => void;
	export let handleStartSelection: (e: CustomEvent) => void;
	export let showHeatmap: boolean;
	export let selectedCommentaries: string[];
	export let textContainers: TextContainer[];
</script>

{#each textContainers as textContainer}
	<ReadableTextContainer
		{textContainer}
		comments={selectedCommentaries.length > 0
			? (textContainer.comments || []).filter((c) =>
					selectedCommentaries.includes(c.commentaryAttributes?.pid || '')
				)
			: textContainer.comments || []}
		on:highlightComments={handleHighlightComments}
		on:handleEndSelection={handleEndSelection}
		on:startSelection={handleStartSelection}
		on:endSelection={handleEndSelection}
		{showHeatmap}
	/>
{/each}
