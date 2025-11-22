import fs from 'node:fs';

import type { Comment } from '$lib/types.js';

export default function readCommentariesFromFS(
	commentariesDirectory = 'commentaries',
	callback: (fileContents: string) => Comment[]
): Comment[] {
	const filenames = fs
		.readdirSync(commentariesDirectory)
		.map((filename) => `${commentariesDirectory}/${filename}`);

	return filenames.flatMap((filename: string) => {
		const s = fs.readFileSync(filename, 'utf-8');

		return callback(s);
	});
}
