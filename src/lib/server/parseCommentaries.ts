import fs from 'node:fs';

import frontMatter from 'front-matter';

import CTS_URN from '$lib/cts_urn.js';

import type { Comment } from '$lib/types.js';

const GLOSSA_PROPERTY_REGEX = /^:(?<name>[^:\n]+):\s+(?<value>.*)(?:\n|$)/;
const URN_REGEX = /@(?<urn>[^\n]+)(?:\n|$)/u;

/**
 *
 * @param {string} commentariesDirectory - the directory containing commentary files as markdown
 * @returns {Array<Comment>} - a flat array of the parsed comments from all commentary files found in `COMMENTARIES_DIR`
 */
export function parseCommentaries(commentariesDirectory = 'commentaries'): Comment[] {
	const files = fs.readdirSync(commentariesDirectory);

	return files.flatMap((file: string) => {
		const s = fs.readFileSync(`${commentariesDirectory}/${file}`, 'utf-8');
		// @ts-expect-error The frontMatter module isn't well-typed'
		const { attributes, body } = frontMatter(s);
		const glossae = body
			.split('\n---\n')
			.map((g: string) => g.trim())
			.filter((g: string) => g !== '');

		return glossae.map((glossa: string) => parseGlossa(attributes, glossa));
	});
}

export function parseGlossa(attributes: object, glossa: string) {
	const match = glossa.match(URN_REGEX);

	if (match?.groups?.urn) {
		const urn = match.groups.urn;
		let withProperties = glossa.replace(URN_REGEX, '').trim();
		const glossaProperties = {};

		let propMatch = withProperties.match(GLOSSA_PROPERTY_REGEX);

		while (propMatch?.groups?.name) {
			// @ts-expect-error glossaProperties are deliberately open-ended
			glossaProperties[propMatch.groups.name] = propMatch.groups.value;

			withProperties = withProperties.replace(GLOSSA_PROPERTY_REGEX, '').trim();
			propMatch = withProperties.match(GLOSSA_PROPERTY_REGEX);
		}

		return {
			commentaryAttributes: attributes,
			...glossaProperties,
			body: withProperties,
			ctsUrn: new CTS_URN(urn),
			rawBody: withProperties,
			urn
		};
	}
}
