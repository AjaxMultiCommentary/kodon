<script lang="ts">
	import metadata from '$lib/data/galen/tlg0057.tlg001.1st1K-grc1/metadata.json' with { type: 'json' };
	import galenText from '$lib/data/galen/tlg0057.tlg001.1st1K-grc1/tlg0057.tlg001.1st1K-grc1.json' with { type: 'json' };
	import ReadingEnvironment from '$lib/components/ReadingEnvironment.svelte';
	import CTS_URN from '$lib/cts_urn.js';

	import { page } from '$app/state';

	let passages = $derived(metadata.table_of_contents);
	let textpart = $derived(galenText.textparts[0]);

	let textContainers = $derived([
		{
			...textpart,
			char_offset: 0,
			children: textpart.elements.map((el) => ({
				...el,
				attributes: { tagname: el.tagname },
				block_index: el.textpart_index,
				ctsUrn: new CTS_URN(el.urn || textpart.urn),
				location: el.location || textpart.location,
				urn: el.urn || textpart.urn
			})),
			ctsUrn: new CTS_URN(textpart.urn as string),
			end_offset: textpart.text.length + 1,
			end_char_offset: textpart.text.length + 1
		}
	]);
</script>

<ReadingEnvironment
	currentURL={page.url}
	currentPassage={passages[0]}
	{passages}
	{textContainers}
/>
