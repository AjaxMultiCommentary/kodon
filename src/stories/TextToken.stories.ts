import type { Meta, StoryObj } from '@storybook/svelte';
import TextToken from '$lib/components/TextToken.svelte';
import CTS_URN from '$lib/cts_urn.js';

const meta = {
    component: TextToken,
    tags: ['autodocs']
} satisfies Meta<TextToken>;

export default meta;

type Story = StoryObj<typeof meta>;

const ctsUrn1 = 'urn:cts:greekLit:tlg0011.tlg003.ajmc-meta:1@Second';

const manyComments = [
    ctsUrn1,
    'urn:cts:greekLit:tlg0011.tlg003.ajmc-cam:1@Second',
    'urn:cts:greekLit:tlg0011.tlg003.ajmc-fin:1@Second',
    'urn:cts:greekLit:tlg0011.tlg003.ajmc-her:1@Second',
    'urn:cts:greekLit:tlg0011.tlg003.ajmc-jeb:1@Second',
    'urn:cts:greekLit:tlg0011.tlg003.ajmc-unt:1@Second',
    'urn:cts:greekLit:tlg0011.tlg003.ajmc-fer:1@Second'
];

export const ManyComments: Story = {
    args: {
        token: {
            commentURNs: manyComments,
            offset: 0,
            text: 'Second',
            xml_id: 'xml_id3',
            urn_index: 1
        },
        showHeatmap: true
    }
};

export const OneComment: Story = {
    args: {
        token: {
            commentURNs: [ctsUrn1],
            offset: 0,
            text: 'Second',
            xml_id: 'xml_id2',
            urn_index: 1
        },
        showHeatmap: true
    }
};


export const NoComments: Story = {
    args: {
        token: {
            commentURNs: [],
            offset: 0,
            text: 'Example',
            xml_id: 'xml_id1',
            urn_index: 1
        },
        showHeatmap: true
    }
};