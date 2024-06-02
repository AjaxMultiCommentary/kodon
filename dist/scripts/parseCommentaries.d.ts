import CTS_URN from '../cts_urn.js';
export declare function parseCommentaries(): ({
    body: string | Promise<string>;
    ctsUrn: CTS_URN;
    rawBody: string;
    urn: string;
    commentaryAttributes: unknown;
} | undefined)[];
