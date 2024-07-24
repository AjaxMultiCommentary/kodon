import { SvelteComponent } from "svelte";
import type { WikidataRow } from '../types.js';
declare const __propDef: {
    props: {
        citation: WikidataRow;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type WikidataBibliographyRowProps = typeof __propDef.props;
export type WikidataBibliographyRowEvents = typeof __propDef.events;
export type WikidataBibliographyRowSlots = typeof __propDef.slots;
export default class WikidataBibliographyRow extends SvelteComponent<WikidataBibliographyRowProps, WikidataBibliographyRowEvents, WikidataBibliographyRowSlots> {
}
export {};
