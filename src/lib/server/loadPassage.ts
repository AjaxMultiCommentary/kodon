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
import { parseCommentaries } from '$lib/server/parseCommentaries.js';

export default function loadPassage(config: CommentaryConfig): (urn: string) => PassageInfo {
	const ALL_COMMENTS = parseCommentaries(config.commentaries_directory);
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
		const comments = getCommentsForPassage(ALL_COMMENTS, {
			...passageInfo,
			ctsUrn: new CTS_URN(passageInfo.ctsUrn.__urn)
		}) as Comment[];

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

export function getCommentsForPassage(allComments: Comment[], passageInfo: PassageConfig) {
	return allComments
		.filter((c) => c && passageInfo.ctsUrn.contains(c.ctsUrn))
		.sort((cA, cB) => {
			if (cA?.ctsUrn.integerCitations[0][0] === cB?.ctsUrn.integerCitations[0][0]) {
				if (cA?.ctsUrn.tokens.every((t) => typeof t === 'undefined')) {
					return -1;
				}

				if (cB?.ctsUrn.tokens.every((t) => typeof t === 'undefined')) {
					return 1;
				}

				return 0;
			}

			if (cA?.ctsUrn.integerCitations[0][0] < cB?.ctsUrn.integerCitations[0][0]) {
				return -1;
			}

			return 1;
		});
}

export function getTextContainersForPassage(
	passageInfo: DeserializedPassageConfig,
	jsonl: (TextContainer | TextElement)[]
): TextContainer[] {
	const textContainers = jsonl.filter(
		(l) => l.type === 'text_container' && passageContainsLocation(l.location, passageInfo)
	) as TextContainer[];
	const textContainerOffsets = textContainers.map((tc) => tc.index);
	const textElements = jsonl.filter(
		(l) => l.type === 'text_element' && textContainerOffsets.includes(l.block_index)
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
			{ previousSpeaker: null }
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
function passageContainsLocation(location: string[], passageInfo: DeserializedPassageConfig) {
	return (
		parseInt(location[0]) >= parseInt(passageInfo.ctsUrn.citations[0]) &&
		parseInt(location[0]) <= parseInt(passageInfo.ctsUrn.citations[1])
	);
}
