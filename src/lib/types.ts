import type CTS_URN from '$lib/cts_urn.js';

// Credit: https://stackoverflow.com/a/55032655
type Modify<T, R> = Omit<T, keyof R> & R;

// Credit: https://stackoverflow.com/a/55483981
type NonFunctionPropertyNames<T> = {
	[K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

export interface Bibliography {
	name: string;
	items: ZoteroItem[];
}

export interface CSL {
	name: string;
	template: string;
}

export type Comment = {
	attributes?: any;
	body: string;
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

export type CommentaryConfig = {
	title: string;
	description: string;
	bibliographies_directory: string;
	commentaries_directory: string;
	editions_directory: string;
	static_pages: StaticPageInfo[];
	editions: DeserializedEditionConfig[];
	passages: DeserializedPassageConfig[];
	table_of_contents: DeserializedPassageConfig[];
};

export type StaticPageInfo = {
	title: string;
	path: string;
	file_path: string;
};

export interface EditionConfig {
	ctsUrn: CTS_URN;
	description: string;
	filename: string;
	label: string;
	urn: string;
}

export type Metadata = {
	title: string;
	description: string;
};

export type PassageConfig = {
	ctsUrn: CTS_URN;
	label: string;
	urn: string;
	ref: string;
};

export type DeserializedComment = Modify<
	Comment,
	{
		ctsUrn: NonFunctionProperties<CTS_URN>;
	}
>;

export type DeserializedEditionConfig = Modify<
	EditionConfig,
	{
		ctsUrn: NonFunctionProperties<CTS_URN>;
	}
>;

export type DeserializedPassageConfig = Modify<
	PassageConfig,
	{
		ctsUrn: NonFunctionProperties<CTS_URN>;
	}
>;

export type DeserializedTextContainer = Modify<
	TextContainer,
	{
		comments: DeserializedComment[];
		ctsUrn: NonFunctionProperties<CTS_URN>;
	}
>;

export type PassageInfo = {
	comments: DeserializedComment[];
	currentPassage: DeserializedPassageConfig;
	editions: DeserializedEditionConfig[];
	metadata: Metadata;
	passages: DeserializedPassageConfig[];
	textContainers: DeserializedTextContainer[];
};

type WikidataYear = {
	datatype: string;
	type: string;
	value: string;
};

type WikidataLiteral = {
	type: string;
	value: string;
	'xml:lang'?: string;
};

type WikidataURI = {
	type: string;
	value: string;
};

export interface WikidataEntry {
	authors?: WikidataLiteral;
	citedBy: WikidataLiteral;
	full_text_urls?: WikidataURI;
	internet_archive_id?: WikidataURI;
	internet_archive_url?: WikidataURI;
	item_typeLabel: WikidataLiteral;
	issue?: WikidataLiteral;
	jstor_url?: WikidataURI;
	page_range?: WikidataLiteral;
	pubYear: WikidataYear;
	published_in_label?: WikidataLiteral;
	publishers: WikidataLiteral;
	publicationPlaces?: WikidataLiteral;
	subject: WikidataURI;
	title: WikidataLiteral;
	volume?: WikidataLiteral;
}

export interface WikidataRow extends WikidataEntry {
	citations: Array<WikidataEntry | undefined>;
	wikidataURL: string;
}

export type Word = {
	commentURNs: (string | undefined)[];
	offset: number;
	text: string;
	xml_id: string;
	urn_index: number;
	urn: string;
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
	ctsUrn: CTS_URN;
	location: string[];
	offset: number;
	speaker?: string | null;
	subtype: 'line' | 'paragraph' | 'quote';
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

export type Line = {
	n: string;
};

export type ZoteroItem = {
	id: string;
	type: string;
	'event-place': string;
	ISBN: string;
	language: string;
	note: string;
	publisher: string;
	'publisher-place': string;
	title: string;
	author: Array<{
		family: string;
		given: string;
	}>;
	issued: {
		'date-parts': Array<Array<string>>;
	};
};
