<script lang="ts">
	// @ts-expect-error
	import { Cite, plugins } from '@citation-js/core';

	import '@citation-js/plugin-csl';

	import type { Bibliography, CSL } from '$lib/types.js';

	export let bibliographies: Bibliography[];
	export let csls: CSL[] = [];
	export let lang: 'en-US' | 'es-ES' | 'de-DE' | 'fr-FR' | 'nl-NL' = 'en-US';
	export let template: string = 'harvard1';

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
			output: cite.format('bibliography', {
				format: 'html',
				lang,
				template
			})
		};
	});
</script>

<article class="bibliographies prose">
	{#each formattedBibliographies as formattedBibliography}
		<h1>{formattedBibliography.name}</h1>
		{@html formattedBibliography.output}
	{/each}
</article>
