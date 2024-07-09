import { Marked } from 'marked';
import '@citation-js/plugin-csl';
import type { Bibliography, CSL } from '../types.js';
export default class MarkdownParser {
    _marked: Marked;
    bibliographies: {
        [id: string]: Bibliography;
    };
    citationCSLConfig: any;
    csls: CSL[];
    urlPrefix: string;
    constructor(bibliographiesDirectory: string, urlPrefix?: string);
    toHTML(body: string): string | Promise<string>;
}
