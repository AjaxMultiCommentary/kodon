import type { Meta, StoryObj } from '@storybook/svelte';
import TextToken from '$lib/components/TextToken.svelte';

import decorator from './decorators/contextDecorator.js';

const meta = {
	component: TextToken,
	decorators: [decorator],
	tags: ['autodocs']
} satisfies Meta<TextToken>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SelectableToken: Story = {
	args: {
		token: {
			text: 'token',
			xml_id: 'xml_id3',
			urn: 'foo:bar:baz'
		}
	}
};
