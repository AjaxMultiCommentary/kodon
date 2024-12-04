<script>import _ from "lodash";
import { onMount, setContext, tick } from "svelte";
import CollapsibleComment from "./CollapsibleComment.svelte";
import FilterList from "./FilterList.svelte";
import Navigation from "./Navigation.svelte";
import Tooltip from "./Tooltip.svelte";
import { setCommentsContext } from "../contexts/comments.js";
import { setTokenSelectionContext } from "../contexts/tokenSelection.js";
import CTS_URN from "../cts_urn.js";
import ReadableTextView from "./ReadableTextView.svelte";
import TabularTextView from "./TabularTextView.svelte";
export let currentURL;
export let comments;
export let citationPrefix = "v.";
export let citationPrefixPlural = "vv.";
export let showCommentaryFilters = true;
export let stringifyCommentCitation = (comment) => {
  const { integerCitations } = comment.ctsUrn;
  if (integerCitations.length === 2) {
    if (integerCitations[0].join("") !== integerCitations[1].join("")) {
      return `${citationPrefixPlural} ${integerCitations[0].join("")}-${integerCitations[1].join("")}`;
    }
  }
  return `${citationPrefix} ${integerCitations[0].join("")}`;
};
export let currentPassage;
export let iiifURL;
export let passages;
export let textContainers;
export let heatmapTooltip;
export let filterListTooltip;
export let navigationTooltip;
export let tableViewTooltip;
let selectedURN = null;
let selectionAnchorURN = null;
let selectionFocusURN = null;
$:
  commentCountsByCommentary = _.countBy(comments, (c) => c.commentaryAttributes?.pid);
$:
  commentaryOptions = _.sortBy(
    Object.keys(commentCountsByCommentary).map((c) => {
      const attributes = comments.find((comment) => comment.commentaryAttributes?.pid === c)?.commentaryAttributes || {};
      const label = `${attributes.creators?.map((cc) => cc.last_name).join(", ")} ${attributes.publication_date}`;
      return { extra: commentCountsByCommentary[c], label, pid: c };
    }),
    (o) => o.label
  );
$:
  filteredComments = comments.filter(
    (c) => selectedCommentaries.length > 0 ? selectedCommentaries.includes(c.commentaryAttributes?.pid || "") : true
  );
$:
  selectedCommentaries = [];
$:
  showHeatmap = true;
$:
  showTableView = false;
onMount(() => {
  const commentToHighlight = currentURL.searchParams.get("gloss");
  if (commentToHighlight) {
    highlightComments([commentToHighlight]);
  }
});
setCommentsContext({ highlightComments });
setTokenSelectionContext({ handleEndSelection, handleStartSelection });
function handleCommentaryFiltersChange(e) {
  selectedCommentaries = e.detail.selectedOptions;
}
async function highlightComments(commentsToHighlight) {
  let foundComment;
  comments = comments.map((comment) => {
    if (commentsToHighlight.includes(comment.citable_urn)) {
      if (!foundComment) {
        foundComment = comment;
      }
      return {
        ...comment,
        isHighlighted: true
      };
    }
    return {
      ...comment,
      isHighlighted: false
    };
  });
  if (foundComment && foundComment.citable_urn) {
    await tick();
    setTimeout(() => {
      document.getElementById(foundComment.citable_urn)?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  }
}
function toggleHeatmap() {
  showHeatmap = !showHeatmap;
  selectedURN = null;
}
function toggleTextFormat() {
  showTableView = !showTableView;
}
function handleEndSelection(selectionURN) {
  if (showHeatmap) {
    selectionFocusURN = null;
    return;
  }
  selectionFocusURN = selectionURN;
  if (!selectionAnchorURN)
    return;
  console.log("END SELECTION 3");
  if (selectionAnchorURN === selectionFocusURN) {
    selectedURN = selectionAnchorURN;
    return;
  }
  const anchorURN = new CTS_URN(selectionAnchorURN);
  const focusURN = new CTS_URN(selectionFocusURN);
  const anchorLocation = anchorURN.integerCitations;
  const focusLocation = focusURN.integerCitations;
  const isBackward = focusLocation.some((l, index) => l < anchorLocation[index]);
  if (isBackward) {
    selectedURN = `${selectionFocusURN}-${selectionAnchorURN}`;
  } else {
    selectedURN = `${selectionAnchorURN}-${selectionFocusURN}`;
  }
}
function handleStartSelection(selectionURN) {
  if (showHeatmap) {
    selectionAnchorURN = null;
    return;
  }
  selectionAnchorURN = selectionURN;
}
</script>

<article class="mx-auto w-full">
	<div class="grid grid-cols-10 gap-x-8 gap-y-2 h-screen max-h-[64rem]">
		<div class="col-span-full flex justify-between">
			<div>
				{#if selectedURN}
					<p class="text-gray-500">Selected URN: {selectedURN}</p>
				{/if}
			</div>
			<div class="flex justify-between items-center mb-2">
				{#if heatmapTooltip}
					<Tooltip text={heatmapTooltip} />
				{/if}
				<form on:submit={toggleHeatmap}>
					<div class="form-control">
						<label class="label cursor-pointer">
							<span class="label-text mr-2">Highlight lemmata</span>
							<input
								name="heatmap-toggle"
								type="checkbox"
								class="toggle"
								on:change={toggleHeatmap}
								checked={showHeatmap}
								value="1"
							/>
						</label>
					</div>
				</form>

				{#if tableViewTooltip}
					<Tooltip text={tableViewTooltip} />
				{/if}
				<form on:submit={toggleTextFormat}>
					<div class="form-control">
						<label class="label cursor-pointer">
							<span class="label-text mr-2">Show table view</span>
							<input
								name="table-view-toggle"
								type="checkbox"
								class="toggle"
								on:change={toggleTextFormat}
								checked={showTableView}
								value="0"
							/>
						</label>
					</div>
				</form>
			</div>
		</div>
		<section class="col-span-2">
			<div class="flex justify-between items-center mb-2">
				<h3 class="prose prose-h3 font-semibold text-sm">Navigation</h3>
				{#if navigationTooltip}
					<Tooltip text={navigationTooltip} />
				{/if}
			</div>
			<Navigation {passages} currentPassageUrn={currentPassage.urn} />
			{#if showCommentaryFilters}
				<div class="py-2" />
				<div class="flex justify-between items-center mb-2">
					<h3 class="prose prose-h3 font-semibold text-sm">Filter Comments</h3>
					{#if filterListTooltip}
						<Tooltip text={filterListTooltip} />
					{/if}
				</div>
				<FilterList options={commentaryOptions} on:change={handleCommentaryFiltersChange} />
			{/if}
		</section>
		<section class="col-span-5 overflow-y-scroll">
			{#if showTableView}
				<TabularTextView {selectedCommentaries} {textContainers} />
			{:else}
				<ReadableTextView {selectedCommentaries} {showHeatmap} {textContainers} />
			{/if}
		</section>
		<section class="overflow-y-scroll col-span-3 max-h-screen">
			{#each filteredComments as comment}
				<CollapsibleComment {iiifURL} {comment} {stringifyCommentCitation} />
			{/each}
		</section>
	</div>
</article>
