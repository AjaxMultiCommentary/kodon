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
export type ChevronDownProps = typeof __propDef.props;
export type ChevronDownEvents = typeof __propDef.events;
export type ChevronDownSlots = typeof __propDef.slots;
export default class ChevronDown extends SvelteComponent<ChevronDownProps, ChevronDownEvents, ChevronDownSlots> {
}
export {};
