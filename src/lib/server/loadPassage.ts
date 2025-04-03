import type {
	Comment,
	CommentaryConfig,
	DeserializedEditionConfig,
	DeserializedPassageConfig,
	PassageConfig,
	PassageInfo,
	TextContainer,
	TextElement
} from '$lib/types.js';

import fs from 'node:fs';

import { base } from '$app/paths';

import CTS_URN from '$lib/cts_urn.js';
import MarkdownParser from './MarkdownParser.js';
 import readCommentariesFromFS from './readCommentariesFromFS.js';
import { getCommentsForPassage, parseCommentary } from '$lib/functions.js';

export default function loadPassage(config: CommentaryConfig): (urn: string) => PassageInfo {
	const ALL_COMMENTS = readCommentariesFromFS(config.commentaries_directory, parseCommentary);
	const markdownParser = new MarkdownParser(
		config.bibliographies_directory,
		`${base}/bibliography/`
	);

	return function _loadPassage(urn: string): PassageInfo {
		const ctsUrn = new CTS_URN(urn);
		const version = ctsUrn.version
			? config.editions.find((e: DeserializedEditionConfig) => e.ctsUrn.version === ctsUrn.version)
			: config.editions[0];

		if (!version) {
			throw new Error(`Edition ${ctsUrn.toString()} not found.`);
		}

		const passageStart = ctsUrn.integerCitations[0] || [1];
		const passages: DeserializedPassageConfig[] = config.passages;
		const passageInfo = getPassage(passages, passageStart);

		if (!passageInfo) {
			throw new Error('Passage not found.');
		}

		const editions = config.editions;
		const editionFile = `${config.editions_directory}/${version.ctsUrn.workComponent}.jsonl`;
		const jsonl = fs
			.readFileSync(editionFile, 'utf-8')
			.split('\n')
			.filter((l) => l !== '')
			.map((l) => JSON.parse(l));

		const textContainers = getTextContainersForPassage(passageInfo, jsonl) as TextContainer[];
		const comments = getCommentsForPassage(ALL_COMMENTS, new CTS_URN(passageInfo.ctsUrn.__urn)) as Comment[];

		return {
			comments: comments.map((c) => ({
				...c,
				body: markdownParser.toHTML(c.body) as string,
				ctsUrn: c?.ctsUrn.toJSON()
			})),
			currentPassage: passageInfo,
			editions,
			metadata: { title: config.title, description: config.description },
			passages,
			textContainers: textContainers.map((tc) => ({
				...tc,
				comments: comments
					.filter((c) => {
						const textContainerUrn = new CTS_URN(tc.urn);

						// comment starts on this textContainer
						return (
							c?.ctsUrn.hasEqualStart(textContainerUrn) ||
							// comment ends on this textContainer
							c?.ctsUrn.hasEqualEnd(textContainerUrn) ||
							// textContainer is contained by this comment
							c?.ctsUrn.contains(textContainerUrn)
						);
					})
					.map((c) => ({ ...c, ctsUrn: c?.ctsUrn.toJSON() }))
			}))
		};
	};
}

export function getTextContainersForPassage(
	passageInfo: DeserializedPassageConfig,
	jsonl: (TextContainer | TextElement)[]
): TextContainer[] {
	const textContainers = jsonl.filter(
		(block) => block.type === 'text_container' && passageContainsLocation(block.urn, passageInfo)
	) as TextContainer[];
	const textContainerIndexes = textContainers.map((tc) => tc.index);

	const textElements = jsonl.filter(
		(el) => el.type === 'text_element' && textContainerIndexes.includes(el.block_index)
	) as TextElement[];
	const personaeLoquentes = textElements
		.filter((te) => te.subtype === 'speaker')
		.reduce(
			(acc, el) => {
				const currentSpeaker = el.attributes.name;

				if (currentSpeaker !== acc.previousSpeaker) {
					acc[el.block_index] = currentSpeaker;

					acc.previousSpeaker = currentSpeaker;
				}

				return acc;
			},
			{ previousSpeaker: null } as { previousSpeaker: null | string } & { [key: number]: string }
		);

	return textContainers.map((tc) => ({
		...tc,
		speaker: personaeLoquentes[tc.index] ? personaeLoquentes[tc.index] : null,
		textElements: textElements.filter((elem) => elem.block_index === tc.index)
	}));
}

export function getPassage(
	passages: DeserializedPassageConfig[],
	passageStart: number[]
): DeserializedPassageConfig | undefined {
	return passages.find(
		(p) =>
			p.ctsUrn.integerCitations[0].every((c, index) => c <= passageStart[index]) &&
			p.ctsUrn.integerCitations[1].every((c, index) => c >= passageStart[index])
	);
}

// FIXME: There needs to be a generic way of parsing location arrays and mapping them
// to passage URNs. This method will currently only work for single-level works like
// tragedy.
function passageContainsLocation(urn: string, passageInfo: DeserializedPassageConfig) {
	const ctsUrn = new CTS_URN(urn);
	const passageUrn = new CTS_URN(passageInfo.urn);

	return passageUrn.contains(ctsUrn);
}
