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
			const citedBy = citation.citedBy.map((cited: any) => {
				return {
					id: cited.cited.value.split('/').at(-1),
					author: cited.cited_authorLabel.value,
					pubdate: cited.cited_pubdate.value,
					title: cited.cited_title.value
				};
			});
			const citing = citation.citing.map((citing: any) => {
				return {
					id: citing.citing.value.split('/').at(-1),
					author: citing.citing_authorLabel.value,
					pubdate: citing.citing_pubdate.value,
					title: citing.citing_title.value
				};
			});

			return {
				...citation,
				citedBy,
				citing
			};
		})
	}
};
