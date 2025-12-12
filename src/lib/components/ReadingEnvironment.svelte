<script lang="ts">
	import type { Comment, RenderablePassageConfig, TextContainer } from '$lib/types.js';

	import lodash from 'lodash';
	import { onMount, tick } from 'svelte';
	import CollapsibleComment from '$lib/components/CollapsibleComment.svelte';
	import FilterList from '$lib/components/FilterList.svelte';
	import { Navigation } from '$lib/components/Navigation/index.js';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { getCommentsContext, setCommentsContext } from '$lib/contexts/comments.js';
	import { setTokenSelectionContext } from '$lib/contexts/tokenSelection.js';
	import { highlightComments } from '$lib/functions.js';
	import CTS_URN from '$lib/cts_urn.js';
	import LocationContainer from './LocationContainer.svelte';
	import TabularTextView from './TabularTextView.svelte';

	const { countBy, sortBy } = lodash;

	interface Props {
		citationPrefix?: string;
		citationPrefixPlural?: string;
		comments?: Comment[];
		currentPassageURN: string;
		currentURL: URL;
		DaisyUITheme?: string;
		filterListTooltip?: string | boolean;
		heatmapTooltip?: string | boolean;
		iiifURL?: string;
		navigationTooltip?: string | boolean;
		passages: RenderablePassageConfig[];
		showCommentaryFilters?: boolean;
		stringifyCommentCitation?: (comment: Comment) => string;
		tableViewTooltip?: string | boolean;
		textContainers: TextContainer[];
	}

	let {
		DaisyUITheme = 'corporate',
		currentURL,
		comments = $bindable([]),
		citationPrefix = 'v.',
		citationPrefixPlural = 'vv.',
		showCommentaryFilters = false,
		stringifyCommentCitation = (comment: Comment) => {
			const { integerCitations } = comment.ctsUrn;

			if (integerCitations.length === 2) {
				if (integerCitations[0].join('') !== integerCitations[1].join('')) {
					return `${citationPrefixPlural} ${integerCitations[0].join('')}-${integerCitations[1].join('')}`;
				}
			}

			return `${citationPrefix} ${integerCitations[0].join('')}`;
		},
		currentPassageURN,
		iiifURL,
		passages,
		textContainers,
		heatmapTooltip,
		filterListTooltip,
		navigationTooltip,
		tableViewTooltip
	}: Props = $props();

	let selectedURN: string | null | undefined = $state(null);
	let selectionAnchorURN: string | null | undefined = null;
	let selectionFocusURN: string | null | undefined = null;

	setCommentsContext({ comments });
	setTokenSelectionContext({ handleEndSelection, handleStartSelection });

	// TODO: (charles) This needs to happen in the parent component (the
	// app running the show)
	onMount(async () => {
		const commentToHighlight = currentURL.searchParams.get('gloss');

		if (commentToHighlight) {
			const unhighlightedComments = getCommentsContext().comments;
			const highlightedComments = highlightComments(unhighlightedComments, [commentToHighlight]);

			setCommentsContext({ comments: highlightedComments });

			await tick();

			document.getElementById(commentToHighlight)?.scrollIntoView();
		}
	});

	function handleCommentaryFiltersChange(selectedOptions: string[]) {
		selectedCommentaries = selectedOptions;
	}

	function toggleHeatmap() {
		showHeatmap = !showHeatmap;
		selectedURN = null;
	}

	function toggleTextFormat() {
		showTableView = !showTableView;
	}

	function handleEndSelection(selectionURN: string) {
		if (showHeatmap) {
			selectionFocusURN = null;
			return;
		}

		selectionFocusURN = selectionURN;

		if (!selectionAnchorURN) return;

		if (selectionAnchorURN === selectionFocusURN) {
			selectedURN = selectionAnchorURN;

			return;
		}

		const anchorURN = new CTS_URN(selectionAnchorURN as string);
		const focusURN = new CTS_URN(selectionFocusURN as string);
		const anchorLocation = anchorURN.integerCitations;
		const focusLocation = focusURN.integerCitations;

		const isBackward = focusLocation.some((l, index) => l < anchorLocation[index]);

		if (isBackward) {
			selectedURN = `${selectionFocusURN}-${anchorURN.passageComponent}`;
		} else {
			selectedURN = `${selectionAnchorURN}-${focusURN.passageComponent}`;
		}
	}

	function handleStartSelection(selectionURN: string) {
		if (showHeatmap) {
			selectionAnchorURN = null;
			return;
		}

		selectionAnchorURN = selectionURN;
	}
	let commentCountsByCommentary = $derived(countBy(comments, (c) => c.commentaryAttributes?.pid));
	let commentaryOptions = $derived(
		sortBy(
			Object.keys(commentCountsByCommentary).map((c) => {
				const attributes =
					comments.find((comment) => comment.commentaryAttributes?.pid === c)
						?.commentaryAttributes || {};
				const label = `${attributes.creators?.map((cc) => cc.last_name).join(', ')} ${attributes.publication_date}`;

				return { extra: commentCountsByCommentary[c], label, pid: c };
			}),
			(o) => o.label
		)
	);
	let selectedCommentaries = $derived([] as string[]);
	let filteredComments = $derived(
		comments.filter((c) =>
			selectedCommentaries.length > 0
				? selectedCommentaries.includes(c.commentaryAttributes?.pid || '')
				: true
		)
	);
	let showHeatmap = $state(true);

	let showTableView = $state(false);
