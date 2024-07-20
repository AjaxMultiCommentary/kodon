<script lang="ts">
	import type { WikidataEntry } from '$lib/types.js';

	import ChevronDown from '$lib/components/icons/ChevronDown.svelte';
	import ChevronRight from '$lib/components/icons/ChevronRight.svelte';

	export let citation: WikidataEntry;

	let showCitedBy = false;
</script>

<tr
	class:cursor-pointer={citation.citedBy?.length > 0}
	on:click={() => (showCitedBy = !showCitedBy)}
>
	<td
		><div class="flex justify-between">
			{#if citation.citedBy?.length > 0}
				{#if showCitedBy}
					<ChevronDown className="size-4" />
				{:else}
					<ChevronRight className="size-4" />
				{/if}
			{/if}{citation.author}
		</div></td
	>
	<td>{new Date(citation.pubdate).getFullYear()}</td>
	<td>{citation.title}</td>
	<td>{citation.publisher}</td>
	<td>{citation.place || ''}</td>
</tr>
{#if showCitedBy}
	{#each citation.citedBy as citedBy}
		<tr class="ml-8 bg-slate-200">
			<td>{citedBy.author}</td>
			<td>{new Date(citedBy.pubdate).getFullYear()}</td>
			<td>{citedBy.title}</td>
			<td>{citedBy.publisher}</td>
			<td>{citedBy.place || ''}</td>
		</tr>
	{/each}
{/if}
