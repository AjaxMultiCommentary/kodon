<script lang="ts">
	// @ts-expect-error @citation-js/core lacks proper typing
	import { Cite, plugins } from '@citation-js/core';

	import '@citation-js/plugin-csl';

	import type { Bibliography, CSL } from '$lib/types.js';

	interface Props {
		bibliographies: Bibliography[];
		csls?: CSL[];
		lang?: 'en-US' | 'es-ES' | 'de-DE' | 'fr-FR' | 'nl-NL';
		template?: string;
	}

	let { bibliographies, csls = [], lang = 'en-US', template = 'harvard1' }: Props = $props();

	const _citationCSLConfig = $derived.by(() => {
		let config = plugins.config.get('@csl');
		csls.forEach((csl) => {
			config.templates.add(csl.name, csl.template);
		});
	});

	let formattedBibliographies = $derived(
		bibliographies.map((bib) => {
			const cite = new Cite(bib.items);

			return {
				name: bib.name,
				content: cite.format('bibliography', {
					format: 'html',
					lang,
					template
				})
			};
		})
	);
</script>

<article class="bibliographies prose text-pretty">
	{#each formattedBibliographies as bibliography}
		<h1 class="prose prose-h1">{bibliography.name}</h1>
		<div class="mb-8">{@html bibliography.content}</div>
	{/each}
</article>

<style lang="postcss">
	.bibliographies {
		text-indent: 3em hanging;
	}
</style>
