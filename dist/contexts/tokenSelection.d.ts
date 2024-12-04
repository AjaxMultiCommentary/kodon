type TokenSelectionContext = {
    handleEndSelection: (selectionURN: string) => void;
    handleStartSelection: (selectionURN: string) => void;
};
export declare function getTokenSelectionContext(): TokenSelectionContext;
export declare function setTokenSelectionContext(obj: TokenSelectionContext): void;
export {};
