<script lang="ts">
	import type { Comment, TextContainer } from '$lib/types.js';

	import { isEqual } from 'lodash';

	import LocationContainer from './LocationContainer.svelte';
	import { nestBlocks } from '$lib/functions.js';

	interface Props {
		showHeatmap: boolean;
		selectedCommentaries: string[];
		textContainers: TextContainer[];
	}

	let { showHeatmap, selectedCommentaries, textContainers }: Props = $props();

	/**
	 * FIXME: There doesn't seem to be a good reason to pass entire
	 * comments down the component tree like this. It would be much
	 * better to have a clean separation of critical text and comments,
	 * with just the CTS URNs being used to indicate highlights etc.
	 */
	let textContainerGroups = $derived(
		textContainers
			.reduce((groups: any, curr: TextContainer) => {
				const mostRecentGroup = groups.at(-1) || {};
				const mostRecentContainer = mostRecentGroup.containers?.at(-1) || {};

				if (isEqual(mostRecentContainer.location, curr.location)) {
					groups.at(-1).containers = mostRecentGroup.containers.concat(curr);

					groups.at(-1).comments = mostRecentGroup.comments.concat(curr.comments);

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
				container: nestBlocks(
					group.containers.map((block: TextContainer) => ({
						...block,
						// we already know they have the same location,
						// so we can just check the offsets here
						parentIndex: group.containers.findLast(
							(b: TextContainer) =>
								b.index !== block.index &&
								block.start_offset >= b.start_offset &&
								block.end_offset <= b.end_offset
						)?.index
					}))
				)
			}))
	);
</script>

{#each textContainerGroups as group}
	<LocationContainer locationContainer={group.container} comments={group.comments} {showHeatmap} />
{/each}
