import fs from 'node:fs';
import { base } from '$app/paths';
import CTS_URN from '../cts_urn.js';
import MarkdownParser from './MarkdownParser.js';
import { parseCommentaries } from './parseCommentaries.js';
export default function loadPassage(config) {
    const ALL_COMMENTS = parseCommentaries(config.commentaries_directory);
    const markdownParser = new MarkdownParser(config.bibliographies_directory, `${base}/bibliography/`);
    return function _loadPassage(urn) {
        const ctsUrn = new CTS_URN(urn);
        const version = ctsUrn.version
            ? config.editions.find((e) => e.ctsUrn.version === ctsUrn.version)
            : config.editions[0];
        if (!version) {
            throw new Error(`Edition ${ctsUrn.toString()} not found.`);
        }
        const passageStart = ctsUrn.integerCitations[0] || [1];
        const passages = config.passages;
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
        const textContainers = getTextContainersForPassage(passageInfo, jsonl);
        const comments = getCommentsForPassage(ALL_COMMENTS, {
            ...passageInfo,
            ctsUrn: new CTS_URN(passageInfo.ctsUrn.__urn)
        });
        return {
            comments: comments.map((c) => ({
                ...c,
                body: markdownParser.toHTML(c.body),
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
                    return (c?.ctsUrn.hasEqualStart(textContainerUrn) ||
                        // comment ends on this textContainer
                        c?.ctsUrn.hasEqualEnd(textContainerUrn) ||
                        // textContainer is contained by this comment
                        c?.ctsUrn.contains(textContainerUrn));
                })
                    .map((c) => ({ ...c, ctsUrn: c?.ctsUrn.toJSON() }))
            }))
        };
    };
}
export function getCommentsForPassage(allComments, passageInfo) {
    return allComments
        .filter((c) => c && passageInfo.ctsUrn.contains(c.ctsUrn))
        .sort((cA, cB) => {
        if (cA?.ctsUrn.integerCitations[0].every((v, i) => v === cB?.ctsUrn.integerCitations[0][i])) {
            if (cA?.ctsUrn.tokens.every((t) => typeof t === 'undefined')) {
                return -1;
            }
            if (cB?.ctsUrn.tokens.every((t) => typeof t === 'undefined')) {
                return 1;
            }
            return 0;
        }
        for (let i = 0, l = cA?.ctsUrn.integerCitations[0].length; i < l; i++) {
            if (cA?.ctsUrn.integerCitations[0][i] < cB?.ctsUrn.integerCitations[0][i]) {
                return -1;
            }
            if (cA?.ctsUrn.integerCitations[0][i] > cB?.ctsUrn.integerCitations[0][i]) {
                return 1;
            }
        }
        return 0;
    });
}
export function getTextContainersForPassage(passageInfo, jsonl) {
    const textContainers = jsonl.filter((block) => block.type === 'text_container' && passageContainsLocation(block.urn, passageInfo));
    const textContainerIndexes = textContainers.map((tc) => tc.index);
    const textElements = jsonl.filter((el) => el.type === 'text_element' && textContainerIndexes.includes(el.block_index));
    const personaeLoquentes = textElements
        .filter((te) => te.subtype === 'speaker')
        .reduce((acc, el) => {
        const currentSpeaker = el.attributes.name;
        if (currentSpeaker !== acc.previousSpeaker) {
            acc[el.block_index] = currentSpeaker;
            acc.previousSpeaker = currentSpeaker;
        }
        return acc;
    }, { previousSpeaker: null });
    return textContainers.map((tc) => ({
        ...tc,
        speaker: personaeLoquentes[tc.index] ? personaeLoquentes[tc.index] : null,
        textElements: textElements.filter((elem) => elem.block_index === tc.index)
    }));
}
export function getPassage(passages, passageStart) {
    return passages.find((p) => p.ctsUrn.integerCitations[0].every((c, index) => c <= passageStart[index]) &&
        p.ctsUrn.integerCitations[1].every((c, index) => c >= passageStart[index]));
}
// FIXME: There needs to be a generic way of parsing location arrays and mapping them
// to passage URNs. This method will currently only work for single-level works like
// tragedy.
function passageContainsLocation(urn, passageInfo) {
    const ctsUrn = new CTS_URN(urn);
    const passageUrn = new CTS_URN(passageInfo.urn);
    return passageUrn.contains(ctsUrn);
}
