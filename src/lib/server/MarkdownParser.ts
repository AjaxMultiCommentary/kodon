// @ts-expect-error
import { Cite, plugins } from '@citation-js/core';
import { Marked } from 'marked';

import '@citation-js/plugin-csl';

import loadBibliographies from './loadBibliographies.js';

const IN_TEXT_CITATION_REGEX = /@(?<key>[\p{Letter}\p{Number}\-_\.]+)/gu;

export default class MarkdownParser {
	_marked: Marked;
	urlPrefix: string;

	constructor(bibliographiesDirectory: string, urlPrefix: string = '/bibliography') {
		this._marked = new Marked({
			gfm: true,
			renderer: _markedCitationRenderer(bibliographiesDirectory, urlPrefix)
		});
		this.urlPrefix = urlPrefix;
	}

	toHTML(body: string) {
		return this._marked.parse(body);
	}
}

export function _markedCitationRenderer(bibliographiesDirectory: string, urlPrefix: string) {
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

	const replaceCitationsWithLinks = (match: string, ...args: any) => {
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
		text(token: string) {
			return token.replace(IN_TEXT_CITATION_REGEX, replaceCitationsWithLinks);
		}
	};
}
