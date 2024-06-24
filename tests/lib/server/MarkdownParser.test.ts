import { expect, test } from 'vitest';
import { default as MarkdownParser, _markedCitationRenderer } from '$lib/server/MarkdownParser.js';

test('_markedCitationRenderer() correctly renders an in-text citation', () => {
    const renderer = _markedCitationRenderer('tests/support/bibliographies', '/bibliography');
    const result = renderer.text('@jebb_sophocles_1896');

    expect(result).toEqual(`[(Jebb 1896)](/bibliography#jebb_sophocles_1896)`);
});

test('MarkdownParser correctly parses commentary markdown', () => {
    const parser = new MarkdownParser('tests/support/bibliographies', '/prefix/bibliography');
    const result = parser.toHTML('Test citation to @jebb_sophocles_1896 _ad_ v. 48 and @ferrari_aiace_1974 _ad_ v. 48.');

    expect(result).toContain(
        '<p>Test citation to [(Jebb 1896)](/prefix/bibliography#jebb_sophocles_1896) <em>ad</em> v. 48 and [(Ferrari 1974)](/prefix/bibliography#ferrari_aiace_1974) <em>ad</em> v. 48.</p>'
    );
});
