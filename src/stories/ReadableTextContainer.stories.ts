import type { Meta, StoryObj } from '@storybook/svelte';
import CTS_URN from '$lib/cts_urn.js';
import ReadableTextContainer from '$lib/components/ReadableTextContainer.svelte';
import type { TextContainer, TextElement } from '$lib/types.js';

const meta = {
	component: ReadableTextContainer,
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
} satisfies Meta<ReadableTextContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

const rawTextContainers = [
	{
		index: 68,
		type: 'text_container',
		location: ['1', '12', '5'],
		text: 'Πύρρον δὲ ἐς Σικελίαν ἀπήγαγε πρεσβεία Συρακουσίων· Καρχηδόνιοι γὰρ διαβάντες τὰς Ἑλληνίδας τῶν πόλεων ἐποίουν ἀναστάτους, ἣ δὲ ἦν λοιπή, Συρακούσαις πολιορκοῦντες προσεκάθηντο. ἃ τῶν πρέσβεων Πύρρος ἀκούων Τάραντα μὲν εἴα καὶ τοὺς τὴν ἀκτὴν ἔχοντας Ἰταλιωτῶν, ἐς δὲ τὴν Σικελίαν διαβὰς Καρχηδονίους ἠνάγκασεν ἀπαναστῆναι Συρακουσῶν. φρονήσας δὲ ἐφʼ αὑτῷ Καρχηδονίων, οἳ θαλάσσης τῶν τότε βαρβάρων μάλιστα εἶχον ἐμπείρως Τύριοι Φοίνικες τὸ ἀρχαῖον ὄντες, τούτων ἐναντία ἐπήρθη ναυμαχῆσαι τοῖς Ἠπειρώταις χρώμενος, οἳ μηδὲ ἁλούσης Ἰλίου θάλασσαν οἱ πολλοὶ μηδὲ ἁλσὶν ἠπίσταντό πω χρῆσθαι. μαρτυρεῖ δέ μοι καὶ Ὁμήρου ἔπος ἐν Ὀδυσσείᾳ·  οἳ οὐκ ἴσασι θάλασσαν  ἀνέρες, οὐδέ θʼ ἅλεσσι μεμιγμένον εἶδαρ ἔδουσιν.   Hom. Od. 11.122',
		urn: 'urn:cts:greekLit:tlg0525.tlg001.perseus-grc2:1.12.5',
		end_offset: null,
		start_offset: null,
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
	},
	{
		index: 72,
		type: 'text_container',
		location: ['1', '13', '1'],
		text: 'τότε δὲ ὁ Πύρρος, ὡς ἡττήθη, ταῖς ναυσὶν ἐς Τάραντα ἀνήγετο ταῖς λοιπαῖς· ἐνταῦθα προσέπταισε μεγάλως καὶ τὴν ἀναχώρησιν—οὐ γὰρ ἀμαχεὶ Ῥωμαίους ἠπίστατο ἀφήσοντας—πορίζεται τρόπον τοῦτον. ὡς ἐπανήκων ἐκ Σικελίας ἡττήθη, πρῶτον διέπεμπε γράμματα ἔς τε τὴν Ἀσίαν καὶ πρὸς Ἀντίγονον, τοὺς μὲν στρατιὰν τῶν βασιλέων, τοὺς δὲ χρήματα, Ἀντίγονον δὲ καὶ ἀμφότερα αἰτῶν· ἀφικομένων δὲ τῶν ἀγγέλων, ὥς οἱ γράμματα ἀπεδόθη, συναγαγὼν τοὺς ἐν τέλει τῶν τε ἐξ Ἠπείρου καὶ τῶν Ταραντίνων, ὧν μὲν εἶχε τὰ βιβλία ἀνεγίνωσκεν οὐδέν, ὁ δὲ ἥξειν συμμαχίαν ἔλεγε. ταχὺ δὲ καὶ ἐς τοὺς Ῥωμαίους ἦλθε φήμη Μακεδόνας καὶ ἄλλα ἔθνη περαιοῦσθαι τῶν Ἀσιανῶν ἐς τὴν Πύρρου βοήθειαν· Ῥωμαῖοι μὲν δὴ ταῦτα ἀκούοντες ἡσύχαζον, Πύρρος δὲ ὑπὸ τὴν ἐπιοῦσαν περαιοῦται νύκτα πρὸς τὰ ἄκρα τῶν ὀρῶν, ἃ Κεραύνια ὀνομάζουσι.',
		urn: 'urn:cts:greekLit:tlg0525.tlg001.perseus-grc2:1.13.1',
		end_offset: null,
		start_offset: null,
		subtype: 'div'
	}
];

const unassignedTextElements = [
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
];

function nestTextContainers(textContainers: TextContainer[], textElements: TextElement[]) {
	return textContainers.reduce((acc: any, curr: TextContainer, _, array: TextContainer[]) => {
		const key = curr.location.join('.');
		const group = acc[key] || [];
		const children = array.filter(
			(tc) => curr.start_offset <= tc.start_offset && tc.end_offset <= curr.end_offset
		);

		// TODO: slice text into chunks based on children (this should nest)

		curr.children = children;
		curr.textElements = (curr.textElements || []).concat(
			textElements.filter((te) => te.block_index === curr.index)
		);

		return {
			...acc,
			[key]: [...group, curr]
		};
	}, {});
}
