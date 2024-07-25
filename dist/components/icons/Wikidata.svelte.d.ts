import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type WikidataProps = typeof __propDef.props;
export type WikidataEvents = typeof __propDef.events;
export type WikidataSlots = typeof __propDef.slots;
export default class Wikidata extends SvelteComponent<WikidataProps, WikidataEvents, WikidataSlots> {
}
export {};
