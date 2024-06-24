import fs from 'node:fs';

import frontMatter from 'front-matter';
import { marked } from 'marked';

import CTS_URN from '$lib/cts_urn.js';

import type { Comment } from '$lib/types.js';

const GLOSSA_PROPERTY_REGEX = /^:(?<name>[^:\n]+):\s+(?<value>.*)(?:\n|$)/;
const URN_REGEX = /\@(?<urn>[^\n]+)/;

/**
 * 
 * @param {string} COMMENTARIES_DIR - the directory containing commentary files as markdown
 * @returns {Array<Comment>} - a flat array of the parsed comments from all commentary files found in `COMMENTARIES_DIR`
 */
export function parseCommentaries(COMMENTARIES_DIR = 'commentaries'): Comment[] {
    const files = fs.readdirSync(COMMENTARIES_DIR);

    return files.flatMap((file: string) => {
        const s = fs.readFileSync(`${COMMENTARIES_DIR}/${file}`, 'utf-8');
        // @ts-ignore
        const { attributes, body } = frontMatter(s);
        const glossae = body.split('\n---\n').map((g: string) => g.trim()).filter((g: string) => g !== "");

        return glossae.map((glossa: string) => parseGlossa(attributes, glossa));
    });
}

export function parseGlossa(attributes: object, glossa: string) {
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
            body: convertMarkdownBodyToHtml(withProperties),
            ctsUrn: new CTS_URN(urn),
            rawBody: withProperties,
            urn
        };
    }
}

export function convertMarkdownBodyToHtml(body: string) {
    return marked(body);
}

function _markedAddInTextCitations() {
    return {
        renderer: {

        }
    }
}