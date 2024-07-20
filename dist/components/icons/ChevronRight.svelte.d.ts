import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        className?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ChevronRightProps = typeof __propDef.props;
export type ChevronRightEvents = typeof __propDef.events;
export type ChevronRightSlots = typeof __propDef.slots;
export default class ChevronRight extends SvelteComponent<ChevronRightProps, ChevronRightEvents, ChevronRightSlots> {
}
export {};
