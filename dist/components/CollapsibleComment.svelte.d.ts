import { SvelteComponent } from "svelte";
import type { Comment } from '../types.js';
declare const __propDef: {
    props: {
        iiifURL: string;
        comment: Comment;
        stringifyCommentCitation: (comment: Comment) => string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type CollapsibleCommentProps = typeof __propDef.props;
export type CollapsibleCommentEvents = typeof __propDef.events;
export type CollapsibleCommentSlots = typeof __propDef.slots;
export default class CollapsibleComment extends SvelteComponent<CollapsibleCommentProps, CollapsibleCommentEvents, CollapsibleCommentSlots> {
}
export {};
