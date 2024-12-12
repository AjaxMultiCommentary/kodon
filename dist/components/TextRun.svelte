<script>import { getCommentsContext } from "../contexts/comments.js";
import TextToken from "./TextToken.svelte";
export let showHeatmap = true;
export let run;
const { highlightComments } = getCommentsContext();
$:
  commentCount = run.reduce((acc, curr) => acc + curr.commentURNs.length, 0);
$:
  commentURNs = [...new Set(run.flatMap((t) => t.commentURNs))];
$:
  spanId = run[0].xml_id;
$:
  textElements = run.flatMap((t) => t.textElements);
$:
  titleText = `${commentCount} ${commentCount === 1 ? "gloss" : "glosses"} on this lemma`;
$:
  namedEntity = textElements.find((te) => te?.subtype === "named_entity");
$:
  hasNamedEntity = Boolean(namedEntity);
</script>

<span
	id={spanId}
	class={`comments-${Math.min(commentCount, 10)} 
		${hasNamedEntity ? 'bg-secondary/30 pl-2 py-2 rounded' : ''}
	`}
	class:comment-box-shadow={showHeatmap}
	class:cursor-pointer={commentCount > 0}
	title={titleText}
	role="button"
	tabindex="0"
	on:click={() => highlightComments(commentURNs)}
	on:keyup={(event) => {
		if (event.key === 'Enter') {
			highlightComments(commentURNs);
		}
	}}
>
	{#each run as token (token.xml_id)}
		<TextToken {token} />{' '}
	{/each}
	{#if namedEntity}
		<a
			href={namedEntity.attributes.entity_link}
			class="bg-secondary font-semibold leading-6 p-2 rounded text-sm text-white"
			target="_blank"
			title={namedEntity.attributes.entity_link}
		>
			{namedEntity.attributes.entity_type}
		</a>
	{/if}
</span>

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
