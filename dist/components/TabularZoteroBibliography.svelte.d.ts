import { SvelteComponent } from "svelte";
import type { Bibliography, CSL } from '../types.js';
import '@citation-js/plugin-csl';
declare const __propDef: {
    props: {
        bibliographies: Bibliography[];
        csls?: CSL[] | undefined;
        lang?: "en-US" | "es-ES" | "de-DE" | "fr-FR" | "nl-NL" | undefined;
        template?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type TabularZoteroBibliographyProps = typeof __propDef.props;
export type TabularZoteroBibliographyEvents = typeof __propDef.events;
export type TabularZoteroBibliographySlots = typeof __propDef.slots;
export default class TabularZoteroBibliography extends SvelteComponent<TabularZoteroBibliographyProps, TabularZoteroBibliographyEvents, TabularZoteroBibliographySlots> {
}
export {};
