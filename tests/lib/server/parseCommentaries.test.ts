import { expect, expectTypeOf, test } from 'vitest';
import { parseCommentaries, _markedCitationRenderer } from '$lib/server/parseCommentaries.js';

import type { Comment } from '$lib/types.js';

test('processes commentaries in supplied folder', () => {
	const parsedCommentaries = parseCommentaries('tests/support/commentaries', 'tests/support/bibliographies');

	expect(parsedCommentaries.length).toBeGreaterThan(0);
	expectTypeOf(parsedCommentaries).toMatchTypeOf<Array<Comment>>();
});

test('_markedCitationRenderer() correctly renders an in-text citation', () => {
	const renderer = _markedCitationRenderer('tests/support/bibliographies');
	const result = renderer.text('@jebb_sophocles_1896');

	expect(result).toEqual(`[(Jebb 1896)](/bibliography#jebb_sophocles_1896)`)
});
