<script>import { createEventDispatcher } from "svelte";
export let showHeatmap;
export let token;
const dispatch = createEventDispatcher();
function tokenTitleText(t) {
  const commentsLength = t.comments?.length || 0;
  return `${commentsLength} ${commentsLength === 1 ? "gloss" : "glosses"} on this lemma`;
}
</script>

<a
	id={token.xml_id}
	class={`comments-${Math.min(token.comments?.length || 0, 10)}`}
	class:comment-box-shadow={showHeatmap}
	class:cursor-pointer={token.comments?.length || 0 > 0}
	role="button"
	tabindex="0"
	title={tokenTitleText(token)}
	on:click={() =>
		dispatch(
			'highlightComments',
			token.comments?.map((c) => c.citable_urn)
		)}
	on:keyup={(event) => {
		if (event.key === 'Enter') {
			dispatch(
				'highlightComments',
				token.comments?.map((c) => c.citable_urn)
			);
		}
	}}
	>{token.text}{' '}
</a>

<style>
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
