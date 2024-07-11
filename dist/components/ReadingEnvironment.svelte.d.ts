import { SvelteComponent } from "svelte";
import type { Comment, PassageConfig, TextContainer } from '../types.js';
declare const __propDef: {
    props: {
        currentURL: string;
        comments: Comment[];
        currentPassage: PassageConfig;
        iiifURL: string;
        passages: PassageConfig[];
        textContainers: TextContainer[];
        heatmapTooltip: string | undefined;
        filterListTooltip: string | undefined;
        navigationTooltip: string | undefined;
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
