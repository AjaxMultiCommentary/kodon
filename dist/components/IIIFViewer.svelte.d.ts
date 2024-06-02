import { SvelteComponent } from "svelte";
import type { Comment } from '../types.js';
declare const __propDef: {
    props: {
        url: string;
        comment: Comment;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type IiifViewerProps = typeof __propDef.props;
export type IiifViewerEvents = typeof __propDef.events;
export type IiifViewerSlots = typeof __propDef.slots;
export default class IiifViewer extends SvelteComponent<IiifViewerProps, IiifViewerEvents, IiifViewerSlots> {
}
export {};
