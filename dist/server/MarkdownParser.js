// @ts-expect-error
import { Cite, plugins } from '@citation-js/core';
import { Marked } from 'marked';
import '@citation-js/plugin-csl';
import { loadBibliographies } from './loadBibliographies.js';
const IN_TEXT_CITATION_REGEX = /@(?<key>[\p{Letter}\p{Number}\-_\.]+)/gu;
export default class MarkdownParser {
    _marked;
    urlPrefix;
    constructor(bibliographiesDirectory, urlPrefix = '/bibliography') {
        this._marked = new Marked({
            gfm: true,
            renderer: _markedCitationRenderer(bibliographiesDirectory, urlPrefix)
        });
        this.urlPrefix = urlPrefix;
    }
    toHTML(body) {
        return this._marked.parse(body);
    }
}
export function _markedCitationRenderer(bibliographiesDirectory, urlPrefix) {
    const { bibliographies, csls } = loadBibliographies(bibliographiesDirectory);
    const bibliographiesDict = bibliographies.reduce((acc, b) => {
        b.items.forEach((i) => {
            acc[i.id] = i;
        });
        return acc;
    }, {});
    const citationCSLConfig = plugins.config.get('@csl');
    csls.forEach((csl) => {
        citationCSLConfig.templates.add(csl.name, csl.template);
    });
    const replaceCitationsWithLinks = (match, ...args) => {
        const groups = args.at(-1);
        const item = bibliographiesDict[groups.key];
        if (typeof item !== 'undefined') {
            const citation = new Cite(item).format('citation', {
                template: csls[0].name || 'harvard1'
            });
            return `[${citation}](${urlPrefix}#${groups.key})`;
        }
        return match;
    };
    return {
        text(token) {
            return token.replace(IN_TEXT_CITATION_REGEX, replaceCitationsWithLinks);
        }
    };
}
