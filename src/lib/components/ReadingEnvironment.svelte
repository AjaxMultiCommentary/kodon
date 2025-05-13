<script lang="ts">
	import type { Comment, PassageConfig, TextContainer } from '$lib/types.js';

	import _ from 'lodash';
	import { onMount, tick } from 'svelte';
	import CollapsibleComment from '$lib/components/CollapsibleComment.svelte';
	import FilterList from '$lib/components/FilterList.svelte';
	import { Navigation } from '$lib/components/Navigation/index.js';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { setCommentsContext } from '$lib/contexts/comments.js';
	import { setTokenSelectionContext } from '$lib/contexts/tokenSelection.js';
	import CTS_URN from '$lib/cts_urn.js';
	import ReadableTextView from './ReadableTextView.svelte';
	import TabularTextView from './TabularTextView.svelte';

	interface Props {
		currentURL: URL;
		comments: Comment[];
		citationPrefix?: string;
		citationPrefixPlural?: string;
		showCommentaryFilters?: boolean;
		stringifyCommentCitation?: (comment: Comment) => string;
		currentPassage: PassageConfig;
		iiifURL: string;
		passages: PassageConfig[];
		textContainers: TextContainer[];
		heatmapTooltip: string | undefined;
		filterListTooltip: string | undefined;
		navigationTooltip: string | undefined;
		tableViewTooltip: string | undefined;
	}

	let {
		currentURL,
		comments = $bindable(),
		citationPrefix = 'v.',
		citationPrefixPlural = 'vv.',
		showCommentaryFilters = true,
		stringifyCommentCitation = (comment: Comment) => {
			const { integerCitations } = comment.ctsUrn;

			if (integerCitations.length === 2) {
				if (integerCitations[0].join('') !== integerCitations[1].join('')) {
					return `${citationPrefixPlural} ${integerCitations[0].join('')}-${integerCitations[1].join('')}`;
				}
			}

			return `${citationPrefix} ${integerCitations[0].join('')}`;
		},
		currentPassage,
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

	// TODO: (charles) This needs to happen in the parent component (the
	// app running the show)
	onMount(() => {
		const commentToHighlight = currentURL.searchParams.get('gloss');

		if (commentToHighlight) {
			highlightComments([commentToHighlight]);
		}
	});

	setCommentsContext({ highlightComments });
	setTokenSelectionContext({ handleEndSelection, handleStartSelection });

	function handleCommentaryFiltersChange(selectedOptions: string[]) {
		selectedCommentaries = selectedOptions;
	}

	async function highlightComments(commentsToHighlight: (string | undefined)[]) {
		let foundComment: Comment | undefined;

		comments = comments.map((comment: Comment) => {
			if (commentsToHighlight.includes(comment.citable_urn as string)) {
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
				// @ts-expect-error We check for foundComment above
				document.getElementById(foundComment.citable_urn)?.scrollIntoView({ behavior: 'smooth' });
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
			selectedURN = `${selectionFocusURN}-${selectionAnchorURN}`;
		} else {
			selectedURN = `${selectionAnchorURN}-${selectionFocusURN}`;
		}
	}

	function handleStartSelection(selectionURN: string) {
		if (showHeatmap) {
			selectionAnchorURN = null;
			return;
		}

		selectionAnchorURN = selectionURN;
	}
	let commentCountsByCommentary = $derived(_.countBy(comments, (c) => c.commentaryAttributes?.pid));
	let commentaryOptions = $derived(
		_.sortBy(
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

<article class="mx-auto w-full" data-theme="corporate">
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

				{#if tableViewTooltip}
					<Tooltip text={tableViewTooltip} />
				{/if}
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
			</div>
		</div>
		<section class="col-span-2">
			<div class="flex justify-between items-center mb-2">
				<h3 class="prose prose-h3 font-semibold text-sm">Navigation</h3>
				{#if navigationTooltip}
					<Tooltip text={navigationTooltip} />
				{/if}
			</div>
			<section class="col-span-1">
				<Navigation {passages} currentPassageUrn={currentPassage.urn} />
			</section>
			{#if showCommentaryFilters}
				<div class="py-2"></div>
				<div class="flex justify-between items-center mb-2">
					<h3 class="prose prose-h3 font-semibold text-sm">Filter Comments</h3>
					{#if filterListTooltip}
						<Tooltip text={filterListTooltip} />
					{/if}
				</div>
				<FilterList
					options={commentaryOptions}
					handleOptionsChange={handleCommentaryFiltersChange}
				/>
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
