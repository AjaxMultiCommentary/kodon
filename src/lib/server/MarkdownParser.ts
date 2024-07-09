// @ts-expect-error
import { Cite, plugins } from '@citation-js/core';
import { Marked } from 'marked';

import '@citation-js/plugin-csl';

import loadBibliographies from './loadBibliographies.js';
import type { Bibliography, CSL } from '$lib/types.js';

const IN_TEXT_CITATION_REGEX = /@(?<key>[\p{Letter}\p{Number}\-_\.]+)/gu;

export default class MarkdownParser {
	_marked: Marked;
	bibliographies: { [id: string]: Bibliography };
	citationCSLConfig: any;
	csls: CSL[];
	urlPrefix: string;

	constructor(bibliographiesDirectory: string, urlPrefix: string = '/bibliography') {
		const { bibliographies, csls } = loadBibliographies(bibliographiesDirectory);

		this.bibliographies = bibliographies.reduce((acc, b) => {
			b.items.forEach((i: any) => {
				acc[i.id] = i;
			});

			return acc;
		}, {} as any);
		this.csls = csls;
		this.citationCSLConfig = plugins.config.get('@csl');

		csls.forEach((csl) => {
			this.citationCSLConfig.templates.add(csl.name, csl.template);
		});

		this.urlPrefix = urlPrefix;

		const preprocess = (markdown: string) => {
			const _replaceAtCitationsWithLinks = (match: string, ...args: any[]) => {
				const groups = args.at(-1);
				const item = this.bibliographies[groups.key];

				if (typeof item !== 'undefined') {
					const citation = new Cite(item).format('citation', {
						template: this.csls[0].name || 'harvard1'
					});

					return `[${citation}](${this.urlPrefix}#${groups.key})`;
				}

				return match;
			};

			return markdown.replace(IN_TEXT_CITATION_REGEX, _replaceAtCitationsWithLinks);
		};

		this._marked = new Marked({ gfm: true, hooks: { preprocess } });
	}

	toHTML(body: string) {
		return this._marked.parse(body);
	}
}
