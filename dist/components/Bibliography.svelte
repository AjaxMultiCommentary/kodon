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
      output: cite.format("bibliography", {
        format: "html",
        lang,
        template
      })
    };
  });
</script>

<article class="bibliographies prose text-pretty">
	{#each formattedBibliographies as formattedBibliography}
		<h1>{formattedBibliography.name}</h1>
		{@html formattedBibliography.output}
	{/each}
</article>

<style>
	.bibliographies {
		text-indent: 3em hanging;
	}
</style>
