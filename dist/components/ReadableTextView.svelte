<script>import _ from "lodash";
import LocationContainer from "./LocationContainer.svelte";
import { nestBlocks } from "../functions.js";
export let showHeatmap;
export let selectedCommentaries;
export let textContainers;
$:
  textContainerGroups = textContainers.reduce((groups, curr) => {
    const lastGroup = groups.at(-1) || {};
    const lastContainer = lastGroup.containers?.at(-1) || {};
    if (_.isEqual(lastContainer.location, curr.location)) {
      groups.at(-1).containers = lastGroup.containers.concat(curr);
      groups.at(-1).comments = lastGroup.comments.concat(curr.comments);
      return groups;
    }
    const newGroup = { containers: [curr], comments: curr.comments || [] };
    return [...groups, newGroup];
  }, []).map((group) => ({
    comments: selectedCommentaries.length > 0 ? (group.comments || []).filter(
      (c) => selectedCommentaries.includes(c.commentaryAttributes?.pid || "")
    ) : group.comments || [],
    container: nestBlocks(
      group.containers.map((block) => ({
        ...block,
        // we already know they have the same location,
        // so we can just check the offsets here
        parentIndex: group.containers.findLast(
          (b) => b.index !== block.index && block.start_offset >= b.start_offset && block.end_offset <= b.end_offset
        )?.index
      }))
    )
  }));
</script>

{#each textContainerGroups as group}
	<LocationContainer locationContainer={group.container} comments={group.comments} {showHeatmap} />
{/each}
