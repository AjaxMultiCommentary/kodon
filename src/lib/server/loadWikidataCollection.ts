const USER_AGENT =
	'Kodon/0.1 (https://github.com/ajaxMultiCommentary/kodon) kodon-mini-comp-lib/0.1';
export default async function loadWikidataCollection(collectionID: string) {
	const query = makeQuery(collectionID);
	const res = await fetch(`https://query.wikidata.org/sparql?query=${encodeURIComponent(query)}`, {
		method: 'GET',
		headers: new Headers({
			Accept: 'application/sparql-results+json',
			'User-Agent': USER_AGENT
		})
	});

	return await res.json();
}

function makeQuery(collectionID: string) {
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

// const body = await loadWikidataCollection('Q123783872');
// console.log(body.results.bindings);
