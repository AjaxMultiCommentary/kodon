import { SvelteComponent } from "svelte";
import type { TextContainer } from '../types.js';
declare const __propDef: {
    props: {
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
export type TabularTextViewProps = typeof __propDef.props;
export type TabularTextViewEvents = typeof __propDef.events;
export type TabularTextViewSlots = typeof __propDef.slots;
export default class TabularTextView extends SvelteComponent<TabularTextViewProps, TabularTextViewEvents, TabularTextViewSlots> {
}
export {};
