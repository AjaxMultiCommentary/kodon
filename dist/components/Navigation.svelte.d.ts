import { SvelteComponent } from "svelte";
import type { PassageConfig } from '../types.js';
declare const __propDef: {
    props: {
        passages: PassageConfig[];
        currentPassageUrn: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type NavigationProps = typeof __propDef.props;
export type NavigationEvents = typeof __propDef.events;
export type NavigationSlots = typeof __propDef.slots;
export default class Navigation extends SvelteComponent<NavigationProps, NavigationEvents, NavigationSlots> {
}
export {};
