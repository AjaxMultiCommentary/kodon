<script lang="ts">
	import type { Comment } from '$lib/types.js';

	import DraggableComment from '$lib/components/DraggableComment.svelte';

	interface Props {
		comments: Comment[];
		stringifyCommentCitation: (comment: Comment) => string;
	}

	let { comments, stringifyCommentCitation }: Props = $props();
</script>

<div class="grid grid-cols-1 gap-4 delay-300 sm:grid-cols-2 lg:grid-cols-3">
	{#each comments as comment}
		<DraggableComment {comment} {stringifyCommentCitation} />
	{/each}
</div>
