import type { Meta, StoryObj } from '@storybook/svelte';
import CTS_URN from '$lib/cts_urn.js';
import LocationContainer from '$lib/components/LocationContainer.svelte';
import type { TextContainer, TextElement } from '$lib/types.js';

const meta = {
	component: LocationContainer,
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

const rawBlocks = [
	{
		index: 68,
		type: 'text_container',
		location: ['1', '12', '5'],
		text: 'Πύρρον δὲ ἐς Σικελίαν ἀπήγαγε πρεσβεία Συρακουσίων· Καρχηδόνιοι γὰρ διαβάντες τὰς Ἑλληνίδας τῶν πόλεων ἐποίουν ἀναστάτους, ἣ δὲ ἦν λοιπή, Συρακούσαις πολιορκοῦντες προσεκάθηντο. ἃ τῶν πρέσβεων Πύρρος ἀκούων Τάραντα μὲν εἴα καὶ τοὺς τὴν ἀκτὴν ἔχοντας Ἰταλιωτῶν, ἐς δὲ τὴν Σικελίαν διαβὰς Καρχηδονίους ἠνάγκασεν ἀπαναστῆναι Συρακουσῶν. φρονήσας δὲ ἐφʼ αὑτῷ Καρχηδονίων, οἳ θαλάσσης τῶν τότε βαρβάρων μάλιστα εἶχον ἐμπείρως Τύριοι Φοίνικες τὸ ἀρχαῖον ὄντες, τούτων ἐναντία ἐπήρθη ναυμαχῆσαι τοῖς Ἠπειρώταις χρώμενος, οἳ μηδὲ ἁλούσης Ἰλίου θάλασσαν οἱ πολλοὶ μηδὲ ἁλσὶν ἠπίσταντό πω χρῆσθαι. μαρτυρεῖ δέ μοι καὶ Ὁμήρου ἔπος ἐν Ὀδυσσείᾳ·  οἳ οὐκ ἴσασι θάλασσαν  ἀνέρες, οὐδέ θʼ ἅλεσσι μεμιγμένον εἶδαρ ἔδουσιν.   Hom. Od. 11.122',
		urn: 'urn:cts:greekLit:tlg0525.tlg001.perseus-grc2:1.12.5',
		end_offset: 723,
		start_offset: 0,
		subtype: 'div'
	},
	{
		index: 69,
		type: 'text_container',
		location: ['1', '12', '5'],
		text: '  οἳ οὐκ ἴσασι θάλασσαν  ἀνέρες, οὐδέ θʼ ἅλεσσι μεμιγμένον εἶδαρ ἔδουσιν.  ',
		urn: 'urn:cts:greekLit:tlg0525.tlg001.perseus-grc2:1.12.5',
		end_offset: 706,
		start_offset: 632,
		subtype: 'quote'
	},
	{
		index: 70,
		type: 'text_container',
		location: ['1', '12', '5'],
		text: ' οἳ οὐκ ἴσασι θάλασσαν ',
		urn: 'urn:cts:greekLit:tlg0525.tlg001.perseus-grc2:1.12.5',
		end_offset: 655,
		start_offset: 633,
		subtype: 'l'
	},
	{
		index: 71,
		type: 'text_container',
		location: ['1', '12', '5'],
		text: ' ἀνέρες, οὐδέ θʼ ἅλεσσι μεμιγμένον εἶδαρ ἔδουσιν. ',
		urn: 'urn:cts:greekLit:tlg0525.tlg001.perseus-grc2:1.12.5',
		end_offset: 705,
		start_offset: 656,
		subtype: 'l'
	}
] as TextContainer[];

const rawElements = [
	{
		attributes: { ed: 'Spiro', n: '0', unit: 'page' },
		type: 'text_element',
		end_offset: 266,
		start_offset: 266,
		block_index: 68,
		subtype: 'milestone'
	},
	{
		attributes: { n: 'Hom. Od. 11.122' },
		type: 'text_element',
		end_offset: 723,
		start_offset: 707,
		block_index: 68,
		subtype: 'bibl'
	}
] as TextElement[];

const comments = [
	{
		body: 'this is a comment',
		urn: 'urn:cts:greekLit:tlg0525.tlg001.perseus-grc2:1.12.5',
		ctsUrn: new CTS_URN('urn:cts:greekLit:tlg0525.tlg001.perseus-grc2:1.12.5')
	}
];

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

function makeSpan(text: string = '', urn: string) {
	return {
		type: 'text_container',
		subtype: 'span',
		text,
		urn
	};
}
function nest(blocks: any[], root: any = undefined) {
	if (!root) return nest(blocks.slice(1), blocks[0]);

	blocks = blocks.sort((a, b) => a.start_offset - b.start_offset);

	function nestChildren(parent: any) {
		const urn = parent.urn;

		let children = [];

		for (let i = 0; i < blocks.length; i++) {
			const child = blocks[i];

			if (child.parentIndex === parent.index) {
				blocks.splice(i, 1);
				i--;

				child.children = nestChildren(child);

				if (child.children.length > 0) {
					const preText = parent.text.slice(0, child.start_offset - parent.start_offset) as string;

					children.push(makeSpan(preText, urn));
				}

				children.push(child);

				if (child.children.length > 0) {
					const nextChild = blocks[i + 1];

					const postText = parent.text.slice(
						child.end_offset - parent.start_offset,
						nextChild ? nextChild.start_offset - parent.start_offset : parent.end_offset
					);

					children.push(makeSpan(postText, urn));
				}
			}
		}

		return children;
	}

	root.children = nestChildren(root);

	return root;
}

export const LocationContainerStory: Story = {
	// @ts-ignore
	args: {
		comments,
		locationContainer: nest(textContainers)
	}
};
