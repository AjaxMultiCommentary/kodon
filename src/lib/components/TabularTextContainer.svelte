<script lang="ts">
	import type { Comment, TextContainer } from '$lib/types.js';

	import CTS_URN from '$lib/cts_urn.js';
	import {
		isCommentContainedByTextContainer,
		tokenTestForCommentContainedByTextContainer,
		tokenTestForCommentStartingInTextContainer,
		tokenTestForCommentEndingInTextContainer
	} from '$lib/functions.js';

	export let comments: Comment[];
	export let textContainer: TextContainer;

	$: ctsUrn = new CTS_URN(textContainer.urn);
	$: tokens = textContainer.words.map((w, _index, allWords) => {
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
