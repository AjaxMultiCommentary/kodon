import type { Meta, StoryObj } from '@storybook/svelte';
import CTS_URN from '$lib/cts_urn.js';
import ReadingEnvironment from '$lib/components/ReadingEnvironment.svelte';

import decorator from './decorators/contextDecorator.js';

const meta = {
	component: ReadingEnvironment,
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
} satisfies Meta<ReadingEnvironment>;

export default meta;

type Story = StoryObj<typeof meta>;

const commentUrn = 'urn:cts:greekLit:tlg0011.tlg003.ajmc-stories:2@ἐχθρῶν';
const passageUrn = 'urn:cts:greekLit:tlg0011.tlg003.ajmc-lj:1-3';
const otherPassageUrn = 'urn:cts:greekLit:tlg0011.tlg003.ajmc-lj:4-5';

const currentPassage = {
	ctsUrn: new CTS_URN(passageUrn),
	label: 'Passage 1',
	urn: passageUrn,
	ref: 'vv. 1-3'
};
const passages = [
	currentPassage,
	{
		ctsUrn: new CTS_URN(otherPassageUrn),
		label: 'Passage 2',
		urn: otherPassageUrn,
		ref: 'vv. 4-5'
	}
];

const textContainers = [
	{
		offset: 0,
		type: 'text_container',
		location: ['1'],
		text: 'Ἀεὶ μέν, ὦ παῖ Λαρτίου, δέδορκά σε',
		words: [
			{
				offset: 0,
				text: 'Ἀεὶ',
				urn: 'urn:cts:greekLit:tlg0011.tlg003.ajmc-lj:1@Ἀεὶ[1]',
				urn_index: 1,
				xml_id: 'word_index_0'
			},
			{
				offset: 4,
				text: 'μέν,',
				urn: 'urn:cts:greekLit:tlg0011.tlg003.ajmc-lj:1@μέν,[1]',
				urn_index: 1,
				xml_id: 'word_index_1'
			},
			{
				offset: 9,
				text: 'ὦ',
				urn: 'urn:cts:greekLit:tlg0011.tlg003.ajmc-lj:1@ὦ[1]',
				urn_index: 1,
				xml_id: 'word_index_2'
			},
			{
				offset: 11,
				text: 'παῖ',
				urn: 'urn:cts:greekLit:tlg0011.tlg003.ajmc-lj:1@παῖ[1]',
				urn_index: 1,
				xml_id: 'word_index_3'
			},
			{
				offset: 15,
				text: 'Λαρτίου,',
				urn: 'urn:cts:greekLit:tlg0011.tlg003.ajmc-lj:1@Λαρτίου,[1]',
				urn_index: 1,
				xml_id: 'word_index_4'
			},
			{
				offset: 24,
				text: 'δέδορκά',
				urn: 'urn:cts:greekLit:tlg0011.tlg003.ajmc-lj:1@δέδορκά[1]',
				urn_index: 1,
				xml_id: 'word_index_5'
			},
			{
				offset: 32,
				text: 'σε',
				urn: 'urn:cts:greekLit:tlg0011.tlg003.ajmc-lj:1@σε[1]',
				urn_index: 1,
				xml_id: 'word_index_6'
			}
		],
		subtype: 'line',
		urn: 'urn:cts:greekLit:tlg0011.tlg003.ajmc-lj:1'
	},
	{
		offset: 1,
		type: 'text_container',
		location: ['2'],
		text: 'πεῖράν τινʼ ἐχθρῶν ἁρπάσαι θηρώμενον·',
		words: [
			{
				offset: 0,
				text: 'πεῖράν',
				urn: 'urn:cts:greekLit:tlg0011.tlg003.ajmc-lj:2@πεῖράν[1]',
				urn_index: 1,
				xml_id: 'word_index_7'
			},
			{
				offset: 7,
				text: 'τινʼ',
				urn: 'urn:cts:greekLit:tlg0011.tlg003.ajmc-lj:2@τινʼ[1]',
				urn_index: 1,
				xml_id: 'word_index_8'
			},
			{
				offset: 12,
				text: 'ἐχθρῶν',
				urn: 'urn:cts:greekLit:tlg0011.tlg003.ajmc-lj:2@ἐχθρῶν[1]',
				urn_index: 1,
				xml_id: 'word_index_9'
			},
			{
				offset: 19,
				text: 'ἁρπάσαι',
				urn: 'urn:cts:greekLit:tlg0011.tlg003.ajmc-lj:2@ἁρπάσαι[1]',
				urn_index: 1,
				xml_id: 'word_index_10'
			},
			{
				offset: 27,
				text: 'θηρώμενον·',
				urn: 'urn:cts:greekLit:tlg0011.tlg003.ajmc-lj:2@θηρώμενον·[1]',
				urn_index: 1,
				xml_id: 'word_index_11'
			}
		],
		subtype: 'line',
		urn: 'urn:cts:greekLit:tlg0011.tlg003.ajmc-lj:2'
	},
	{
		offset: 2,
		type: 'text_container',
		location: ['3'],
		text: 'καὶ νῦν ἐπὶ σκηναῖς σε ναυτικαῖς ὁρῶ',
		words: [
			{
				offset: 0,
				text: 'καὶ',
				urn: 'urn:cts:greekLit:tlg0011.tlg003.ajmc-lj:3@καὶ[1]',
				urn_index: 1,
				xml_id: 'word_index_12'
			},
			{
				offset: 4,
				text: 'νῦν',
				urn: 'urn:cts:greekLit:tlg0011.tlg003.ajmc-lj:3@νῦν[1]',
				urn_index: 1,
				xml_id: 'word_index_13'
			},
			{
				offset: 8,
				text: 'ἐπὶ',
				urn: 'urn:cts:greekLit:tlg0011.tlg003.ajmc-lj:3@ἐπὶ[1]',
				urn_index: 1,
				xml_id: 'word_index_14'
			},
			{
				offset: 12,
				text: 'σκηναῖς',
				urn: 'urn:cts:greekLit:tlg0011.tlg003.ajmc-lj:3@σκηναῖς[1]',
				urn_index: 1,
				xml_id: 'word_index_15'
			},
			{
				offset: 20,
				text: 'σε',
				urn: 'urn:cts:greekLit:tlg0011.tlg003.ajmc-lj:3@σε[1]',
				urn_index: 1,
				xml_id: 'word_index_16'
			},
			{
				offset: 23,
				text: 'ναυτικαῖς',
				urn: 'urn:cts:greekLit:tlg0011.tlg003.ajmc-lj:3@ναυτικαῖς[1]',
				urn_index: 1,
				xml_id: 'word_index_17'
			},
			{
				offset: 33,
				text: 'ὁρῶ',
				urn: 'urn:cts:greekLit:tlg0011.tlg003.ajmc-lj:3@ὁρῶ[1]',
				urn_index: 1,
				xml_id: 'word_index_18'
			}
		],
		subtype: 'line',
		urn: 'urn:cts:greekLit:tlg0011.tlg003.ajmc-lj:3'
	}
];

