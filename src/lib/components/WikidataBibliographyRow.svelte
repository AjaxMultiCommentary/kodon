<script lang="ts">
	import type { WikidataEntry } from '$lib/types.js';

	import ChevronDown from '$lib/components/icons/ChevronDown.svelte';
	import ChevronRight from '$lib/components/icons/ChevronRight.svelte';
	import InternetArchive from '$lib/components/icons/InternetArchive.svelte';

	export let citation: WikidataEntry;

	let showCitedBy = false;
</script>

<tr
	class:cursor-pointer={citation.citations.length > 0}
	on:click={() => (showCitedBy = !showCitedBy)}
>
	<td
		><div class="flex justify-start align-middle">
			{#if citation.citations.length > 0}
				{#if showCitedBy}
					<ChevronDown className="size-4" />
				{:else}
					<ChevronRight className="size-4" />
				{/if}
			{/if}{citation.authorLabel.value}
		</div></td
	>
	<td>{new Date(citation.pubdate.value).getFullYear()}</td>
	<td>{citation.title.value}</td>
	<td
		>{citation.publisherLabel.value}
		{citation.placeLabel?.value ? `(${citation.placeLabel.value})` : ''}</td
	>
	<td
		>{#if citation.full_text_url?.value}
			<a href={citation.full_text_url.value} title="Internet Archive link to resource"
				><InternetArchive className="size-6" /></a
			>
		{:else if citation.internet_archive_id?.value}
			<a
				href="//archive.org/details/{citation.internet_archive_id.value}"
				title="Internet Archive link to resource"><InternetArchive className="size-6" /></a
			>
		{/if}</td
	>
</tr>
{#if showCitedBy}
	{#each citation.citations as citedBy}
		<tr class="bg-slate-200">
			<td>{citedBy.authorLabel.value}</td>
			<td>{new Date(citedBy.pubdate.value).getFullYear()}</td>
			<td>{citedBy.title.value}</td>
			<td
				>{citedBy.publisherLabel.value}
				{citation.placeLabel?.value ? `(${citation.placeLabel.value})` : ''}</td
			>
		</tr>
	{/each}
{/if}
