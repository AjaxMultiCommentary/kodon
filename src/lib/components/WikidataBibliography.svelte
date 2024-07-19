<script lang="ts">
	import type { WikidataEntry } from '$lib/types.js';
	import { orderBy } from 'lodash';

	import ArrowUp from '$lib/components/icons/ArrowUp.svelte';
	import ArrowDown from '$lib/components/icons/ArrowDown.svelte';

	export let citations: WikidataEntry[];

	// use one query for each item
	// "core corpus" tab: show "sub-bibliography" in expandable block for each commentary in commentary.toml
	// "extended bibliography": show full bibliographic information, and in expandable block show who from the core corpus cites each item
	// for extended items (Bowra, Falco, etc.): tabulate how many commentaries are citing them
	// - sort by how many citations
	let sortProperty: 'author' | 'pubdate' | 'title' | 'publisher' | 'place' = 'author';
	let sortAscending = true;

	$: sortedCitations = orderBy(citations, [sortProperty], [sortAscending ? 'asc' : 'desc']);
</script>

<div class="table table-pin-cols">
	<thead>
		<th
			class="cursor-pointer"
			on:click={() => {
				sortProperty = 'author';
				sortAscending = !sortAscending;
			}}
			><div class="flex">
				Author {#if sortProperty === 'author'}
					{#if sortAscending}<ArrowUp className="size-4" />{:else}<ArrowDown
							className="size-4"
						/>{/if}
				{/if}
			</div></th
		>
		<th
			class="cursor-pointer"
			on:click={() => {
				sortProperty = 'pubdate';
				sortAscending = !sortAscending;
			}}
			><div class="flex">
				Year of Publication {#if sortProperty === 'pubdate'}
					{#if sortAscending}<ArrowUp className="size-4" />{:else}<ArrowDown
							className="size-4"
						/>{/if}
				{/if}
			</div></th
		>
		<th
			class="cursor-pointer"
			on:click={() => {
				sortProperty = 'title';
				sortAscending = !sortAscending;
			}}
			><div class="flex">
				Title {#if sortProperty === 'title'}
					{#if sortAscending}<ArrowUp className="size-4" />{:else}<ArrowDown
							className="size-4"
						/>{/if}
				{/if}
			</div></th
		>
		<th
			class="cursor-pointer"
			on:click={() => {
				sortProperty = 'publisher';
				sortAscending = !sortAscending;
			}}
			><div class="flex">
				Publisher {#if sortProperty === 'publisher'}
					{#if sortAscending}<ArrowUp className="size-4" />{:else}<ArrowDown
							className="size-4"
						/>{/if}
				{/if}
			</div></th
		>
		<th
			class="cursor-pointer"
			on:click={() => {
				sortProperty = 'place';
				sortAscending = !sortAscending;
			}}
			><div class="flex">
				Place of Publication {#if sortProperty === 'place'}
					{#if sortAscending}<ArrowUp className="size-4" />{:else}<ArrowDown
							className="size-4"
						/>{/if}
				{/if}
			</div></th
		>
	</thead>
	<tbody>
		{#each sortedCitations as citation}
			<tr>
				<td>{citation.author}</td>
				<td>{new Date(citation.pubdate).getFullYear()}</td>
				<td>{citation.title}</td>
				<td>{citation.publisher}</td>
				<td>{citation.place || ''}</td>
			</tr>
		{/each}
	</tbody>
</div>
