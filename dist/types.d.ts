import type CTS_URN from './cts_urn.js';
export type EditionConfig = {
    ctsUrn: CTS_URN;
    description: string;
    filename: string;
    label: string;
    urn: string;
};
export type PassageConfig = {
    ctsUrn: CTS_URN;
    label: string;
    urn: string;
    ref: string;
};
export type Word = {
    comments?: Comment[];
    offset: number;
    text: string;
    xml_id: string;
    urn_index: number;
};
export type TextElement = {
    attributes: any;
    end_offset: number;
    line_offset: number;
    start_offset: number;
    subtype: string;
    type: 'text_element';
};
export type TextContainer = {
    comments?: Comment[];
    location: string[];
    offset: number;
    speaker?: string | null;
    subtype: 'line' | 'paragraph';
    text: string;
    type: 'text_container';
    words: Word[];
    urn: string;
    textElements?: TextElement[];
};
export type Author = {
    email: string;
    name: string;
    username: string;
    last_name?: string;
};
export type Card = {
    n: string;
    next_n: string;
    xml_content: string;
};
export type Tag = {
    description: string;
    name: string;
    image: string;
};
export type CommentaryAttributes = {
    creators?: Author[];
    edition?: string;
    filename?: string;
    languages?: string[];
    metadata?: string;
    pid?: string;
    place?: string;
    public_domain_year?: number;
    publication_date?: number;
    source_url?: string;
    title?: string;
    urn?: string;
    wikidata_qid?: string;
    zotero_id?: string;
    zotero_link?: string;
};
export type Comment = {
    attributes?: any;
    body?: string | Promise<string>;
    citable_urn?: string;
    commentaryAttributes?: CommentaryAttributes;
    content?: string;
    ctsUrn: CTS_URN;
    end_offset?: string;
    image_paths?: string;
    isHighlighted?: boolean;
    lemma?: string;
    overlays?: string;
    page_ids?: string;
    start_offset?: string;
    transcript?: string;
    urn: string;
};
export type Line = {
    n: string;
};
