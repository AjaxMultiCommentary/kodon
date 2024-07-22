import fs from 'fs';
import process from 'process';
import { fileURLToPath } from 'url';

const USER_AGENT =
	'Kodon/0.2 (https://github.com/ajaxMultiCommentary/kodon) kodon-mini-comp-lib/0.2';

export type WikidataJSONResponse = {
	results: {
		bindings: Array<object>;
	};
};

function wait(milliseconds: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, milliseconds);
	});
}

export async function getWikidataCitationsForCollection(collectionID: string) {
	const items = await getWikidataCollection(collectionID);

	return items;
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

		if (res.status === 429) {
			console.error(await res.text());
			throw new Error('Wikidata rate limit exceeded.');
		}

		return (await res.json()) as WikidataJSONResponse;
	} catch (e) {
		console.error('An error occurred while querying Wikidata:', e);

		throw e;
	}
}

function _wikidataCollectionQuery(collectionID: string): string {
	return `
SELECT ?subject ?title ?pubdate ?authorLabel ?publisherLabel ?placeLabel ?full_text_url ?internet_archive_id (GROUP_CONCAT(?citing; SEPARATOR = ", ") AS ?citations) WHERE {
  VALUES ?item {
    wd:${collectionID}
  }
  ?subject ?predicate ?item.
  ?property wikibase:directClaim ?predicate.
  ?subject wdt:P1476 ?title;
    wdt:P577 ?pubdate;
    wdt:P50 ?author;
    wdt:P123 ?publisher.
  OPTIONAL { ?subject wdt:P291 ?place. }
  OPTIONAL { ?subject wdt:P953 ?full_text_url. }
  OPTIONAL { ?subject wdt:P724 ?internet_archive_id. }
  OPTIONAL { ?citing wdt:P2860 ?subject. }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}
GROUP BY ?subject ?title ?pubdate ?authorLabel ?publisherLabel ?placeLabel ?full_text_url ?internet_archive_id
  `;
}

// async function main() {
// 	const collectionID = process.argv[2];
// 	const outfile = process.argv[3] || 'wikidata_citations.json';

// 	console.assert(collectionID, 'You must supply a Wikidata collectionID.');

// 	const citations = await getWikidataCitationsForCollection(collectionID);

// 	console.log(citations);

// 	fs.writeFileSync(outfile, JSON.stringify(citations), 'utf-8');
// }

// // if (process.argv[1] === fileURLToPath(import.meta.url)) {
// // 	main();
// // }
