import { SvelteComponent } from "svelte";
import type { Comment, TextContainer } from '../types.js';
declare const __propDef: {
    props: {
        comments: Comment[];
        showHeatmap: boolean;
        textContainer: TextContainer;
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
export type CitableTextContainerProps = typeof __propDef.props;
export type CitableTextContainerEvents = typeof __propDef.events;
export type CitableTextContainerSlots = typeof __propDef.slots;
export default class CitableTextContainer extends SvelteComponent<CitableTextContainerProps, CitableTextContainerEvents, CitableTextContainerSlots> {
}
export {};
