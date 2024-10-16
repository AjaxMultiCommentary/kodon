<script>import { createEventDispatcher } from "svelte";
import CTS_URN from "../cts_urn.js";
import ReadableTextContainer from "./ReadableTextContainer.svelte";
const dispatch = createEventDispatcher();
export let comments;
export let showHeatmap;
export let locationContainer;
$:
  children = locationContainer.children || [];
$:
  ctsUrn = new CTS_URN(locationContainer.urn);
$:
  wholeLocationComments = comments?.filter((c) => !c.ctsUrn.tokens.some((t) => Boolean(t))).filter((c) => ctsUrn.hasEqualStart(c.ctsUrn)) || [];
</script>

<div class="flex justify-between">
	<div>
		{#if children.length > 0}
			{#each children as child}
				<ReadableTextContainer {showHeatmap} {comments} textContainer={child} />
			{/each}
		{:else}
			<ReadableTextContainer {showHeatmap} {comments} textContainer={locationContainer} />
		{/if}
	</div>

	{#if wholeLocationComments.length > 0}
		<a
			href={'#'}
			role="button"
			class={`base-content hover:opacity-70 cursor-pointer w-12 text-center inline-block comments-${wholeLocationComments.length} select-none`}
			class:comment-box-shadow={showHeatmap}
			tabindex="0"
			on:click={() =>
				dispatch(
					'highlightComments',
					wholeLocationComments.map((c) => c.citable_urn)
				)}
			on:keyup={(event) => {
				if (event.key === 'Enter') {
					dispatch(
						'highlightComments',
						wholeLocationComments.map((c) => c.citable_urn)
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
