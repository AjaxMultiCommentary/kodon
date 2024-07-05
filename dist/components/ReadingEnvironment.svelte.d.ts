import { SvelteComponent } from "svelte";
import type { Comment, PassageConfig, TextContainer } from '../types.js';
declare const __propDef: {
    props: {
        comments: Comment[];
        currentPassage: PassageConfig;
        iiifURL: string;
        metadata: any;
        passages: PassageConfig[];
        textContainers: TextContainer[];
        heatmapTooltip: string;
        filterListTooltip: string;
        navigationTooltip: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ReadingEnvironmentProps = typeof __propDef.props;
export type ReadingEnvironmentEvents = typeof __propDef.events;
export type ReadingEnvironmentSlots = typeof __propDef.slots;
export default class ReadingEnvironment extends SvelteComponent<ReadingEnvironmentProps, ReadingEnvironmentEvents, ReadingEnvironmentSlots> {
}
export {};
