<script lang="ts">
	import type { StaticPageInfo } from '$lib/types.js';

	import { base } from '$app/paths';

	interface Props {
		children?: import('svelte').Snippet;
		staticPages: StaticPageInfo[];
		title: string;
	}

	let { children, staticPages, title }: Props = $props();
</script>

<nav class="navbar">
	<a href="{base}/" class="btn btn-link">{title}</a>
	{@render children?.()}
	{#each staticPages as staticPage}
		<a href="{base}{staticPage.path}" class="btn btn-link">{staticPage.title}</a>
	{/each}
</nav>
