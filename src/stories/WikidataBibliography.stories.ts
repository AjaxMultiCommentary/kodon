import type { Meta, StoryObj } from '@storybook/svelte';
import WikidataBibliography from '$lib/components/WikidataBibliography.svelte';

import data from './assets/wikidata_citations.json';

const meta = {
	component: WikidataBibliography,
	tags: ['autodocs']
} satisfies Meta<WikidataBibliography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultBibliography: Story = {
	args: {
		citations: data.map((citation: any) => {
			const citedBy = citation.citedBy.map((citedBy: any) => {
				return {
					id: citedBy.citing.value.split('/').at(-1),
					author: citedBy.authorLabel.value,
					place: citedBy.placeLabel?.value,
					pubdate: citedBy.pubdate.value,
					publisher: citedBy.publisherLabel?.value,
					title: citedBy.title.value
				};
			});

			return {
				...citation,
				citedBy
			};
		})
	}
};
