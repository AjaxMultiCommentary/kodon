const STEPHANUS_BEKKER_REGEX = /((?<book>\d+)\.)?(?<page>\d+)(?<column>[ABCDE])/i;
const TOKEN_REGEX = /(?<token>\p{Letter}+)(\[(?<index>\d+)\])?/iu;
export default class CTS_URN {
    __urn;
    collection;
    workComponent;
    passageComponent;
    textGroup;
    work;
    version;
    exemplar;
    citations = [];
    integerCitations = [];
    tokens = [];
    tokenIndexes = [];
    constructor(urn) {
        const [_urn_s, _cts, collection, workComponent, passageComponent] = urn.split(':');
        const [textGroup, work, version, exemplar] = workComponent.split('.');
        this.__urn = urn;
        this.collection = collection;
        this.workComponent = workComponent;
        this.textGroup = textGroup;
        this.work = work;
        this.version = version;
        this.exemplar = exemplar;
        this.passageComponent = passageComponent;
        if (passageComponent) {
            this.setPassages(passageComponent);
        }
    }
    setPassages(passageComponent) {
        this.citations = passageComponent.split('-').map((p) => p.split('@')[0]);
        this.integerCitations = this.citations.map(citationToInteger);
        const tokensWithIndexes = passageComponent.split('-').map((p) => {
            const maybeToken = p.split('@')[1];
            if (maybeToken) {
                const parsed = TOKEN_REGEX.exec(maybeToken);
                if (parsed?.groups?.token) {
                    return {
                        index: parseInt(parsed?.groups?.index || '1'),
                        token: parsed?.groups?.token
                    };
                }
            }
        });
        this.tokens = tokensWithIndexes.map((x) => x && x.token);
        this.tokenIndexes = tokensWithIndexes.map((x) => x && x.index);
    }
    contains(ctsUrn) {
        return (this.integerCitations[0].every((value, index) => value <= ctsUrn.integerCitations[0][index]) &&
            this.integerCitations[this.integerCitations.length - 1].every((value, index) => value >= ctsUrn.integerCitations[ctsUrn.integerCitations.length - 1][index]));
    }
    isEqual(ctsUrn) {
        return (this.integerCitations[0].every((value, index) => value === ctsUrn.integerCitations[0][index]) &&
            this.integerCitations[1].every((value, index) => value === ctsUrn.integerCitations[1][index]));
    }
    hasEqualEnd(ctsUrn) {
        return this.integerCitations[this.integerCitations.length - 1].every((value, index) => value === ctsUrn.integerCitations[ctsUrn.integerCitations.length - 1][index]);
    }
    hasEqualStart(ctsUrn) {
        return this.integerCitations[0].every((value, index) => ctsUrn.integerCitations[0][index] === value);
    }
    toJSON() {
        return {
            collection: this.collection,
            workComponent: this.workComponent,
            textGroup: this.textGroup,
            work: this.work,
            version: this.version,
            exemplar: this.exemplar,
            passageComponent: this.passageComponent,
            citations: this.citations,
            integerCitations: this.integerCitations,
            tokens: this.tokens,
            tokenIndexes: this.tokenIndexes,
            __urn: this.__urn
        };
    }
    toString() {
        return this.__urn;
    }
}
function citationToInteger(citation) {
    const platoOrAristotle = STEPHANUS_BEKKER_REGEX.exec(citation);
    if (platoOrAristotle && platoOrAristotle.groups) {
        const book = platoOrAristotle.groups.book;
        const page = platoOrAristotle.groups.page;
        const column = platoOrAristotle.groups.column;
        if (book) {
            return [parseInt(book), parseInt(page), columnToInt(column)];
        }
        return [parseInt(page), columnToInt(column)];
    }
    return citation.split('.').map(parseInt);
}
function columnToInt(column) {
    switch (column) {
        case 'A':
            return 1;
        case 'B':
            return 2;
        case 'C':
            return 3;
        case 'D':
            return 4;
        case 'E':
            return 5;
        default:
            return 0;
    }
}
