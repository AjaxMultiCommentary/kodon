import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        inputName?: string | undefined;
        options?: {
            extra?: string | number | undefined;
            label: string;
            pid: string;
        }[] | undefined;
    };
    events: {
        change: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type FilterListProps = typeof __propDef.props;
export type FilterListEvents = typeof __propDef.events;
export type FilterListSlots = typeof __propDef.slots;
export default class FilterList extends SvelteComponent<FilterListProps, FilterListEvents, FilterListSlots> {
}
export {};
