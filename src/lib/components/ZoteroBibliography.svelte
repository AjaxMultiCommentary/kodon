<script lang="ts">
	import { run } from 'svelte/legacy';

	// @ts-expect-error @citation-js doesn't have proper types'
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

	const citationCSLConfig = plugins.config.get('@csl');

	run(() => {
		csls.forEach((csl) => {
			citationCSLConfig.templates.add(csl.name, csl.template);
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
