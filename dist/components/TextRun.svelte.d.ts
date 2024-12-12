import { SvelteComponent } from "svelte";
import type { Word } from '../types.js';
declare const __propDef: {
    props: {
        /**
             * Should the heatmap for comment density be displayed?
             */ showHeatmap?: boolean | undefined;
        /**
             * A run is an array of Words with the same textElements.
             */ run: Word[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type TextRunProps = typeof __propDef.props;
export type TextRunEvents = typeof __propDef.events;
export type TextRunSlots = typeof __propDef.slots;
export default class TextRun extends SvelteComponent<TextRunProps, TextRunEvents, TextRunSlots> {
}
export {};
