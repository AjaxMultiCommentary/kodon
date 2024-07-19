<script>export let citations;
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
