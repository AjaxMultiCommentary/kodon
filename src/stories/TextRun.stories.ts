import type { Meta, StoryObj } from '@storybook/svelte';
import TextRun from '$lib/components/TextRun.svelte';

import decorator from './decorators/contextDecorator.js';

import { createWords } from './factories/WordFactory.js';

const meta = {
	component: TextRun,
	decorators: [decorator],
	tags: ['autodocs']
} satisfies Meta<TextRun>;

export default meta;

const textRunData = createWords(5);

type Story = StoryObj<typeof meta>;

export const BasicTextRun: Story = {
	args: {
		run: textRunData
	}
};

export const TextRunWithComments: Story = {
	args: {
		run: createWords(5, 2)
	}
};
