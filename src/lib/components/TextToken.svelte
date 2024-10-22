<script lang="ts">
	import type { Word } from '$lib/types.js';

	import { getContext } from 'svelte';

	/**
	 * Should the heatmap for comment density be displayed?
	 */
	export let showHeatmap: boolean = true;

	/**
	 * The token to render here.
	 */
	export let token: Word;

	// @ts-expect-error need to add typing to getContext calls
	const { highlightComments } = getContext('comments');

	// @ts-expect-error need to add typing to getContext calls
	const { handleEndSelection, handleStartSelection } = getContext('token-selection');

	function tokenTitleText(t: Word) {
		const commentsLength = t.commentURNs.length || 0;

		return `${commentsLength} ${commentsLength === 1 ? 'gloss' : 'glosses'} on this lemma`;
	}
</script>

<span
	id={token.xml_id}
	class={`comments-${Math.min(token.commentURNs.length || 0, 10)}`}
	class:comment-box-shadow={showHeatmap}
	class:cursor-pointer={token.commentURNs.length || 0 > 0}
	data-urn={token.urn}
	role="button"
	tabindex="0"
	title={tokenTitleText(token)}
	on:click={() => highlightComments(token.commentURNs)}
	on:keyup={(event) => {
		if (event.key === 'Enter') {
			highlightComments(token.commentURNs);
		}
	}}
	on:mousedown={() => handleStartSelection(token.urn)}
	on:mouseup={() => handleEndSelection(token.urn)}
	>{token.text}{' '}
</span>

<style lang="postcss">
	.addition::before {
		content: '<';
	}

	.addition::after {
		content: '>';
	}

	.deletion {
		opacity: 0.7;
	}

	.deletion::before {
		content: '[';
	}

	.deletion::after {
		content: ']';
	}

	.comment-box-shadow.comments-1 {
		background-color: rgb(99, 162, 187, 0.2);
	}

	.comment-box-shadow.comments-2 {
		background-color: rgba(99, 162, 187, 0.4);
	}

	.comment-box-shadow.comments-3 {
		background-color: rgba(99, 162, 187, 0.6);
	}

	.comment-box-shadow.comments-4 {
		background-color: rgba(99, 162, 187, 0.8);
	}

	.comment-box-shadow.comments-5 {
		background-color: rgba(99, 162, 187, 0.9);
	}

	.comment-box-shadow.comments-6 {
		background-color: rgba(99, 162, 187, 1);
	}

	.comment-box-shadow.comments-7 {
		background-color: rgba(67, 121, 142, 0.8);
	}

	.comment-box-shadow.comments-8 {
		background-color: rgba(67, 121, 142, 0.9);
	}

	.comment-box-shadow.comments-9 {
		background-color: rgba(67, 121, 142, 1);
	}

	.comment-box-shadow.comments-10 {
		background-color: rgb(67, 121, 142, 1);
	}
</style>
