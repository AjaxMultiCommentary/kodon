declare class CTS_Token {
    token: string | undefined;
    index: number | undefined;
    constructor(s: string);
}
export default class CTS_URN {
    __urn: string;
    collection: string;
    workComponent?: string;
    passageComponent?: string;
    textGroup?: string;
    work?: string;
    version?: string;
    exemplar?: string;
    citations: string[];
    integerCitations: number[][];
    tokens: (CTS_Token | undefined)[];
    constructor(urn: string);
    setPassages(passageComponent: string): void;
    contains(ctsUrn: CTS_URN): boolean;
    isEqual(ctsUrn: CTS_URN): boolean;
    hasEqualEnd(ctsUrn: CTS_URN): boolean;
    hasEqualStart(ctsUrn: CTS_URN): boolean;
    toJSON(): {
        collection: string;
        workComponent: string | undefined;
        textGroup: string | undefined;
        work: string | undefined;
        version: string | undefined;
        exemplar: string | undefined;
        passageComponent: string | undefined;
        citations: string[];
        integerCitations: number[][];
        tokens: (string | undefined)[];
        tokenIndexes: (number | undefined)[];
        __urn: string;
    };
    toString(): string;
}
export {};
