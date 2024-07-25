<script>import ChevronDown from "./icons/ChevronDown.svelte";
import ChevronRight from "./icons/ChevronRight.svelte";
import InternetArchive from "./icons/InternetArchive.svelte";
import Wikidata from "./icons/Wikidata.svelte";
import Jstor from "./icons/Jstor.svelte";
export let citation;
let showCitedBy = false;
</script>

<tr
	class:cursor-pointer={citation.citations.length > 0}
	on:click={() => (showCitedBy = !showCitedBy)}
>
	<td><a href={citation.wikidataURL} title="Wikidata page"><Wikidata /></a></td>
	<td
		><div class="flex justify-start align-middle">
			{#if citation.citations.length > 0}
				{#if showCitedBy}
					<ChevronDown className="size-4" />
				{:else}
					<ChevronRight className="size-4" />
				{/if}
			{/if}{citation.authors?.value}
		</div></td
	>
	<td>{new Date(citation.pubYear.value).getFullYear()}</td>
	<td>{citation.title.value}</td>
	<td
		>{citation.publishers.value}
		{citation.publicationPlaces?.value ? `(${citation.publicationPlaces.value})` : ''}
	</td>
	<td>
		{#if citation.item_typeLabel.value === 'scholarly article'}
			<span class="italic">{citation.published_in_label?.value}</span>
			{citation.volume?.value}{citation.issue?.value ? ` (${citation.issue.value})` : ''}, pp. {citation
				.page_range?.value}.
		{/if}</td
	>
	<td>{citation.citations.length}</td>
	<td
		>{#if citation.internet_archive_url?.value}
			<a href={citation.internet_archive_url.value} title="Internet Archive link to resource"
				><InternetArchive className="size-6" /></a
			>
		{:else if citation.jstor_url?.value}
			<a href={citation.jstor_url.value} title="JSTOR link to resource"
				><Jstor className="size-6" /></a
			>
		{/if}</td
	>
</tr>
{#if showCitedBy}
	{#each citation.citations as citedBy}
		{#if citedBy}
			<tr class="bg-slate-200">
				<td><a href={citation.wikidataURL} title="Wikidata page"><Wikidata /></a></td>
				<td>{citedBy.authors?.value}</td>
				<td>{new Date(citedBy.pubYear.value).getFullYear()}</td>
				<td>{citedBy.title.value}</td>
				<td
					>{citedBy.publishers.value}
					{citedBy.publicationPlaces?.value ? `(${citedBy.publicationPlaces.value})` : ''}</td
				>
				<td>
					{#if citation.item_typeLabel.value === 'scholarly article'}
						<span class="italic">{citation.published_in_label?.value}</span>
						{citation.volume?.value}{citation.issue?.value ? ` (${citation.issue.value})` : ''}, pp. {citation
							.page_range?.value}.
					{/if}</td
				>
				<td></td>
				<td
					>{#if citedBy.internet_archive_url?.value}
						<a href={citedBy.internet_archive_url.value} title="Internet Archive link to resource"
							><InternetArchive className="size-6" /></a
						>
					{:else if citedBy.jstor_url?.value}
						<a href={citedBy.jstor_url.value} title="JSTOR link to resource"
							><Jstor className="size-6" /></a
						>
					{/if}</td
				>
			</tr>
		{/if}
	{/each}
{/if}
