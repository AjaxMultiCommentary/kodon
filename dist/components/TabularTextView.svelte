<script>import TabularTextContainer from "./TabularTextContainer.svelte";
export let selectedCommentaries;
export let textContainers;
</script>

<table class="table-fixed">
	<thead>
		<tr>
			<th>URN</th>
			<th>Number of Comments</th>
			<th>Comment URNs</th>
		</tr>
	</thead>
	<tbody>
		{#each textContainers as textContainer}
			<TabularTextContainer
				{textContainer}
				comments={selectedCommentaries.length > 0
					? (textContainer.comments || []).filter((c) =>
							selectedCommentaries.includes(c.commentaryAttributes?.pid || '')
						)
					: textContainer.comments || []}
			/>
		{/each}
	</tbody>
</table>
