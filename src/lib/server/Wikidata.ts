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
SELECT ?subject ?item_typeLabel
(GROUP_CONCAT(distinct ?citing; SEPARATOR = ", ") AS ?citedBy)
(GROUP_CONCAT(distinct ?authorLabel; SEPARATOR = ", ") AS ?authors)
?title (year(?pubdate) as ?pubYear)
(GROUP_CONCAT(distinct ?publisherLabel; SEPARATOR = "/") AS ?publishers)
(GROUP_CONCAT(distinct ?placeLabel; SEPARATOR = ", ") AS ?publicationPlaces)
?published_in_label ?volume ?page_range ?issue
(GROUP_CONCAT(distinct ?full_text_url; SEPARATOR = "|") AS ?full_text_urls)
(IRI(CONCAT("https://www.jstor.org/stable/", ?jstor_id)) as ?jstor_url)
(IRI(CONCAT("https://archive.org/details/", ?internet_archive_id)) as ?internet_archive_url)

WHERE {
  VALUES ?item {
    wd:${collectionID}
  }
  ?subject ?predicate ?item.
  ?property wikibase:directClaim ?predicate.
  ?subject wdt:P1476 ?title;
    wdt:P31 ?item_type.
  OPTIONAL { ?subject wdt:P50 ?author. }
  OPTIONAL { ?subject wdt:P577 ?pubdate. }
  OPTIONAL { ?subject wdt:P123 ?publisher. }
  OPTIONAL { ?subject wdt:P291 ?place. }
  OPTIONAL { ?subject wdt:P1433 ?published_in. }
  OPTIONAL { ?subject wdt:P304 ?page_range. }
  OPTIONAL { ?subject wdt:P478 ?volume. }
  OPTIONAL { ?subject wdt:P433 ?issue. }
  OPTIONAL { ?subject wdt:P953 ?full_text_url. }
  OPTIONAL { ?subject wdt:P724 ?internet_archive_id. }
  OPTIONAL { ?subject wdt:P888 ?jstor_id. }
  OPTIONAL { ?citing wdt:P2860 ?subject. }
  SERVICE wikibase:label { 
    bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". 
    ?publisher rdfs:label ?publisherLabel.
    ?author      rdfs:label ?authorLabel.
    ?place      rdfs:label ?placeLabel.
    ?published_in rdfs:label ?published_in_label.
    ?item_type rdfs:label ?item_typeLabel.
              
  }
}
GROUP BY ?subject ?item_typeLabel ?title ?pubdate ?internet_archive_id ?jstor_id ?published_in_label ?page_range ?volume ?issue
  `;
}

async function main() {
	const collectionID = process.argv[2];
	const outfile = process.argv[3] || 'wikidata_citations.json';

	console.assert(collectionID, 'You must supply a Wikidata collectionID.');

	const citations = await getWikidataCitationsForCollection(collectionID);

	console.log(citations);

	fs.writeFileSync(outfile, JSON.stringify(citations), 'utf-8');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	main();
}
