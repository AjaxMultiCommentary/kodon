import fs from 'fs';
import { parse as parseToml } from 'smol-toml';
import CTS_URN from '../cts_urn.js';
import { parseCommentaries } from '../scripts/parseCommentaries.js';
export default function loadPassage(configPath, editionsDir) {
    const ALL_COMMENTS = parseCommentaries();
    const _doc = fs.readFileSync(configPath, 'utf-8');
    const COMMENTARY_CONFIG = parseURNs(parseToml(_doc));
    const EDITIONS_DIR = editionsDir;
    return function loadPassageFn(urn) {
        const ctsUrn = new CTS_URN(urn);
        const version = ctsUrn.version
            ? COMMENTARY_CONFIG.editions.find((e) => e.ctsUrn.version === ctsUrn.version)
            : COMMENTARY_CONFIG.editions[0];
        if (!version) {
            throw new Error(`Edition ${ctsUrn.toString()} not found.`);
        }
        const passageStart = ctsUrn.integerCitations[0] || [1];
        const passages = COMMENTARY_CONFIG.passages;
        const passageInfo = getPassage(passages, passageStart);
        if (!passageInfo) {
            throw new Error('Passage not found.');
        }
        const editions = COMMENTARY_CONFIG.editions;
        const editionFile = `${EDITIONS_DIR}/${version.ctsUrn.workComponent}.jsonl`;
        const jsonl = fs
            .readFileSync(editionFile, 'utf-8')
            .split('\n')
            .filter((l) => l !== '')
            .map((l) => JSON.parse(l));
        const textContainers = getTextContainersForPassage(passageInfo, jsonl);
        const comments = getCommentsForPassage(ALL_COMMENTS, passageInfo);
        return {
            comments: comments.map((c) => ({ ...c, ctsUrn: c?.ctsUrn.toJSON() })),
            currentPassage: {
                ...passageInfo,
                ctsUrn: passageInfo.ctsUrn.toJSON()
            },
            editions: editions.map((e) => ({ ...e, ctsUrn: e?.ctsUrn.toJSON() })),
            metadata: { title: COMMENTARY_CONFIG.title, description: COMMENTARY_CONFIG.description },
            passages: passages.map((p) => ({ ...p, ctsUrn: p?.ctsUrn.toJSON() })),
            textContainers: textContainers.map((tc) => ({
                ...tc,
                comments: comments.filter((c) => {
                    const textContainerUrn = new CTS_URN(tc.urn);
                    // comment starts on this textContainer
                    return c?.ctsUrn.hasEqualStart(textContainerUrn)
                        // comment ends on this textContainer
                        || c?.ctsUrn.hasEqualEnd(textContainerUrn)
                        // textContainer is contained by this comment
                        || c?.ctsUrn.contains(textContainerUrn);
                }).map(c => ({ ...c, ctsUrn: c?.ctsUrn.toJSON() }))
            }))
        };
    };
}
export function getCommentsForPassage(allComments, passageInfo) {
    return allComments.filter((c) => c && passageInfo.ctsUrn.contains(c.ctsUrn)).sort((cA, cB) => {
        if (cA?.ctsUrn.integerCitations[0][0] === cB?.ctsUrn.integerCitations[0][0]) {
            if (cA?.ctsUrn.tokens.every(t => typeof t === 'undefined')) {
                return -1;
            }
            if (cB?.ctsUrn.tokens.every(t => typeof t === "undefined")) {
                return 1;
            }
            return 0;
        }
        // @ts-ignore
        if (cA?.ctsUrn.integerCitations[0][0] < cB?.ctsUrn.integerCitations[0][0]) {
            return -1;
        }
        return 1;
    });
}
export function getTextContainersForPassage(passageInfo, jsonl) {
    const textContainers = jsonl.filter((l) => l.type === 'text_container' && passageContainsLocation(l.location, passageInfo));
    const textContainerOffsets = textContainers.map((tc) => tc.offset);
    const textElements = jsonl.filter((l) => l.type === 'text_element' && textContainerOffsets.includes(l.line_offset));
    const personaeLoquentes = textElements.filter(te => te.subtype === "speaker").reduce((acc, el) => {
        const currentSpeaker = el.attributes.name;
        if (currentSpeaker !== acc.previousSpeaker) {
            acc[el.line_offset] = currentSpeaker;
            acc.previousSpeaker = currentSpeaker;
        }
        return acc;
    }, { previousSpeaker: null });
    return textContainers.map((tc) => ({
        ...tc,
        speaker: personaeLoquentes[tc.offset] ? personaeLoquentes[tc.offset] : null,
        textElements: textElements.filter((elem) => elem.line_offset === tc.offset)
    }));
}
export function getPassage(passages, passageStart) {
    return passages.find((p) => p.ctsUrn.integerCitations[0].every((c, index) => c <= passageStart[index]) &&
        p.ctsUrn.integerCitations[1].every((c, index) => c >= passageStart[index]));
}
export function parseURNs(config) {
    return {
        ...config,
        editions: config.editions.map((edition) => {
            return {
                ...edition,
                ctsUrn: new CTS_URN(edition.urn)
            };
        }),
        passages: config.table_of_contents.map((passage) => {
            return {
                ...passage,
                ctsUrn: new CTS_URN(passage.urn)
            };
        })
    };
}
// FIXME: There needs to be a generic way of parsing location arrays and mapping them
// to passage URNs. This method will currently only work for single-level works like
// tragedy.
function passageContainsLocation(location, passageInfo) {
    return (parseInt(location[0]) >= parseInt(passageInfo.ctsUrn.citations[0]) &&
        parseInt(location[0]) <= parseInt(passageInfo.ctsUrn.citations[1]));
}