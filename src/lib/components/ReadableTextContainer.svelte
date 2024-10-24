<script lang="ts">
	import type { Comment, TextContainer } from '$lib/types.js';

	import CTS_URN from '$lib/cts_urn.js';
	import {
		isCommentContainedByTextContainer,
		tokenTestForCommentContainedByTextContainer,
		tokenTestForCommentStartingInTextContainer,
		tokenTestForCommentEndingInTextContainer
	} from '$lib/functions.js';
	import TextToken from './TextToken.svelte';

	export let comments: Comment[];
	export let showHeatmap: boolean;
	export let textContainer: TextContainer;

	const CONTAINER_ELEMENTS = {
		quote: 'div',
		l: 'div',
		p: 'p'
	};

	$: containerElement = CONTAINER_ELEMENTS[textContainer.subtype] || 'div';
	$: ctsUrn = new CTS_URN(textContainer.urn);
	$: tokens = textContainer.text
		.split(/\s/)
		.map((s, index, all) => {
			const remaining = all.slice(index);
			const offset = remaining.indexOf(s) + index;
			const text = s;
			const urn_index = all.slice(0, index).filter((a) => a === s).length + 1;
			const urn = `${textContainer.urn}@${text}[${urn_index}]`;
			return {
				commentURNs: [],
				offset,
				text,
				urn_index,
				xml_id: urn,
				urn
			};
		})
		.map((w, _index, allWords) => {
			return {
				...w,
				commentURNs: comments
					?.filter((c) => c.ctsUrn.tokens.some((t: string | undefined) => Boolean(t)))
					.filter((c) => {
						const commentUrn = new CTS_URN(c.ctsUrn.__urn);

						// comment only applies to this container
						if (isCommentContainedByTextContainer(c)) {
							return tokenTestForCommentContainedByTextContainer(c, w, allWords);
						}

						// comment starts on this container
						if (ctsUrn.hasEqualStart(c.ctsUrn)) {
							return tokenTestForCommentStartingInTextContainer(c, w, allWords);
						}

						// comment fully contains this container
						if (commentUrn.contains(ctsUrn)) {
							return true;
						}

						// comment ends on this container
						if (ctsUrn.hasEqualEnd(c.ctsUrn)) {
							return tokenTestForCommentEndingInTextContainer(c, w, allWords);
						}

						return false;
					})
					.map((c) => c.citable_urn)
			};
		});
</script>

<div class="container">
	<svelte:element
		this={containerElement}
		class="max-w-prose {textContainer.subtype}"
		class:indent-hanging={textContainer.subtype === 'l'}
		data-urn={ctsUrn.__urn}
		role="presentation"
	>
		{#if textContainer.children && textContainer.children.length > 0}
			{#each textContainer.children as child}
				<svelte:self {showHeatmap} {comments} textContainer={child} />
			{/each}
		{:else}
			{#each tokens as token (token.xml_id)}
				<TextToken {showHeatmap} {token} />
			{/each}
		{/if}
	</svelte:element>
</div>

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
