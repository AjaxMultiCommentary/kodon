const USER_AGENT =
	'Kodon/0.1 (https://github.com/ajaxMultiCommentary/kodon) kodon-mini-comp-lib/0.1';

export type WikidataJSONResponse = {
	results: {
		bindings: Array<object>;
	};
};

export type RawWikidataEntity = {
	item: { type: string; value: string };
	pubdate: { datatype: string; type: string; value: string };
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

export class WikidataEntity {
	id: string;
	pubdate: string;
	title: string;

	constructor(item: RawWikidataEntity) {
		const uri = item.item.value;
		const itemID = uri.split('/').at(-1);

		console.assert(typeof itemID === 'string');

		this.id = itemID as string;
		this.pubdate = item.pubdate.value;
		this.title = item.title.value;
	}
}

export async function getWikidataCitationsForCollection(collectionID: string) {
	const items = await getWikidataCollection(collectionID);

	const withCitations = await Promise.all(
		items.map(async (i) => {
			const item = new WikidataEntity(i as RawWikidataEntity);

			const citedBy = await getWikidataCitedBy(item.id);
			const citing = await getWikidataCiting(item.id);

			return {
				...item,
				citedBy,
				citing
			};
		})
	);

	return withCitations;
}

export async function getWikidataCitedBy(itemID: string) {
	const query = _wikidataCitedByQuery(itemID);
	const req = await _request(query);

	return req.results.bindings;
}

export async function getWikidataCiting(itemID: string) {
	const query = _wikidataCitingQuery(itemID);
	const req = await _request(query);

	return req.results.bindings;
}

export async function getWikidataCollection(collectionID: string) {
	const query = _wikidataCollectionQuery(collectionID);
	const req = await _request(query);

	return req.results.bindings;
}

async function _request(query: string): Promise<WikidataJSONResponse> {
	try {
		const res = await fetch(
			`https://query.wikidata.org/sparql?query=${encodeURIComponent(query)}`,
			{
				method: 'GET',
				headers: new Headers({
					Accept: 'application/sparql-results+json',
					'User-Agent': USER_AGENT
				})
			}
		);

		return (await res.json()) as WikidataJSONResponse;
	} catch (e) {
		console.error('An error occurred while querying Wikidata:', e);

		throw e;
	}
}

function _wikidataCitedByQuery(itemID: string): string {
	return `
  SELECT
     ?cited ?cited_authorLabel ?cited_title ?cited_pubdate
  where {
    # wd:Q122238857 is the Wikidata ID for Ferrari's commentary
    wd:${itemID} wdt:P2860 ?cited.
    ?cited wdt:P1476 ?cited_title;
           wdt:P577 ?cited_pubdate;
          wdt:P50 ?cited_author.

    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  }`;
}

function _wikidataCitingQuery(itemID: string): string {
	return `
  SELECT
     ?citing ?citing_authorLabel ?citing_title ?citing_pubdate
  where {
    ?citing wdt:P2860 wd:${itemID}.
    ?citing wdt:P1476 ?citing_title;
           wdt:P577 ?citing_pubdate;
          wdt:P50 ?citing_author.

    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  }
  `;
}

function _wikidataCollectionQuery(collectionID: string): string {
	return `
  SELECT ?item ?language ?authorLabel ?title ?pubdate WHERE {
    ?item wdt:P195 wd:${collectionID};
      wdt:P577 ?pubdate;
      wdt:P1476 ?title;
      wdt:P50 ?author.
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  }
  `;
}

// const body = await getWikidataCitationsForCollection('Q123783872');
// // const body = await getWikidataCitedBy('Q122238857');
// console.log(body);
