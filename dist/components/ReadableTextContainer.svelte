<script>import { createEventDispatcher } from "svelte";
import CTS_URN from "../cts_urn.js";
import {
  isCommentContainedByTextContainer,
  tokenTestForCommentContainedByTextContainer,
  tokenTestForCommentStartingInTextContainer,
  tokenTestForCommentEndingInTextContainer
} from "../functions.js";
import Speaker from "./Speaker.svelte";
import TextToken from "./TextToken.svelte";
const dispatch = createEventDispatcher();
export let comments;
export let showHeatmap;
export let textContainer;
$:
  ctsUrn = new CTS_URN(textContainer.urn);
$:
  wholeLineComments = comments?.filter((c) => !c.ctsUrn.tokens.some((t) => Boolean(t))).filter((c) => ctsUrn.hasEqualStart(c.ctsUrn)) || [];
$:
  tokens = textContainer.words.map((w, _index, allWords) => {
    return {
      ...w,
      commentURNs: comments?.filter((c) => c.ctsUrn.tokens.some((t) => Boolean(t))).filter((c) => {
        const commentUrn = new CTS_URN(c.ctsUrn.__urn);
        if (isCommentContainedByTextContainer(c)) {
          return tokenTestForCommentContainedByTextContainer(c, w, allWords);
        }
        if (ctsUrn.hasEqualStart(c.ctsUrn)) {
          return tokenTestForCommentStartingInTextContainer(c, w, allWords);
        }
        if (commentUrn.contains(ctsUrn)) {
          return true;
        }
        if (ctsUrn.hasEqualEnd(c.ctsUrn)) {
          return tokenTestForCommentEndingInTextContainer(c, w, allWords);
        }
        return false;
      }).map((c) => c.citable_urn)
    };
  });
</script>

<div>
	{#if textContainer.speaker}
		<Speaker name={textContainer.speaker} />
	{/if}
	<div class="flex justify-between">
		<div class="max-w-prose indent-hanging" data-urn={ctsUrn.__urn} role="presentation">
			{#each tokens as token (token.xml_id)}
				<TextToken {showHeatmap} {token} on:highlightComments on:startSelection on:endSelection />
			{/each}
		</div>
		{#if wholeLineComments.length > 0}
			<a
				href={'#'}
				role="button"
				class={`base-content hover:opacity-70 cursor-pointer w-12 text-center inline-block comments-${wholeLineComments.length} select-none`}
				class:comment-box-shadow={showHeatmap}
				tabindex="0"
				on:click={() =>
					dispatch(
						'highlightComments',
						wholeLineComments.map((c) => c.citable_urn)
					)}
				on:keyup={(event) => {
					if (event.key === 'Enter') {
						dispatch(
							'highlightComments',
							wholeLineComments.map((c) => c.citable_urn)
						);
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
</div>

<style>
	.indent-hanging {
		text-indent: 2.3rem hanging;
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
