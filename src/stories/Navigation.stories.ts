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

const basicPassages = [
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
		passages: basicPassages,
		currentPassageUrn: 'urn:cts:greekLit:tlg0011.tlg003.kodon-storybook:134-200'
	}
};

const nestedPassages = [
	{
		label: 'Book 1',
		ref: '',
		urn: 'urn:cts:greekLit:tlg0525.tlg001.kodon-storybook:1',
		subpassages: [
			{
				label: 'Chapter 1',
				ref: '',
				urn: 'urn:cts:greekLit:tlg0525.tlg001.kodon-storybook:1.1'
			},
			{
				label: 'Chapter 2',
				ref: '',
				urn: 'urn:cts:greekLit:tlg0525.tlg001.kodon-storybook:1.2',
				subpassages: [
					{
						label: 'Section 1',
						ref: '',
						urn: 'urn:cts:greekLit:tlg0525.tlg001.kodon-storybook:1.2.1'
					},
					{
						label: 'Section 2',
						ref: '',
						urn: 'urn:cts:greekLit:tlg0525.tlg001.kodon-storybook:1.2.2'
					}
				]
			}
		]
	},
	{
		label: 'Book 2',
		ref: '',
		urn: 'urn:cts:greekLit:tlg0525.tlg001.kodon-storybook:2',
		subpassages: [
			{
				label: 'Chapter 1',
				ref: '',
				urn: 'urn:cts:greekLit:tlg0525.tlg001.kodon-storybook:2.1'
			},
			{
				label: 'Chapter 2',
				ref: '',
				urn: 'urn:cts:greekLit:tlg0525.tlg001.kodon-storybook:2.2'
			},
			{
				label: 'Chapter 3',
				ref: '',
				urn: 'urn:cts:greekLit:tlg0525.tlg001.kodon-storybook:2.3'
			}
		]
	},
	{
		label: 'Book 3',
		ref: '',
		urn: 'urn:cts:greekLit:tlg0525.tlg001.kodon-storybook:3',
		subpassages: [
			{
				label: 'Chapter 1',
				ref: '',
				urn: 'urn:cts:greekLit:tlg0525.tlg001.kodon-storybook:3.1'
			},
			{
				label: 'Chapter 2',
				ref: '',
				urn: 'urn:cts:greekLit:tlg0525.tlg001.kodon-storybook:3.2'
			}
		]
	}
];

export const NestedNavigation: Story = {
	args: {
		passages: nestedPassages,
		currentPassageUrn: 'urn:cts:greekLit:tlg0525.tlg001.kodon-storybook:1.2.1'
	}
};
