import { SvelteComponent } from "svelte";
import type { Comment, TextContainer } from '../types.js';
declare const __propDef: {
    props: {
        comments: Comment[];
        showHeatmap: boolean;
        locationContainer: TextContainer;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type LocationContainerProps = typeof __propDef.props;
export type LocationContainerEvents = typeof __propDef.events;
export type LocationContainerSlots = typeof __propDef.slots;
export default class LocationContainer extends SvelteComponent<LocationContainerProps, LocationContainerEvents, LocationContainerSlots> {
}
export {};
