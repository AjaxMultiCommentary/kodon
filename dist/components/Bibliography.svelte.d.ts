import { SvelteComponent } from "svelte";
import '@citation-js/plugin-csl';
import type { Bibliography, CSL } from '../types.js';
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
export type BibliographyProps = typeof __propDef.props;
export type BibliographyEvents = typeof __propDef.events;
export type BibliographySlots = typeof __propDef.slots;
export default class Bibliography extends SvelteComponent<BibliographyProps, BibliographyEvents, BibliographySlots> {
}
export {};