</script>

<article class="mx-auto w-full" data-theme={DaisyUITheme}>
	<div class="col-span-full flex justify-between">
		<div>
			{#if selectedURN}
				<p class="text-gray-500">Selected URN: {selectedURN}</p>
			{/if}
		</div>
		<div class="flex justify-between items-center mb-2">
			{#if heatmapTooltip}
				<Tooltip text={heatmapTooltip as string} />
				<form onsubmit={toggleHeatmap}>
					<div class="form-control">
						<label class="label cursor-pointer">
							<span class="label-text mr-2">Highlight lemmata</span>
							<input
								name="heatmap-toggle"
								type="checkbox"
								class="toggle"
								onchange={toggleHeatmap}
								checked={showHeatmap}
								value="1"
							/>
						</label>
					</div>
				</form>
			{/if}

			{#if tableViewTooltip}
				<Tooltip text={tableViewTooltip as string} />
				<form onsubmit={toggleTextFormat}>
					<div class="form-control">
						<label class="label cursor-pointer">
							<span class="label-text mr-2">Show table view</span>
							<input
								name="table-view-toggle"
								type="checkbox"
								class="toggle"
								onchange={toggleTextFormat}
								checked={showTableView}
								value="0"
							/>
						</label>
					</div>
				</form>
			{/if}
		</div>
	</div>
	<div class="flex h-screen justify-between max-h-256">
		<section class="flex-auto">
			<div class="flex justify-between items-center mb-2">
				<h3 class="prose prose-h3 font-semibold text-sm">Navigation</h3>
				{#if navigationTooltip}
					<Tooltip text={navigationTooltip as string} />
				{/if}
			</div>
			<div>
				<Navigation {passages} currentPassageURN={currentPassageURN} />
			</div>
			{#if showCommentaryFilters}
				<div class="py-2"></div>
				<div class="flex justify-between items-center mb-2">
					<h3 class="prose prose-h3 font-semibold text-sm">Filter Comments</h3>
					{#if filterListTooltip}
						<Tooltip text={filterListTooltip as string} />
					{/if}
				</div>
				<FilterList
					options={commentaryOptions}
					handleOptionsChange={handleCommentaryFiltersChange}
				/>
			{/if}
		</section>
		<section class="flex-initial overflow-y-scroll">
			{#if showTableView}
				<TabularTextView {selectedCommentaries} {textContainers} />
			{:else}
				{#each textContainers as textContainer}
					<LocationContainer locationContainer={textContainer} {showHeatmap} />
				{/each}
			{/if}
		</section>
		<section class="flex-auto overflow-y-scroll max-h-screen">
			{#each filteredComments as comment}
				<CollapsibleComment {iiifURL} {comment} {stringifyCommentCitation} />
			{/each}
		</section>
	</div>
</article>
