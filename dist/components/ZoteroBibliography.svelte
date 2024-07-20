<script>import { Cite, plugins } from "@citation-js/core";
import "@citation-js/plugin-csl";
export let bibliographies;
export let csls = [];
export let lang = "en-US";
export let template = "harvard1";
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
</script>

<article class="bibliographies prose text-pretty">
	{#each formattedBibliographies as bibliography}
		<h1 class="prose prose-h1">{bibliography.name}</h1>
		<div class="mb-8">{@html bibliography.content}</div>
	{/each}
</article>

<style>
	.bibliographies {
		text-indent: 3em hanging;
	}
</style>
