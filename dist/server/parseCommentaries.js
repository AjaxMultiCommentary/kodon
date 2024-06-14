import fs from 'fs';
import frontMatter from 'front-matter';
import { marked } from 'marked';
import CTS_URN from '../cts_urn.js';
const GLOSSA_PROPERTY_REGEX = /^:(?<name>[^:\n]+):\s+(?<value>.*)(?:\n|$)/;
const URN_REGEX = /\@(?<urn>[^\n]+)/;
/**
 *
 * @param {string} COMMENTARIES_DIR - the directory containing commentary files as markdown
 * @returns {Array<Comment>} - a flat array of the parsed comments from all commentary files found in `COMMENTARIES_DIR`
 */
export function parseCommentaries(COMMENTARIES_DIR = 'commentaries') {
    const files = fs.readdirSync(COMMENTARIES_DIR);
    return files.flatMap((file) => {
        const s = fs.readFileSync(`${COMMENTARIES_DIR}/${file}`, 'utf-8');
        // @ts-ignore
        const { attributes, body } = frontMatter(s);
        const glossae = body.split('\n---\n').map((g) => g.trim()).filter((g) => g !== "");
        return glossae.map((glossa) => {
            const match = glossa.match(URN_REGEX);
            if (match?.groups?.urn) {
                const urn = match.groups.urn;
                let withProperties = glossa.replace(URN_REGEX, "").trim();
                const glossaProperties = {};
                let propMatch = withProperties.match(GLOSSA_PROPERTY_REGEX);
                while (propMatch?.groups?.name) {
                    // @ts-ignore
                    glossaProperties[propMatch.groups.name] = propMatch.groups.value;
                    withProperties = withProperties.replace(GLOSSA_PROPERTY_REGEX, "").trim();
                    propMatch = withProperties.match(GLOSSA_PROPERTY_REGEX);
                }
                return {
                    commentaryAttributes: attributes,
                    ...glossaProperties,
                    body: marked(withProperties),
                    ctsUrn: new CTS_URN(urn),
                    rawBody: withProperties,
                    urn
                };
            }
        });
    });
}
