import { SvelteComponent } from "svelte";
import type { Comment, TextContainer } from '../types.js';
declare const __propDef: {
    props: {
        comments: Comment[];
        textContainer: TextContainer;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type TabularTextContainerProps = typeof __propDef.props;
export type TabularTextContainerEvents = typeof __propDef.events;
export type TabularTextContainerSlots = typeof __propDef.slots;
export default class TabularTextContainer extends SvelteComponent<TabularTextContainerProps, TabularTextContainerEvents, TabularTextContainerSlots> {
}
export {};
