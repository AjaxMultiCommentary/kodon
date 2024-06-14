import { expect, expectTypeOf, test } from 'vitest';
import { parseCommentaries } from '$lib/server/parseCommentaries.js';

import type { Comment } from '$lib/types.js';

test('processes commentaries in supplied folder', () => {
	const parsedCommentaries = parseCommentaries('tests/support/commentaries');

	expect(parsedCommentaries.length).toBeGreaterThan(0);
	expectTypeOf(parsedCommentaries).toMatchTypeOf<Array<Comment>>();
});
