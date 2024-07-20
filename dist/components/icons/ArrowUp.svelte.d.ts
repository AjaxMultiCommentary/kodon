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
export type ArrowUpProps = typeof __propDef.props;
export type ArrowUpEvents = typeof __propDef.events;
export type ArrowUpSlots = typeof __propDef.slots;
export default class ArrowUp extends SvelteComponent<ArrowUpProps, ArrowUpEvents, ArrowUpSlots> {
}
export {};
