import { expect, expectTypeOf, test } from 'vitest';
import { parseCommentaries, _markedCitationRenderer } from '$lib/server/parseCommentaries.js';

import type { Comment } from '$lib/types.js';

test('processes commentaries in supplied folder', () => {
	const parsedCommentaries = parseCommentaries('tests/support/commentaries');

	expect(parsedCommentaries.length).toBeGreaterThan(0);
	expectTypeOf(parsedCommentaries).toMatchTypeOf<Array<Comment>>();
});

test('_markedCitationRenderer() correctly renders an in-text citation', () => {
	const renderer = _markedCitationRenderer();
	const result = renderer.text('@TestCitation');

	expect(result).toEqual(`<a href="/bibliography#TestCitation">TestCitation</a>`)
});
