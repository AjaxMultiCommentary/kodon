import { SvelteComponent } from "svelte";
import type { StaticPageInfo } from '../types.js';
declare const __propDef: {
    props: {
        title: string;
        staticPages: StaticPageInfo[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type HeaderProps = typeof __propDef.props;
export type HeaderEvents = typeof __propDef.events;
export type HeaderSlots = typeof __propDef.slots;
export default class Header extends SvelteComponent<HeaderProps, HeaderEvents, HeaderSlots> {
}
export {};
