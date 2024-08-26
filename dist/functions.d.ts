import type { Comment, Word } from './types.js';
export declare function dropTokensUntilStartOfComment(tokens: Word[], comment: Comment): Word[];
export declare function takeTokensUntilEndOfComment(tokens: Word[], comment: Comment): Word[];
export declare function isCommentContainedByTextContainer(comment: Comment): boolean;
export declare function tokenTestForCommentContainedByTextContainer(comment: Comment, token: Word, tokens: Word[]): Word | undefined;
export declare function tokenTestForCommentEndingInTextContainer(comment: Comment, token: Word, tokens: Word[]): Word | undefined;
export declare function tokenTestForCommentStartingInTextContainer(comment: Comment, token: Word, tokens: Word[]): Word | undefined;
