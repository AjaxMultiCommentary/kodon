<script lang="ts">
	import ReadableTextContainer from './ReadableTextContainer.svelte';
	import type { Comment, TextContainer } from '$lib/types.js';

	import CTS_URN from '$lib/cts_urn.js';

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

	let containerElement = $derived(getContainerElement(textContainer));
	let ctsUrn = $derived(new CTS_URN(textContainer.urn));
	let tokens = $derived(textContainer.tokens || [])
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
	{#each ((textContainer.children || []) as TextContainer[]) as child, index}
		<ReadableTextContainer {showHeatmap} {comments} textContainer={child} />
	{/each}

	{#each tokens as token}
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
