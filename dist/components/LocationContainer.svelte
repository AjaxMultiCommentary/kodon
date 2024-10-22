<script>import { getContext } from "svelte";
import CTS_URN from "../cts_urn.js";
import ReadableTextContainer from "./ReadableTextContainer.svelte";
import Speaker from "./Speaker.svelte";
export let comments;
export let showHeatmap;
export let locationContainer;
const { highlightComments } = getContext("comments");
$:
  children = (locationContainer.children || []).length > 0 ? locationContainer.children : [locationContainer];
$:
  ctsUrn = new CTS_URN(locationContainer.urn);
$:
  wholeLocationComments = comments?.filter((c) => !c.ctsUrn.tokens.some((t) => Boolean(t))).filter((c) => ctsUrn.hasEqualStart(c.ctsUrn)) || [];
</script>

<div>
	{#each children as child}
		{#if child.speaker}
			<Speaker name={child.speaker} />
		{/if}
		<div class="flex justify-between">
			<ReadableTextContainer {showHeatmap} {comments} textContainer={child} />

			{#if wholeLocationComments.length > 0}
				<a
					href={'#'}
					role="button"
					class={`base-content hover:opacity-70 cursor-pointer w-12 text-center inline-block comments-${wholeLocationComments.length} select-none`}
					class:comment-box-shadow={showHeatmap}
					tabindex="0"
					on:click={() => highlightComments(wholeLocationComments.map((c) => c.citable_urn))}
					on:keyup={(event) => {
						if (event.key === 'Enter') {
							highlightComments(wholeLocationComments.map((c) => c.citable_urn));
						}
					}}
					data-citation={ctsUrn.citations[0]}>{ctsUrn.citations[0]}</a
				>
			{:else}
				<span class="base-content w-12 text-center inline-block select-none"
					>{ctsUrn.citations.join('.')}</span
				>
			{/if}
		</div>
	{/each}
</div>

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
