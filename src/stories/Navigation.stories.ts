import type { Meta, StoryObj } from '@storybook/svelte';
import { Navigation } from '$lib/components/Navigation/index.js';

import contextDecorator from './decorators/contextDecorator.js';
import ThemeDecorator from './decorators/ThemeDecorator.svelte';

const meta = {
	component: Navigation,
	decorators: [contextDecorator, () => ThemeDecorator],
	tags: ['autodocs']
} satisfies Meta<Navigation>;

export default meta;

const passages = [
	{
		label: 'Prologue',
		ref: 'vv. 1-133',
		urn: 'urn:cts:greekLit:tlg0011.tlg003.kodon-storybook:1-133'
	},
	{
		label: '_Parodos_',
		ref: 'vv. 134-200',
		urn: 'urn:cts:greekLit:tlg0011.tlg003.kodon-storybook:134-200'
	},
	{
		label: 'First episode',
		ref: 'vv. 201-595',
		urn: 'urn:cts:greekLit:tlg0011.tlg003.kodon-storybook:201-595'
	}
];

type Story = StoryObj<typeof meta>;

export const BasicNavigation: Story = {
	args: {
		passages,
		currentPassageUrn: 'urn:cts:greekLit:tlg0011.tlg003.kodon-storybook:134-200'
	}
};

export const NestedNavigation: Story = {
	args: {
		passages: passages.map((p, i) => ({
			...p,
			subpassages: [
				{
					label: `Episode ${i}`,
					ref: `ref ${i}`,
					urn: `urn:cts:greekLit:tlg0011.tlg003.kodon-storybook:subpassage${i}`
				}
			]
		})),
		currentPassageUrn: 'urn:cts:greekLit:tlg0011.tlg003.kodon-storybook:134-200'
	}
};
