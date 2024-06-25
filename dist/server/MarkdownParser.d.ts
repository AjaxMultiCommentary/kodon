import { Marked } from 'marked';
import '@citation-js/plugin-csl';
export default class MarkdownParser {
    _marked: Marked;
    urlPrefix: string;
    constructor(bibliographiesDirectory: string, urlPrefix?: string);
    toHTML(body: string): string | Promise<string>;
}
export declare function _markedCitationRenderer(bibliographiesDirectory: string, urlPrefix: string): {
    text(token: string): string;
};