const textElements = [
	{
		attributes: { name: 'ΑΘΗΝΑ' },
		type: 'text_element',
		end_offset: 34,
		start_offset: 0,
		line_offset: 0,
		subtype: 'speaker'
	},
	{
		attributes: { name: 'ΑΘΗΝΑ' },
		type: 'text_element',
		end_offset: 37,
		start_offset: 0,
		line_offset: 1,
		subtype: 'speaker'
	},
	{
		attributes: { name: 'ΑΘΗΝΑ' },
		type: 'text_element',
		end_offset: 36,
		start_offset: 0,
		line_offset: 2,
		subtype: 'speaker'
	}
];

const heatmapTooltip = `The highlights below illustrate the "density" of 
comments on a particular lemma or line. 
Darker shades of blue indicate a greater number of glosses on the 
highlighted portion of the text.`;
const filterListTooltip = `Use this filter to show or hide comments on the right. You can search for a commentary by name using the text box.`;
const navigationTooltip = `This synopsis is based on the Lloyd-Jones edition of the text,
                    and the line numbers might not line up exactly with other editions.
                    Click on a section of the synopsis to view it in the critical text area.`;
export const ReadingEnvironmentStory: Story = {
	args: {
		comments: [],
		currentPassage,
		currentURL: new URL('http://localhost'),
		iiifURL: '',
		metadata: { title: 'Title', description: 'Description' },
		passages,
		// @ts-ignore
		textContainers: textContainers.map((tc) => ({ ...tc, ctsUrn: new CTS_URN(tc.urn) })),
		heatmapTooltip,
		filterListTooltip,
		navigationTooltip
	}
};
