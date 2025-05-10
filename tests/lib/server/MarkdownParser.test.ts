import { expect, test } from 'vitest';
import { default as MarkdownParser } from '$lib/server/MarkdownParser.js';

test('MarkdownParser correctly parses commentary markdown', () => {
	const parser = new MarkdownParser('tests/support/bibliographies', '/prefix/bibliography');
	const result = parser.toHTML(
		'Test citation to @jebb_sophocles_1896 _ad_ v. 48 and @ferrari_aiace_1974 _ad_ v. 48.'
	);

	expect(result).toContain(
		'<p>Test citation to <a href="/prefix/bibliography#jebb_sophocles_1896">(Jebb 1896)</a> <em>ad</em> v. 48 and <a href="/prefix/bibliography#ferrari_aiace_1974">(Ferrari 1974)</a> <em>ad</em> v. 48.</p>'
	);
});
