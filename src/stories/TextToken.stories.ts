import type { Meta, StoryObj } from '@storybook/svelte';
import TextToken from '$lib/components/TextToken.svelte';
import CTS_URN from '$lib/cts_urn.js';

const meta = {
    component: TextToken,
    tags: ['autodocs']
} satisfies Meta<TextToken>;

export default meta;

type Story = StoryObj<typeof meta>;

const ctsUrn1 = new CTS_URN('urn:cts:greekLit:tlg0011.tlg003.ajmc-meta:1@Second');

const manyComments = [
    ctsUrn1,
    new CTS_URN('urn:cts:greekLit:tlg0011.tlg003.ajmc-cam:1@Second'),
    new CTS_URN('urn:cts:greekLit:tlg0011.tlg003.ajmc-fin:1@Second'),
    new CTS_URN('urn:cts:greekLit:tlg0011.tlg003.ajmc-her:1@Second'),
    new CTS_URN('urn:cts:greekLit:tlg0011.tlg003.ajmc-jeb:1@Second'),
    new CTS_URN('urn:cts:greekLit:tlg0011.tlg003.ajmc-unt:1@Second'),
    new CTS_URN('urn:cts:greekLit:tlg0011.tlg003.ajmc-fer:1@Second')
].map((urn, index) => ({ body: `text_${index}`, ctsUrn: urn, urn: urn.__urn }));

export const ManyComments: Story = {
    args: {
        token: {
            comments: manyComments,
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
            comments: [{ body: 'text', ctsUrn: ctsUrn1, urn: ctsUrn1.__urn }],
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
            comments: [],
            offset: 0,
            text: 'Example',
            xml_id: 'xml_id1',
            urn_index: 1
        },
        showHeatmap: true
    }
};