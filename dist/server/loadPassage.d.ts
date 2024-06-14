import type { Comment, CommentaryConfig, DeserializedPassageConfig, PassageConfig, PassageInfo, TextContainer, TextElement } from '../types.js';
export default function loadPassage(config: CommentaryConfig, urn: string): PassageInfo;
export declare function getCommentsForPassage(allComments: Comment[], passageInfo: PassageConfig): Comment[];
export declare function getTextContainersForPassage(passageInfo: DeserializedPassageConfig, jsonl: (TextContainer | TextElement)[]): TextContainer[];
export declare function getPassage(passages: DeserializedPassageConfig[], passageStart: number[]): DeserializedPassageConfig | undefined;
