<script>import CTS_URN from "../cts_urn.js";
import {
  isCommentContainedByTextContainer,
  tokenTestForCommentContainedByTextContainer,
  tokenTestForCommentStartingInTextContainer,
  tokenTestForCommentEndingInTextContainer
} from "../functions.js";
export let comments;
export let textContainer;
$:
  ctsUrn = new CTS_URN(textContainer.urn);
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

{#each tokens as token}
	<tr>
		<td class="border-b border-slate-300">
			{token.urn}
		</td>
		<td class="border-b border-slate-300">
			{token.commentURNs.length}
		</td>
		<td class="border-b border-slate-300">
			{token.commentURNs.join(', ')}
		</td>
	</tr>
{/each}
