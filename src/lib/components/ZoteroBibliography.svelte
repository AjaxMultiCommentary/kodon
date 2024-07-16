<script lang="ts">
	// @ts-expect-error @citation-js doesn't have proper types'
	import { Cite, plugins } from '@citation-js/core';

	import '@citation-js/plugin-csl';

	import type { Bibliography, CSL } from '$lib/types.js';
	import Tabs from '$lib/components/Tabs.svelte';

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
			content: cite.format('bibliography', {
				format: 'html',
				lang,
				template
			})
		};
	});
</script>

<article class="bibliographies prose text-pretty">
	<Tabs items={formattedBibliographies} />
</article>

<style lang="postcss">
	.bibliographies {
		text-indent: 3em hanging;
	}
</style>
