import { SvelteComponent } from "svelte";
import type { Comment, TextContainer } from '../types.js';
declare const __propDef: {
    props: {
        comments: Comment[];
        showHeatmap: boolean;
        textContainer: TextContainer;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ReadableTextContainerProps = typeof __propDef.props;
export type ReadableTextContainerEvents = typeof __propDef.events;
export type ReadableTextContainerSlots = typeof __propDef.slots;
export default class ReadableTextContainer extends SvelteComponent<ReadableTextContainerProps, ReadableTextContainerEvents, ReadableTextContainerSlots> {
}
export {};
