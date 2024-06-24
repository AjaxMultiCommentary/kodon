import fs from 'node:fs';

import frontMatter from 'front-matter';
// @ts-expect-error
import { Cite, plugins } from '@citation-js/core';
import { marked } from 'marked';

import '@citation-js/plugin-csl';

import CTS_URN from '$lib/cts_urn.js';

import type { Comment } from '$lib/types.js';
import { loadBibliographies } from './loadBibliographies.js';

const IN_TEXT_CITATION_REGEX = /@(?<key>[\p{Letter}\p{Number}\-_\.]+)/u;
const GLOSSA_PROPERTY_REGEX = /^:(?<name>[^:\n]+):\s+(?<value>.*)(?:\n|$)/;
const URN_REGEX = /@(?<urn>[^\n]+)(?:\n|$)/u;

/**
 * 
 * @param {string} commentariesDirectory - the directory containing commentary files as markdown
 * @param {string} bibliographiesDirectory = the directory containing the bibliographies and optional CSL files
 * @returns {Array<Comment>} - a flat array of the parsed comments from all commentary files found in `COMMENTARIES_DIR`
 */
export function parseCommentaries(commentariesDirectory = 'commentaries', bibliographiesDirectory = 'bibliographies'): Comment[] {
    marked.use({ renderer: _markedCitationRenderer(bibliographiesDirectory) });

    const files = fs.readdirSync(commentariesDirectory);

    return files.flatMap((file: string) => {
        const s = fs.readFileSync(`${commentariesDirectory}/${file}`, 'utf-8');
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

export function _markedCitationRenderer(bibliographiesDirectory: string) {
    const { bibliographies, csls } = loadBibliographies(bibliographiesDirectory);
    const bibliographiesDict = bibliographies.reduce((acc, b) => {
        b.items.forEach((i: any) => {
            acc[i.id] = i;
        });

        return acc;
    }, {} as any);

    const citationCSLConfig = plugins.config.get('@csl');

    csls.forEach((csl) => {
        citationCSLConfig.templates.add(csl.name, csl.template);
    });

    return {
        text(token: string) {
            const match = token.match(IN_TEXT_CITATION_REGEX);

            if (match?.groups?.key) {
                const item = bibliographiesDict[match.groups.key];

                if (typeof item !== 'undefined') {
                    const citation = new Cite(item).format('citation', { template: csls[0].name || 'harvard1' });

                    return `[${citation}](/bibliography#${match.groups.key})`;
                }
            }

            return false;
        }
    }
}