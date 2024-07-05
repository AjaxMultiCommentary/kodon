import type { Meta, StoryObj } from '@storybook/svelte';
import CTS_URN from '$lib/cts_urn.js';
import ReadingEnvironment from '$lib/components/ReadingEnvironment.svelte';

const meta = {
	component: ReadingEnvironment,
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
			{ offset: 0, text: 'Ἀεὶ', xml_id: 'word_index_0', urn_index: 1 },
			{ offset: 4, text: 'μέν,', xml_id: 'word_index_1', urn_index: 1 },
			{ offset: 9, text: 'ὦ', xml_id: 'word_index_2', urn_index: 1 },
			{ offset: 11, text: 'παῖ', xml_id: 'word_index_3', urn_index: 1 },
			{ offset: 15, text: 'Λαρτίου,', xml_id: 'word_index_4', urn_index: 1 },
			{ offset: 24, text: 'δέδορκά', xml_id: 'word_index_5', urn_index: 1 },
			{ offset: 32, text: 'σε', xml_id: 'word_index_6', urn_index: 1 }
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
			{ offset: 0, text: 'πεῖράν', xml_id: 'word_index_7', urn_index: 1 },
			{ offset: 7, text: 'τινʼ', xml_id: 'word_index_8', urn_index: 1 },
			{ offset: 12, text: 'ἐχθρῶν', xml_id: 'word_index_9', urn_index: 1 },
			{ offset: 19, text: 'ἁρπάσαι', xml_id: 'word_index_10', urn_index: 1 },
			{ offset: 27, text: 'θηρώμενον·', xml_id: 'word_index_11', urn_index: 1 }
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
			{ offset: 0, text: 'καὶ', xml_id: 'word_index_12', urn_index: 1 },
			{ offset: 4, text: 'νῦν', xml_id: 'word_index_13', urn_index: 1 },
			{ offset: 8, text: 'ἐπὶ', xml_id: 'word_index_14', urn_index: 1 },
			{ offset: 12, text: 'σκηναῖς', xml_id: 'word_index_15', urn_index: 1 },
			{ offset: 20, text: 'σε', xml_id: 'word_index_16', urn_index: 1 },
			{ offset: 23, text: 'ναυτικαῖς', xml_id: 'word_index_17', urn_index: 1 },
			{ offset: 33, text: 'ὁρῶ', xml_id: 'word_index_18', urn_index: 1 }
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
