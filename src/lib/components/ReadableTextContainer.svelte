<script lang="ts">
	import ReadableTextContainer from './ReadableTextContainer.svelte';
	import type { Comment, TextContainer, TextElement, Token } from '$lib/types.js';

	import isEqual from 'lodash/isEqual.js';

	import CTS_URN from '$lib/cts_urn.js';
	import TextRun from './TextRun.svelte';

	interface Props {
		comments: Comment[];
		showHeatmap: boolean;
		textContainer: TextContainer;
	}

	let { comments, showHeatmap, textContainer }: Props = $props();

	function getContainerElement(textContainer: TextContainer) {
		switch (textContainer.subtype || textContainer.tagname) {
		case "head":
			return "h1";
		case "l":
			return "div";
		case "lb":
			return "div"
		case "p":
			return "p"
		case "quote":
			return "blockquote";
		default:
			return "span";
		}
	}

	function isTokenWithinTextElementOffsets(w: Token, te: TextElement) {
		return te.start_offset <= w.offset && w.offset <= te.end_offset;
	}

	function tokenURNMatchesEntityURN(w: Token, te: TextElement) {
		return w.urn === te.attributes.entity_urn;
	}

	let containerElement = $derived(getContainerElement(textContainer));
	let ctsUrn = $derived(new CTS_URN(textContainer.urn));
	let tokens = $derived(
		textContainer.tokens?.map((w) => {
			return {
				...w,
				textElements: textContainer.textElements?.filter((te: TextElement) => {
					return isTokenWithinTextElementOffsets(w, te) || tokenURNMatchesEntityURN(w, te);
				})
			};
		})
	);

	let runs = $derived(
		tokens?.reduce(
			(acc: Array<Token[]>, curr: Token) => {
				const currentRun = acc.pop();

				if (typeof currentRun === 'undefined') {
					return [[curr]];
				}

				const lastOfCurrentRun = currentRun.at(-1);

				if (typeof lastOfCurrentRun === 'undefined') {
					return [...acc, [curr]];
				}

				let allURNsMatch = true;
				if (lastOfCurrentRun.commentURNs) {
					allURNsMatch = lastOfCurrentRun.commentURNs?.every(
						(urn: string | undefined, index: number) => {
							if (curr.commentURNs) {
								return curr.commentURNs[index] === urn;
							}

							return false;
						}
					);
				}

				const lastOfCurrentRunTextElements = lastOfCurrentRun.textElements || [];
				const currentTextElements = curr.textElements || [];
				const allTextElementsMatch =
					lastOfCurrentRunTextElements?.length === currentTextElements?.length &&
					lastOfCurrentRunTextElements?.every((te: TextElement | undefined, i: number) => {
						return (
							currentTextElements[i]?.start_offset === te?.start_offset &&
							currentTextElements[i]?.end_offset === te?.end_offset &&
							currentTextElements[i]?.subtype === te?.subtype &&
							isEqual(currentTextElements[i]?.attributes, te?.attributes)
						);
					});

				const lastOfCurrentRunCommentURNs = lastOfCurrentRun.commentURNs || [];
				const currentCommentURNs = curr.commentURNs || [];
				const allCommentURNsMatch =
					lastOfCurrentRunCommentURNs?.length === currentCommentURNs.length &&
					lastOfCurrentRunCommentURNs?.every((commentURN: string | undefined, i: number) => {
						return currentCommentURNs[i] === commentURN;
					});

				if (allURNsMatch && allTextElementsMatch && allCommentURNsMatch) {
					currentRun.push(curr);

					return [...acc, currentRun];
				}

				return [...acc, currentRun, [curr]];
			},
			[] as Array<Token[]>
		)
	);
</script>

<svelte:element
	this={containerElement}
	class="max-w-prose leading-6 {textContainer.subtype}"
	class:indent-hanging={textContainer.subtype === 'l'}
	data-urn={ctsUrn.__urn}
	role="presentation"
>
	{#if textContainer.children}
		{#each textContainer.children as child}
			{#if child.tagname === "lb"}
				<p><a href="#{child.n}">{child.n}</a></p>
			{:else if child.tagname === "pb"}
				<p><a href="#{child.n}">page break {child.n}</a></p>
			{:else}
				<ReadableTextContainer {showHeatmap} {comments} textContainer={child} />
			{/if}
		{/each}
	{:else}
		{#each runs as run}
			<TextRun {showHeatmap} {run} />
		{/each}
	{/if}
</svelte:element>

<style lang="postcss">
	.indent-hanging {
		text-indent: 2.3rem hanging;
	}

	.div {
		padding-bottom: 1rem;
	}

	.quote {
		padding-top: 1rem;
		text-indent: 2rem;
	}

	.quote:last-of-type {
		padding-bottom: 1rem;
	}
</style>
