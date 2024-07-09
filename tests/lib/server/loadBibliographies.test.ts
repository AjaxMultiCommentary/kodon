import { expect, expectTypeOf, test } from 'vitest';
import { default as loadBibliographies } from '$lib/server/loadBibliographies.js';

import type { Bibliography } from '$lib/types.js';

test('loads bibliographies in the supplied folder', () => {
	const bibliographiesAndCsls = loadBibliographies('tests/support/bibliographies');

	expect(bibliographiesAndCsls.bibliographies.length).toBeGreaterThan(0);
	expect(bibliographiesAndCsls.csls.length).toBeGreaterThan(0);

	expectTypeOf(bibliographiesAndCsls.bibliographies).toMatchTypeOf<Array<Bibliography>>;
});
