<script lang="ts">
	import type { TextContainer } from '$lib/types.js';

	import lodash from 'lodash';

	import LocationContainer from './LocationContainer.svelte';
	import { nestTextContainers } from '$lib/functions.js';

	const { isEqual } = lodash;

	interface Props {
		showHeatmap: boolean;
		textContainers: TextContainer[];
	}

	let { showHeatmap, textContainers }: Props = $props();

	// let textContainerGroups = $derived(
	// 	textContainers.reduce((groups: any, curr: TextContainer) => {
	// 		const mostRecentGroup = groups.at(-1) || {};
	// 		const mostRecentContainer = mostRecentGroup.containers?.at(-1) || {};

	// 		if (isEqual(mostRecentContainer.location, curr.location)) {
	// 			groups.at(-1).containers.push(curr);

	// 			return groups;
	// 		}

	// 		const newGroup = { containers: [curr] };

	// 		return [...groups, newGroup];
	// 	}, [])
	// );

	// let groupedContainers = $derived(
	// 	textContainerGroups.map((group: any) => {
	// 		return {
	// 			container: nestTextContainers(group.containers)
	// 		};
	// 	})
	// );
</script>

{#each textContainers as textContainer}
	<LocationContainer locationContainer={textContainer} {showHeatmap} />
{/each}
