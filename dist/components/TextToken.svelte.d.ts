import { SvelteComponent } from "svelte";
import type { Word } from '../types.js';
declare const __propDef: {
    props: {
        showHeatmap: boolean;
        token: Word;
    };
    events: {
        highlightComments: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type TextTokenProps = typeof __propDef.props;
export type TextTokenEvents = typeof __propDef.events;
export type TextTokenSlots = typeof __propDef.slots;
export default class TextToken extends SvelteComponent<TextTokenProps, TextTokenEvents, TextTokenSlots> {
}
export {};
