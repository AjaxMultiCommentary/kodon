import fs from 'fs';
import process from 'process';
import { fileURLToPath } from 'url';
const USER_AGENT = 'Kodon/0.2 (https://github.com/ajaxMultiCommentary/kodon) kodon-mini-comp-lib/0.2';
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
    id;
    author;
    place;
    pubdate;
    publisher;
    title;
    constructor(item) {
        const uri = item.item.value;
        const itemID = uri.split('/').at(-1);
        console.assert(typeof itemID === 'string', '`itemID` must be a string.');
        this.id = itemID;
        this.author = item.authorLabel.value;
        this.place = item.placeLabel?.value;
        this.pubdate = item.pubdate.value;
        this.publisher = item.publisherLabel.value;
        this.title = item.title.value;
    }
}
function wait(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}
export async function getWikidataCitationsForCollection(collectionID) {
    const items = await getWikidataCollection(collectionID);
    const withCitations = await Promise.all(items.map(async (i) => {
        const item = new WikidataEntity(i);
        console.log(`Getting information for ${item.title} ${item.id}`);
        await wait(1000);
        const citedBy = await getWikidataCitedBy(item.id);
        return {
            id: item.id,
            author: item.author,
            place: item.place,
            pubdate: item.pubdate,
            publisher: item.publisher,
            title: item.title,
            citedBy
        };
    }));
    return withCitations;
}
export async function getWikidataCitedBy(itemID) {
    const query = _wikidataCitedByQuery(itemID);
    const req = await _request(query);
    return req.results.bindings;
}
export async function getWikidataCiting(itemID) {
    const query = _wikidataCitingQuery(itemID);
    const req = await _request(query);
    return req.results.bindings;
}
export async function getWikidataCollection(collectionID) {
    const query = _wikidataCollectionQuery(collectionID);
    const req = await _request(query);
    return req.results.bindings;
}
export async function loadWikidataCitations(citationsJSON = 'wikidata_citations.json') {
    const data = await import(citationsJSON);
    return data.map((citation) => {
        const citedBy = citation.citedBy.map((citedBy) => {
            return {
                id: citedBy.cited.value.split('/').at(-1),
                author: citedBy.authorLabel.value,
                place: citedBy.placeLabel?.value,
                pubdate: citedBy.pubdate.value,
                publisher: citedBy.publisherLabel?.value,
                title: citedBy.title.value
            };
        });
        return {
            ...citation,
            citedBy
        };
    });
}
async function _request(query) {
    try {
        const res = await fetch(`https://query.wikidata.org/sparql?query=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: new Headers({
                Accept: 'application/sparql-results+json',
                'User-Agent': USER_AGENT
            })
        });
        if (res.status === 429) {
            console.error(await res.text());
            throw new Error('Wikidata rate limit exceeded.');
        }
        return (await res.json());
    }
    catch (e) {
        console.error('An error occurred while querying Wikidata:', e);
        throw e;
    }
}
function _wikidataCitedByQuery(itemID) {
    return `
SELECT ?cited ?authorLabel ?title ?pubdate ?publisherLabel ?placeLabel WHERE {
  wd:${itemID} wdt:P2860 ?cited.
  ?cited wdt:P1476 ?title;
    wdt:P577 ?pubdate;
    wdt:P50 ?author;
    wdt:P123 ?publisher.
	OPTIONAL { ?cited wdt:P291 ?place. }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}`;
}
function _wikidataCitingQuery(itemID) {
    return `
  SELECT
     ?citing ?authorLabel ?title ?pubdate ?publisherLabel ?placeLabel
  where {
    ?citing wdt:P2860 wd:${itemID}.
    ?citing wdt:P1476 ?title;
        	wdt:P577 ?pubdate;
        	wdt:P50 ?author;
		    wdt:P123 ?publisher.
    		OPTIONAL { ?citing wdt:P291 ?place. }

    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  }
  `;
}
function _wikidataCollectionQuery(collectionID) {
    return `
  SELECT ?item ?language ?authorLabel ?title ?pubdate ?publisherLabel ?placeLabel WHERE {
    ?item wdt:P195 wd:${collectionID};
      	wdt:P577 ?pubdate;
      	wdt:P1476 ?title;
    	wdt:P50 ?author;
		wdt:P123 ?publisher.
    	OPTIONAL { ?item wdt:P291 ?place. }
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  }
  `;
}
// const body = await getWikidataCitationsForCollection('Q123783872');
// // const body = await getWikidataCitedBy('Q122238857');
// console.log(body);
async function main() {
    const collectionID = process.argv[2];
    const outfile = process.argv[3] || 'wikidata_citations.json';
    console.assert(collectionID, 'You must supply a Wikidata collectionID.');
    const citations = await getWikidataCitationsForCollection(collectionID);
    console.log(citations);
    fs.writeFileSync(outfile, JSON.stringify(citations), 'utf-8');
}
// if (process.argv[1] === fileURLToPath(import.meta.url)) {
// 	main();
// }
