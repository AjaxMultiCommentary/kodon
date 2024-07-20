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
export type ArrowDownProps = typeof __propDef.props;
export type ArrowDownEvents = typeof __propDef.events;
export type ArrowDownSlots = typeof __propDef.slots;
export default class ArrowDown extends SvelteComponent<ArrowDownProps, ArrowDownEvents, ArrowDownSlots> {
}
export {};
