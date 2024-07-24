import { SvelteComponent } from "svelte";
import type { WikidataRow } from '../types.js';
declare const __propDef: {
    props: {
        citations: WikidataRow[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type WikidataBibliographyProps = typeof __propDef.props;
export type WikidataBibliographyEvents = typeof __propDef.events;
export type WikidataBibliographySlots = typeof __propDef.slots;
export default class WikidataBibliography extends SvelteComponent<WikidataBibliographyProps, WikidataBibliographyEvents, WikidataBibliographySlots> {
}
export {};
