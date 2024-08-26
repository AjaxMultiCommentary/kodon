<script>import ReadableTextContainer from "./ReadableTextContainer.svelte";
export let handleHighlightComments;
export let handleEndSelection;
export let handleStartSelection;
export let showHeatmap;
export let selectedCommentaries;
export let textContainers;
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
