import type { Meta, StoryObj } from '@storybook/svelte';
import type { Comment } from '$lib/types.js';

import CTS_URN from '$lib/cts_urn.js';
import CommentGrid from '$lib/components/CommentGrid.svelte';
import comments from './stubs/comments.js';
import { getCommentsForPassage } from '$lib/functions.js';

const meta = {
	component: CommentGrid,
	decorators: [],
	tags: ['autodocs'],

} satisfies Meta<CommentGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

const citationPrefix: string = 'v.';
const citationPrefixPlural: string = 'vv.';

const stringifyCommentCitation: (comment: Comment) => string = (comment: Comment) => {
	const { integerCitations } = comment.ctsUrn;

	if (integerCitations.length === 2) {
		if (integerCitations[0].join('') !== integerCitations[1].join('')) {
			return `${citationPrefixPlural} ${integerCitations[0].join('')}-${integerCitations[1].join('')}`;
		}
	}

	return `${citationPrefix} ${integerCitations[0].join('')}`;
};

export const CommentGridStory: Story = {
	// @ts-ignore
	args: {
		comments: getCommentsForPassage(
			comments, 
			new CTS_URN('urn:cts:greekLit:tlg0011.tlg003:1-133')
		),
		stringifyCommentCitation
	}
};
