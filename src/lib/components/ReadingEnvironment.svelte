<script lang="ts">
	import type { Comment, PassageConfig, TextContainer } from '$lib/types.js';

	import _ from 'lodash';
	import { onMount, tick } from 'svelte';
	import CitableTextContainer from '$lib/components/ReadableTextContainer.svelte';
	import CollapsibleComment from '$lib/components/CollapsibleComment.svelte';
	import FilterList from '$lib/components/FilterList.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import CTS_URN from '$lib/cts_urn.js';
	import ReadableTextView from './ReadableTextView.svelte';
	import TabularTextView from './TabularTextView.svelte';

	export let currentURL: URL;
	export let comments: Comment[];
	export let currentPassage: PassageConfig;
	export let iiifURL: string;
	export let passages: PassageConfig[];
	export let textContainers: TextContainer[];

	export let heatmapTooltip: string | undefined;
	export let filterListTooltip: string | undefined;
	export let navigationTooltip: string | undefined;
	export let tableViewTooltip: string | undefined;

	let selectedURN: string | null | undefined = null;
	let selectionAnchorURN: string | null | undefined = null;
	let selectionFocusURN: string | null | undefined = null;

	$: commentCountsByCommentary = _.countBy(comments, (c) => c.commentaryAttributes?.pid);
	$: commentaryOptions = _.sortBy(
		Object.keys(commentCountsByCommentary).map((c) => {
			const attributes =
				comments.find((comment) => comment.commentaryAttributes?.pid === c)?.commentaryAttributes ||
				{};
			const label = `${attributes.creators?.map((cc) => cc.last_name).join(', ')} ${attributes.publication_date}`;

			return { extra: commentCountsByCommentary[c], label, pid: c };
		}),
		(o) => o.label
	);
	$: filteredComments = comments.filter((c) =>
		selectedCommentaries.length > 0
			? selectedCommentaries.includes(c.commentaryAttributes?.pid || '')
			: true
	);
	$: selectedCommentaries = [] as string[];
	$: showHeatmap = true;
	$: showTableView = false;

	// TODO: (charles) This needs to happen in the parent component (the
	// app running the show)
	onMount(() => {
		const commentToHighlight = currentURL.searchParams.get('gloss');

		if (commentToHighlight) {
			highlightComments([commentToHighlight]);
		}
	});

	function handleCommentaryFiltersChange(e: CustomEvent) {
		selectedCommentaries = e.detail.selectedOptions;
	}

	function handleHighlightComments(e: CustomEvent) {
		highlightComments(e.detail);
	}

	async function highlightComments(commentsToHighlight: string[]) {
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

	function handleEndSelection(e: CustomEvent) {
		if (showHeatmap) {
			selectionFocusURN = null;
			return;
		}

		if (typeof e.detail === 'string') {
			selectionFocusURN = e.detail;
		}

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

	function handleStartSelection(e: CustomEvent) {
		if (showHeatmap) {
			selectionAnchorURN = null;
			return;
		}

		if (typeof e.detail === 'string') {
			selectionAnchorURN = e.detail;
		}
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
			<div class="py-2" />
			<div class="flex justify-between items-center mb-2">
				<h3 class="prose prose-h3 font-semibold text-sm">Filter Comments</h3>
				{#if filterListTooltip}
					<Tooltip text={filterListTooltip} />
				{/if}
			</div>
			<FilterList options={commentaryOptions} on:change={handleCommentaryFiltersChange} />
		</section>
		<section class="col-span-5 overflow-y-scroll">
			{#if showTableView}
				<TabularTextView {selectedCommentaries} {textContainers} />
			{:else}
				<ReadableTextView
					{selectedCommentaries}
					{showHeatmap}
					{textContainers}
					{handleHighlightComments}
					{handleEndSelection}
					{handleStartSelection}
				/>
			{/if}
		</section>
		<section class="overflow-y-scroll col-span-3 max-h-screen">
			{#each filteredComments as comment}
				<CollapsibleComment {iiifURL} {comment} />
			{/each}
		</section>
	</div>
</article>
