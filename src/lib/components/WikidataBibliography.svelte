<script lang="ts">
	import type { WikidataEntry } from '$lib/types.js';

	export let citations: WikidataEntry[];

	// use one query for each item
	// "core corpus" tab: show "sub-bibliography" in expandable block for each commentary in commentary.toml
	// "extended bibliography": show full bibliographic information, and in expandable block show who from the core corpus cites each item
	// for extended items (Bowra, Falco, etc.): tabulate how many commentaries are citing them
	// - sort by how many citations
</script>

<div class="table table-pin-cols">
	<thead>
		<th>Author</th>
		<th>Year of Publication</th>
		<th>Title</th>
		<th>Publisher</th>
		<th>Place of Publication</th>
	</thead>
	<tbody>
		{#each citations as citation}
			<tr>
				<td>{citation.author}</td>
				<td>{new Date(citation.pubdate).getFullYear()}</td>
				<td>{citation.title}</td>
				<td>{citation.publisher}</td>
				<td>{citation.place || ''}</td>
			</tr>
		{/each}
	</tbody>
</div>
