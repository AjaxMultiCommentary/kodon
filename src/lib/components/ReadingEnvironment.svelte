<script lang="ts">
	import type { Comment, PassageConfig, TextContainer } from '$lib/types.js';

	import _ from 'lodash';
	import { page } from '$app/stores';
	import { marked } from 'marked';
	import { onMount, tick } from 'svelte';
	import CitableTextContainer from '$lib/components/CitableTextContainer.svelte';
	import CollapsibleComment from '$lib/components/CollapsibleComment.svelte';
	import FilterList from '$lib/components/FilterList.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';

	export let comments: Comment[];
	export let currentPassage: PassageConfig;
	export let iiifURL: string;
	export let metadata;
	export let passages: PassageConfig[];
	export let textContainers: TextContainer[];

	export let heatmapTooltip: string | undefined;
	export let filterListTooltip: string | undefined;
	export let navigationTooltip: string | undefined;

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

	onMount(() => {
		const commentToHighlight = $page.url.searchParams.get('gloss');

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
				// @ts-ignore
				document.getElementById(foundComment.citable_urn)?.scrollIntoView({ behavior: 'smooth' });
			}, 200);
		}
	}

	function toggleHeatmap() {
		showHeatmap = !showHeatmap;
	}
</script>

<article class="mx-auto w-full">
	<div class="grid grid-cols-10 gap-x-8 gap-y-2 h-screen max-h-[64rem]">
		<div class="col-span-full flex justify-between">
			<div>
				<h1 class="text-2xl font-bold">{@html marked(metadata.title)}</h1>

				<p>{@html marked(metadata.description)}</p>
			</div>
			<div class="flex">
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
				{#if heatmapTooltip}
					<Tooltip text={heatmapTooltip} />
				{/if}
			</div>
		</div>
		<section class="col-span-2">
			<div class="flex">
				<Navigation {passages} currentPassageUrn={currentPassage.urn} />
				{#if navigationTooltip}
					<Tooltip text={navigationTooltip} />
				{/if}
			</div>
			<div class="py-2" />
			<div class="flex">
				<FilterList options={commentaryOptions} on:change={handleCommentaryFiltersChange} />
				{#if filterListTooltip}
					<Tooltip text={filterListTooltip} />
				{/if}
			</div>
		</section>
		<section class="col-span-5 overflow-y-scroll -mt-4">
			{#each textContainers as textContainer}
				<CitableTextContainer
					{textContainer}
					comments={selectedCommentaries.length > 0
						? (textContainer.comments || []).filter((c) =>
								selectedCommentaries.includes(c.commentaryAttributes?.pid || '')
							)
						: textContainer.comments || []}
					on:highlightComments={handleHighlightComments}
					{showHeatmap}
				/>
			{/each}
		</section>
		<section class="overflow-y-scroll col-span-3 max-h-screen">
			{#each filteredComments as comment}
				<CollapsibleComment {iiifURL} {comment} />
			{/each}
		</section>
	</div>
</article>
