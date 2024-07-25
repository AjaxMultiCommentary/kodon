<script lang="ts">
	import type { WikidataRow } from '$lib/types.js';
	import orderBy from 'lodash/orderBy.js';

	import ArrowUp from '$lib/components/icons/ArrowUp.svelte';
	import ArrowDown from '$lib/components/icons/ArrowDown.svelte';
	import WikidataBibliographyRow from '$lib/components/WikidataBibliographyRow.svelte';

	export let citations: WikidataRow[];

	// use one query for each item
	// "core corpus" tab: show "sub-bibliography" in expandable block for each commentary in commentary.toml
	// "extended bibliography": show full bibliographic information, and in expandable block show who from the core corpus cites each item
	// for extended items (Bowra, Falco, etc.): tabulate how many commentaries are citing them
	// - sort by how many citations
	let sortProperty: 'author' | 'citationCount' | 'pubdate' | 'title' | 'publisher' = 'author';
	let sortAscending = true;

	$: sortedCitations = orderBy(
		citations,
		[
			(citation) => {
				if (sortProperty === 'author') {
					return citation.authors?.value.split(', ').at(0)?.split(' ').at(-1);
				}

				if (sortProperty === 'citationCount') {
					return citation.citations.length;
				}

				if (sortProperty === 'pubdate') {
					return new Date(citation.pubYear.value);
				}

				if (sortProperty === 'publisher') {
					return citation.publishers.value;
				}

				if (sortProperty === 'title') {
					return citation.title.value;
				}
			}
		],
		[sortAscending ? 'asc' : 'desc']
	);

	// TODO add citation count!
	// Wikidata properties for outgoing links in Bibliography page:
	/* Q19832971, JSTOR article ID
		P953, full work available at URL
		P724, Internet archive ID
		*/

	// include link to WikiData page

	// author, title, year, publisher + location, full-text link
</script>

<table class="table table-pin-cols border-base-300">
	<thead>
		<tr>
			<th></th>
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
					sortProperty = 'citationCount';
					sortAscending = !sortAscending;
				}}
				><div class="flex">
					Citations {#if sortProperty === 'citationCount'}
						{#if sortAscending}<ArrowUp className="size-4" />{:else}<ArrowDown
								className="size-4"
							/>{/if}
					{/if}
				</div></th
			>
			<th>Full-Text Link</th>
		</tr>
	</thead>
	<tbody>
		{#each sortedCitations as citation}
			<WikidataBibliographyRow {citation} />
		{/each}
	</tbody>
</table>
