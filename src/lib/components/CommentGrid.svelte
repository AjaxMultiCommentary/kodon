<script lang="ts">
	import type { Comment } from '$lib/types.js';

	import DraggableComment from '$lib/components/DraggableComment.svelte';

	export let comments: Comment[];
	export let stringifyCommentCitation: (comment: Comment) => string;
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
	{#each comments as comment}
		<DraggableComment {comment} {stringifyCommentCitation} />
	{/each}
</div>