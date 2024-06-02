import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        name: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type SpeakerProps = typeof __propDef.props;
export type SpeakerEvents = typeof __propDef.events;
export type SpeakerSlots = typeof __propDef.slots;
export default class Speaker extends SvelteComponent<SpeakerProps, SpeakerEvents, SpeakerSlots> {
}
export {};
