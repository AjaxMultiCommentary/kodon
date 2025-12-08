<script lang="ts">
	import metadata from '$lib/data/galen/tlg0057.tlg001.1st1K-grc1/metadata.json' with { type: 'json' };
	import galenElements from '$lib/data/galen/tlg0057.tlg001.1st1K-grc1/tlg0057.tlg001.1st1K-grc1.elements.json' with { type: 'json' };
	import galenTextparts from '$lib/data/galen/tlg0057.tlg001.1st1K-grc1/tlg0057.tlg001.1st1K-grc1.textparts.json' with { type: 'json' };
	import ReadingEnvironment from '$lib/components/ReadingEnvironment.svelte';
	import CTS_URN from '$lib/cts_urn.js';

	import { page } from '$app/state';

	let passages = $derived(metadata.table_of_contents);
	let textpart = $derived(galenTextparts[0]);
	let textContainers = $derived(
		galenElements
			.filter((element) => element.textpart_index === textpart.index)
			.map((element) => ({ ...element, ctsUrn: new CTS_URN(element.urn) }))
	);
</script>

<ReadingEnvironment
	currentURL={page.url}
	currentPassage={passages[0]}
	{passages}
	{textContainers}
/>
