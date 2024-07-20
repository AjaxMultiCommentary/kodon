import { SvelteComponent } from "svelte";
import type { WikidataEntry } from '../types.js';
declare const __propDef: {
    props: {
        citation: WikidataEntry;
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
