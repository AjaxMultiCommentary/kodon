export type WikidataJSONResponse = {
    results: {
        bindings: Array<object>;
    };
};
export type RawWikidataEntity = {
    authorLabel: {
        'xml:lang': string;
        type: 'literal';
        value: string;
    };
    item: {
        type: string;
        value: string;
    };
    placeLabel?: {
        'xml:lang': string;
        type: 'literal';
        value: string;
    };
    pubdate: {
        datatype: string;
        type: string;
        value: string;
    };
    publisherLabel: {
        'xml:lang': string;
        type: 'literal';
        value: string;
    };
    title: {
        'xml:lang': string;
        type: string;
        value: string;
    };
};
/**
* {
  item: { type: 'uri', value: 'http://www.wikidata.org/entity/Q123748933' },
  authorLabel: { 'xml:lang': 'en', type: 'literal', value: 'Cedric H. Whitman' },
  pubdate: {
    datatype: 'http://www.w3.org/2001/XMLSchema#dateTime',
    type: 'literal',
    value: '1958-01-01T00:00:00Z'
  },
  title: {
    'xml:lang': 'en',
    type: 'literal',
    value: 'Homer and the Heroic Tradition'
  }
}
*/
export declare class WikidataEntity {
    id: string;
    author: string;
    place?: string;
    pubdate: string;
    publisher: string;
    title: string;
    constructor(item: RawWikidataEntity);
}
export declare function getWikidataCitationsForCollection(collectionID: string): Promise<{
    id: string;
    author: string;
    place: string | undefined;
    pubdate: string;
    publisher: string;
    title: string;
    citedBy: object[];
}[]>;
export declare function getWikidataCitedBy(itemID: string): Promise<object[]>;
export declare function getWikidataCiting(itemID: string): Promise<object[]>;
export declare function getWikidataCollection(collectionID: string): Promise<object[]>;
export declare function loadWikidataCitations(citationsJSON?: string): Promise<any>;
