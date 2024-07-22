export type WikidataJSONResponse = {
    results: {
        bindings: Array<object>;
    };
};
export declare function getWikidataCitationsForCollection(collectionID: string): Promise<object[]>;
export declare function getWikidataCollection(collectionID: string): Promise<object[]>;
