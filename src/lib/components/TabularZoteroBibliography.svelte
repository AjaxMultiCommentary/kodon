<!-- @migration-task Error while migrating Svelte code: `<th>` cannot be a child of `<thead>`. `<thead>` only allows these children: `<tr>`, `<style>`, `<script>`, `<template>`. The browser will 'repair' the HTML (by moving, removing, or inserting elements) which breaks Svelte's assumptions about the structure of your components.
https://svelte.dev/e/node_invalid_placement -->
<script lang="ts">
	import type { Bibliography, CSL, ZoteroItem } from '$lib/types.js';

	import { orderBy } from 'lodash';

	// @ts-expect-error @citation-js doesn't have proper types
	import { Cite, plugins } from '@citation-js/core';

	import '@citation-js/plugin-csl';

	import ArrowUp from '$lib/components/icons/ArrowUp.svelte';
	import ArrowDown from '$lib/components/icons/ArrowDown.svelte';

	export let bibliographies: Bibliography[];
	export let csls: CSL[] = [];
	export let lang: 'en-US' | 'es-ES' | 'de-DE' | 'fr-FR' | 'nl-NL' = 'en-US';
	export let template: string = 'harvard1';

	let sortProperty: 'author' | 'pubdate' | 'title' | 'publisher' | 'place' = 'author';
	let sortAscending = true;

	const citationCSLConfig = plugins.config.get('@csl');

	$: {
		csls.forEach((csl) => {
			citationCSLConfig.templates.add(csl.name, csl.template);
		});
	}

	$: formattedBibliographies = bibliographies.map((bib) => {
		const cite = new Cite(bib.items);

		return {
			name: bib.name,
			content: cite.format('bibliography', {
				format: 'html',
				lang,
				template
			})
		};
	});

	$: sortedBibliographies = bibliographies.map((b) => ({ name: b.name, items: sort(b.items) }));

	function sort(items: ZoteroItem[]): ZoteroItem[] {
		const sortOrder = sortAscending ? 'asc' : 'desc';

		if (sortProperty === 'author') {
			return orderBy(
				items,
				(i) => {
					return i.author.map((a: { family: any }) => a.family);
				},
				[sortOrder]
			);
		}

		if (sortProperty === 'pubdate') {
			return orderBy(
				items,
				(i) => {
					return i.issued['date-parts'][0];
				},
				[sortOrder]
			);
		}

		if (sortProperty === 'place') {
			return orderBy(items, ['publisher-place'], [sortOrder]);
		}

		return orderBy(items, [sortProperty], [sortOrder]);
	}
</script>

<article>
	{#each sortedBibliographies as bibliography}
		<h2 class="prose prose-h2 font-semibold">{bibliography.name}</h2>
		<table>
			<thead>
				<tr
					class="cursor-pointer"
					on:click={() => {
						sortProperty = 'author';
						sortAscending = !sortAscending;
					}}
					><th class="flex">
						Author {#if sortProperty === 'author'}
							{#if sortAscending}<ArrowUp className="size-4" />{:else}<ArrowDown
									className="size-4"
								/>{/if}
						{/if}
					</th></tr
				>
				<tr
					class="cursor-pointer"
					on:click={() => {
						sortProperty = 'pubdate';
						sortAscending = !sortAscending;
					}}
					><th class="flex">
						Year of Publication {#if sortProperty === 'pubdate'}
							{#if sortAscending}<ArrowUp className="size-4" />{:else}<ArrowDown
									className="size-4"
								/>{/if}
						{/if}
					</th></tr
				>
				<tr
					class="cursor-pointer"
					on:click={() => {
						sortProperty = 'title';
						sortAscending = !sortAscending;
					}}
					><th class="flex">
						Title {#if sortProperty === 'title'}
							{#if sortAscending}<ArrowUp className="size-4" />{:else}<ArrowDown
									className="size-4"
								/>{/if}
						{/if}
					</th></tr
				>
				<tr
					class="cursor-pointer"
					on:click={() => {
						sortProperty = 'publisher';
						sortAscending = !sortAscending;
					}}
					><th class="flex">
						Publisher {#if sortProperty === 'publisher'}
							{#if sortAscending}<ArrowUp className="size-4" />{:else}<ArrowDown
									className="size-4"
								/>{/if}
						{/if}
					</th></tr
				>
				<tr
					class="cursor-pointer"
					on:click={() => {
						sortProperty = 'place';
						sortAscending = !sortAscending;
					}}
					><th class="flex">
						Place of Publication {#if sortProperty === 'place'}
							{#if sortAscending}<ArrowUp className="size-4" />{:else}<ArrowDown
									className="size-4"
								/>{/if}
						{/if}
					</th></tr
				>
			</thead>
			<tbody>
				{#each bibliography.items as item}
					<tr>
						<td>{item.author.map((a) => `${a.given} ${a.family}`).join(', ')}</td>
						<td>{item.issued['date-parts'][0]}</td>
						<td>{item.title}</td>
						<td>{item.publisher}</td>
						<td>{item['publisher-place']}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/each}
</article>
