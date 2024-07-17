import fs from 'fs';

export default function loadWikidataCitations(citationsJSON = 'wikidata_citations.json') {
	const raw = fs.readFileSync(citationsJSON, 'utf-8');
	const json = JSON.parse(raw);
	const citations = json.map((citation: any) => {
		const citedBy = citation.citedBy.map((cited: any) => {
			return {
				id: cited.cited.value.split('/').at(-1),
				author: cited.cited_authorLabel.value,
				pubdate: cited.cited_pubdate.value,
				title: cited.cited_title.value
			};
		});
		const citing = citation.citing.map((citing: any) => {
			return {
				id: citing.citing.value.split('/').at(-1),
				author: citing.citing_authorLabel.value,
				pubdate: citing.citing_pubdate.value,
				title: citing.citing_title.value
			};
		});

		return {
			...citation,
			citedBy,
			citing
		};
	});

	return citations;
}
