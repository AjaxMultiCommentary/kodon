import type { Comment } from '../types.js';
/**
 *
 * @param {string} COMMENTARIES_DIR - the directory containing commentary files as markdown
 * @returns {Array<Comment>} - a flat array of the parsed comments from all commentary files found in `COMMENTARIES_DIR`
 */
export declare function parseCommentaries(COMMENTARIES_DIR?: string): Comment[];
