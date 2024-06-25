import CTS_URN from '../cts_urn.js';
import type { Comment } from '../types.js';
/**
 *
 * @param {string} commentariesDirectory - the directory containing commentary files as markdown
 * @param {string} bibliographiesDirectory = the directory containing the bibliographies and optional CSL files
 * @returns {Array<Comment>} - a flat array of the parsed comments from all commentary files found in `COMMENTARIES_DIR`
 */
export declare function parseCommentaries(commentariesDirectory?: string, bibliographiesDirectory?: string): Comment[];
export declare function parseGlossa(attributes: object, glossa: string): {
    body: string;
    ctsUrn: CTS_URN;
    rawBody: string;
    urn: string;
    commentaryAttributes: object;
} | undefined;
