import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        items?: {
            name: string;
            content: any;
        }[] | undefined;
        activeTabIndex?: number | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type TabsProps = typeof __propDef.props;
export type TabsEvents = typeof __propDef.events;
export type TabsSlots = typeof __propDef.slots;
export default class Tabs extends SvelteComponent<TabsProps, TabsEvents, TabsSlots> {
}
export {};
