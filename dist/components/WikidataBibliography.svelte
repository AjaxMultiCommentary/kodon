<script>import orderBy from "lodash/orderBy.js";
import ArrowUp from "./icons/ArrowUp.svelte";
import ArrowDown from "./icons/ArrowDown.svelte";
import WikidataBibliographyRow from "./WikidataBibliographyRow.svelte";
export let citations;
let sortProperty = "author";
let sortAscending = true;
$:
  sortedCitations = orderBy(
    citations,
    [
      (citation) => {
        if (sortProperty === "author") {
          return citation.authors?.value.split(", ").at(0)?.split(" ").at(-1);
        }
        if (sortProperty === "citationCount") {
          return citation.citations.length;
        }
        if (sortProperty === "pubdate") {
          return new Date(citation.pubYear.value);
        }
        if (sortProperty === "publisher") {
          return citation.publishers.value;
        }
        if (sortProperty === "published-in") {
          return citation.published_in_label?.value || citation.publishers.value;
        }
        if (sortProperty === "title") {
          return citation.title.value;
        }
      }
    ],
    [sortAscending ? "asc" : "desc"]
  );
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
					sortProperty = 'published-in';
					sortAscending = !sortAscending;
				}}
				><div class="flex">
					Published In {#if sortProperty === 'published-in'}
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
