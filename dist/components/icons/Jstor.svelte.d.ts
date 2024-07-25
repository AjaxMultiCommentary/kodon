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
export type JstorProps = typeof __propDef.props;
export type JstorEvents = typeof __propDef.events;
export type JstorSlots = typeof __propDef.slots;
export default class Jstor extends SvelteComponent<JstorProps, JstorEvents, JstorSlots> {
}
export {};
