<script lang="ts">
	import type { Comment, TextContainer } from '$lib/types.js';

	import { isEqual } from 'lodash';

	import LocationContainer from './LocationContainer.svelte';
	import { nestBlocks } from '$lib/functions.js';

	export let showHeatmap: boolean;
	export let selectedCommentaries: string[];
	export let textContainers: TextContainer[];
	export let handleHighlightComments: (e: CustomEvent) => void;
	export let handleEndSelection: (e: CustomEvent) => void;
	export let handleStartSelection: (e: CustomEvent) => void;

	$: textContainerGroups = textContainers
		.reduce((groups: any, curr: TextContainer) => {
			const lastGroup = groups.at(-1) || {};
			const lastContainer = lastGroup.containers?.at(-1) || {};

			if (isEqual(lastContainer.location, curr.location)) {
				groups.at(-1).containers = lastGroup.containers.concat(curr);

				groups.at(-1).comments = lastGroup.comments.concat(curr.comments);

				return groups;
			}

			const newGroup = { containers: [curr], comments: (curr.comments || []) as Comment[] };

			return [...groups, newGroup];
		}, [])
		.map((group: any) => ({
			comments:
				selectedCommentaries.length > 0
					? (group.comments || []).filter((c: Comment) =>
							selectedCommentaries.includes(c.commentaryAttributes?.pid || '')
						)
					: group.comments || [],
			container: nestBlocks(group.containers)
		}));
</script>

{#each textContainerGroups as group}
	<LocationContainer
		locationContainer={group.container}
		comments={group.comments}
		on:highlightComments={handleHighlightComments}
		on:handleEndSelection={handleEndSelection}
		on:startSelection={handleStartSelection}
		on:endSelection={handleEndSelection}
		{showHeatmap}
	/>
{/each}
