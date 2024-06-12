<script>import _ from "lodash";
import { createEventDispatcher } from "svelte";
import CTS_URN from "../cts_urn.js";
import Speaker from "./Speaker.svelte";
import TextToken from "./TextToken.svelte";
const dispatch = createEventDispatcher();
export let comments;
export let showHeatmap;
export let textContainer;
function dropTokensUntilStartOfComment(tokens2, comment) {
  return _.dropWhile(
    tokens2,
    (t) => !(t.text.indexOf(_.first(comment.ctsUrn.tokens) || "") > -1 && t.urn_index === _.first(comment.ctsUrn.tokenIndexes))
  );
}
function takeTokensUntilEndOfComment(tokens2, comment) {
  const exclusive = _.takeWhile(
    tokens2,
    (t) => !(t.text.indexOf(_.last(comment.ctsUrn.tokens) || "") > -1 && t.urn_index === _.last(comment.ctsUrn.tokenIndexes))
  );
  const excludedToken = tokens2.find(
    (t) => t.text.indexOf(_.last(comment.ctsUrn.tokens) || "") > -1 && t.urn_index === _.last(comment.ctsUrn.tokenIndexes)
  ) || [];
  return exclusive.concat(excludedToken);
}
function isCommentContainedByTextContainer(comment) {
  return comment.ctsUrn.integerCitations.length === 1 || comment.ctsUrn.integerCitations[0].join("") === comment.ctsUrn.integerCitations[1].join("");
}
function tokenTestForCommentContainedByTextContainer(comment, token, tokens2) {
  if (token.urn_index > 0) {
    const withoutLeadingTokens = dropTokensUntilStartOfComment(tokens2, comment);
    const availableTokens = takeTokensUntilEndOfComment(withoutLeadingTokens, comment);
    return availableTokens.find((t) => t.xml_id === token.xml_id);
  }
}
function tokenTestForCommentEndingInTextContainer(comment, token, tokens2) {
  return takeTokensUntilEndOfComment(tokens2, comment).find(
    (t) => t.xml_id === token.xml_id
  );
}
function tokenTestForCommentStartingInTextContainer(comment, token, tokens2) {
  return dropTokensUntilStartOfComment(tokens2, comment).find(
    (t) => t.xml_id === token.xml_id
  );
}
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
		<p class="max-w-prose indent-hanging">
			{#each tokens as token (token.xml_id)}
				<TextToken {showHeatmap} {token} on:highlightComments />
			{/each}
		</p>
		{#if wholeLineComments.length > 0}
			<a
				href={'#'}
				role="button"
				class={`base-content hover:opacity-70 cursor-pointer w-12 text-center inline-block comments-${wholeLineComments.length}`}
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
			<span class="base-content w-12 text-center inline-block">{ctsUrn.citations.join('.')}</span>
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
