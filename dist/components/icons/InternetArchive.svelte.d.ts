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
export type InternetArchiveProps = typeof __propDef.props;
export type InternetArchiveEvents = typeof __propDef.events;
export type InternetArchiveSlots = typeof __propDef.slots;
export default class InternetArchive extends SvelteComponent<InternetArchiveProps, InternetArchiveEvents, InternetArchiveSlots> {
}
export {};
