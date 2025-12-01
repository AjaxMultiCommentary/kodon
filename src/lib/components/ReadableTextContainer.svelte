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

	function getContainerElement(tc: TextContainer) {
		switch (tc.subtype || tc.tagname) {
			case 'head':
				return 'h1';
			case 'l':
				return 'span';
			case 'lb':
				return 'span';
			case 'lg':
				return 'div';
			case 'p':
				return 'p';
			case 'quote':
				return 'blockquote';
			default:
				return 'span';
		}
	}

	function getTailTokens(child: TextContainer, childIndex: number) {
		const nextChild = textContainer.children?.at(childIndex + 1);

		if (nextChild) {
			return textContainer.tokens.filter(
				(token) => token.offset >= child.char_offset && token.offset < nextChild.char_offset
			);
		}
	}

	function isTokenWithinTextElementOffsets(token: Token, te: TextElement) {
		return te.start_offset <= token.offset && token.offset <= te.end_offset;
	}

	function tokenURNMatchesEntityURN(token: Token, te: TextElement) {
		return token.urn === te.attributes.entity_urn;
	}

	let containerElement = $derived(getContainerElement(textContainer));
	let ctsUrn = $derived(new CTS_URN(textContainer.urn));

	let lastTokens = $derived(
		textContainer.tokens.filter((token) => {
			if (textContainer.children && textContainer.children.length > 1) {
				const lastChild = textContainer.children.at(-1);

				return lastChild && token.offset >= lastChild.end_char_offset;
			}

			return false;
		})
	);
</script>

<svelte:element
	this={containerElement}
	class="max-token-prose leading-6 {textContainer.tagname}"
	class:indent-hanging={textContainer.tagname === 'l'}
	data-urn={ctsUrn.__urn}
	role="presentation"
>
	{#if textContainer.tagname === 'lb' || textContainer.tagname === 'pb'}<br /><a
			href="#{textContainer.n}">{textContainer.n}</a
		>{/if}
	{#each textContainer.children as child, index}
		<ReadableTextContainer {showHeatmap} {comments} textContainer={child} />
		{#each getTailTokens(child, index) as token}
			{token.text}{token.whitespace}
		{/each}
	{/each}
	{#each lastTokens as token}
		{token.text}{token.whitespace}
	{/each}
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
