<script>import { base } from "$app/paths";
import { marked } from "marked";
export let passages;
export let currentPassageUrn;
</script>

<section class="col-span-1">
	<ul class="menu bg-base-200 p-0">
		{#each passages as passage}
			<li class="text-sm">
				<a href="{base}/passages/{passage.urn}" class:active={passage.urn === currentPassageUrn}>
					{@html marked(passage.label)}
					{passage.ref}
				</a>
			</li>
		{/each}
	</ul>
</section>
