<script lang="ts">
	import type { StaticPageInfo } from '$lib/types.js';

	import { marked } from 'marked';

	export let title: string;
	export let staticPages: StaticPageInfo[];
</script>

<nav>
	<div class="mx-auto">
		<div class="flex h-16 justify-between">
			<div class="flex">
				<div class="hidden sm:-my-px sm:flex sm:space-x-8 sm:items-center">
					<a href="/" class="link link-hover">{@html marked(title)}</a>
					{#each staticPages as staticPage}
						<a href={staticPage.path} class="link link-hover">{staticPage.title}</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
</nav>
