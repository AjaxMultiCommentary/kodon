import fs from 'node:fs';

import type { Comment } from '$lib/types.js';

/**
 *
 * @param {string} commentariesDirectory - the directory containing commentary files as markdown
 * @returns {Array<Comment>} - a flat array of the parsed comments from all commentary files found in `COMMENTARIES_DIR`
 */
export default function readCommentariesFromFS(commentariesDirectory = 'commentaries', callback: (fileContents: string) => Comment[]): Comment[] {
	const filenames = fs.readdirSync(commentariesDirectory).map(filename => `${commentariesDirectory}/${filename}`);

	return filenames.flatMap((filename: string) => {
		const s = fs.readFileSync(filename, 'utf-8');

		return callback(s);
	});
}