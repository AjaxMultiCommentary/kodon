<script>import { orderBy } from "lodash";
import { Cite, plugins } from "@citation-js/core";
import "@citation-js/plugin-csl";
import ArrowUp from "./icons/ArrowUp.svelte";
import ArrowDown from "./icons/ArrowDown.svelte";
export let bibliographies;
export let csls = [];
export let lang = "en-US";
export let template = "harvard1";
let sortProperty = "author";
let sortAscending = true;
const citationCSLConfig = plugins.config.get("@csl");
$: {
  csls.forEach((csl) => {
    citationCSLConfig.templates.add(csl.name, csl.template);
  });
}
$:
  formattedBibliographies = bibliographies.map((bib) => {
    const cite = new Cite(bib.items);
    return {
      name: bib.name,
      content: cite.format("bibliography", {
        format: "html",
        lang,
        template
      })
    };
  });
$:
  sortedBibliographies = bibliographies.map((b) => ({ name: b.name, items: sort(b.items) }));
function sort(items) {
  const sortOrder = sortAscending ? "asc" : "desc";
  if (sortProperty === "author") {
    return orderBy(
      items,
      (i) => {
        return i.author.map((a) => a.family);
      },
      [sortOrder]
    );
  }
  if (sortProperty === "pubdate") {
    return orderBy(
      items,
      (i) => {
        return i.issued["date-parts"][0];
      },
      [sortOrder]
    );
  }
  if (sortProperty === "place") {
    return orderBy(items, ["publisher-place"], [sortOrder]);
  }
  return orderBy(items, [sortProperty], [sortOrder]);
}
</script>

<article>
	{#each sortedBibliographies as bibliography}
		<h2 class="prose prose-h2 font-semibold">{bibliography.name}</h2>
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
	{/each}
</article>
