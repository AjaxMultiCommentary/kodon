import { SvelteComponent } from "svelte";
import type { Word } from '../types.js';
declare const __propDef: {
    props: {
        run: Word[];
        showHeatmap?: boolean | undefined;
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
