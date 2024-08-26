import { SvelteComponent } from "svelte";
import type { TextContainer } from '../types.js';
declare const __propDef: {
    props: {
        handleHighlightComments: (e: CustomEvent) => void;
        handleEndSelection: (e: CustomEvent) => void;
        handleStartSelection: (e: CustomEvent) => void;
        showHeatmap: boolean;
        selectedCommentaries: string[];
        textContainers: TextContainer[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ReadableTextViewProps = typeof __propDef.props;
export type ReadableTextViewEvents = typeof __propDef.events;
export type ReadableTextViewSlots = typeof __propDef.slots;
export default class ReadableTextView extends SvelteComponent<ReadableTextViewProps, ReadableTextViewEvents, ReadableTextViewSlots> {
}
export {};
