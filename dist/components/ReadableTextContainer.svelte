<script>import isEqual from "lodash/isEqual.js";
import CTS_URN from "../cts_urn.js";
import {
  isCommentContainedByTextContainer,
  tokenTestForCommentContainedByTextContainer,
  tokenTestForCommentStartingInTextContainer,
  tokenTestForCommentEndingInTextContainer
} from "../functions.js";
import TextRun from "./TextRun.svelte";
export let comments;
export let showHeatmap;
export let textContainer;
const CONTAINER_ELEMENTS = {
  quote: "div",
  l: "div",
  p: "p"
};
function isTokenWithinTextElementOffsets(w, te) {
  return te.start_offset <= w.offset && w.offset <= te.end_offset;
}
function tokenURNMatchesEntityURN(w, te) {
  return w.urn === te.attributes.entity_urn;
}
$:
  containerElement = CONTAINER_ELEMENTS[textContainer.subtype] || "div";
$:
  ctsUrn = new CTS_URN(textContainer.urn);
$:
  tokens = textContainer.text.split(/\s/).map((s, index, all) => {
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
  }).map((w, _index, allWords) => {
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
      }).map((c) => c.citable_urn),
      textElements: textContainer.textElements?.filter((te) => {
        return isTokenWithinTextElementOffsets(w, te) || tokenURNMatchesEntityURN(w, te);
      })
    };
  });
$:
  runs = tokens.reduce(
    (acc, curr) => {
      const currentRun = acc.pop();
      if (typeof currentRun === "undefined") {
        return [[curr]];
      }
      const lastOfCurrentRun = currentRun.at(-1);
      if (typeof lastOfCurrentRun === "undefined") {
        return [...acc, [curr]];
      }
      const allURNsMatch = lastOfCurrentRun.commentURNs.every(
        (urn, index) => {
          curr.commentURNs[index] === urn;
        }
      );
      const lastOfCurrentRunTextElements = lastOfCurrentRun.textElements || [];
      const currentTextElements = curr.textElements || [];
      const allTextElementsMatch = lastOfCurrentRunTextElements?.length === currentTextElements?.length && lastOfCurrentRunTextElements?.every((te, i) => {
        return currentTextElements[i]?.start_offset === te?.start_offset && currentTextElements[i]?.end_offset === te?.end_offset && currentTextElements[i]?.subtype === te?.subtype && isEqual(currentTextElements[i]?.attributes, te?.attributes);
      });
      if (allURNsMatch && allTextElementsMatch) {
        currentRun.push(curr);
        return [...acc, currentRun];
      }
      return [...acc, currentRun, [curr]];
    },
    []
  );
</script>

<div class="container">
	<svelte:element
		this={containerElement}
		class="max-w-prose leading-6 {textContainer.subtype}"
		class:indent-hanging={textContainer.subtype === 'l'}
		data-urn={ctsUrn.__urn}
		role="presentation"
	>
		{#if textContainer.children && textContainer.children.length > 0}
			{#each textContainer.children as child}
				<svelte:self {showHeatmap} {comments} textContainer={child} />
			{/each}
		{:else}
			{#each runs as run}
				<TextRun {showHeatmap} {run} />
			{/each}
		{/if}
	</svelte:element>
</div>

<style>
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
