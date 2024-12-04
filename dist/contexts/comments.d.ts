type CommentsContext = {
    highlightComments: (commentsToHighlight: (string | undefined)[]) => void;
};
export declare function getCommentsContext(): CommentsContext;
export declare function setCommentsContext(obj: CommentsContext): void;
export {};
