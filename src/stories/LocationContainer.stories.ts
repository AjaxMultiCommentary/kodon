import type { Meta, StoryObj } from '@storybook/svelte';

import CTS_URN from '$lib/cts_urn.js';
import LocationContainer from '$lib/components/LocationContainer.svelte';
import { getCommentsForPassage, nestBlocks } from '$lib/functions.js';

import decorator from './decorators/contextDecorator.js';
import comments from './stubs/nagyComments.js';
import rawBlocks from './stubs/textContainers.js';
import rawElements from './stubs/textElements.js';

const meta = {
	component: LocationContainer,
	decorators: [decorator],
	tags: ['autodocs'],
	parameters: {
		sveltekit_experimental: {
			stores: {
				page: {
					url: {
						searchParams: {
							get(s: string) {
								return '';
							}
						}
					}
				}
			}
		}
	}
} satisfies Meta<LocationContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

const textContainers = rawBlocks.map((block) => {
	return {
		...block,
		parentIndex: rawBlocks.findLast(
			(b) =>
				b.index !== block.index &&
				block.start_offset >= b.start_offset &&
				block.end_offset <= b.end_offset
		)?.index,
		ctsUrn: new CTS_URN(block.urn),
		textElements: rawElements.filter((e) => e.block_index === block.index)
	};
});

const passageComments = getCommentsForPassage(comments, textContainers[0].ctsUrn);

export const LocationContainerStory: Story = {
	// @ts-ignore
	args: {
		comments: passageComments,
		showHeatmap: true,
		locationContainer: nestBlocks(textContainers)
	}
};
