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
			const citations = citation.citations.value
				.split(', ')
				.map((wikidataURL: string) => {
					return data.find((c) => c.subject.value === wikidataURL);
				})
				.filter((x: any) => typeof x !== 'undefined');

			return {
				...citation,
				citations
			};
		})
	}
};
