<script lang="ts">
	type Item = {
		name: string;
		content: any;
	};
	export let items: Item[] = [];
	export let activeTabIndex = 0;

	const handleClick = (tabValue: number) => () => (activeTabIndex = tabValue);

	$: activeItem = items[activeTabIndex];
</script>

<div></div>
<div role="tablist" class="tabs tabs-lifted">
	{#each items as item, index}
		<a
			href="?tabindex={index}"
			role="tab"
			class="tab"
			class:tab-active={index === activeTabIndex}
			on:click={handleClick(index)}>{item.name}</a
		>
	{/each}
	<div class="tab-content bg-base-100 border-base-300 rounded-box p-6">
		{@html activeItem.content}
	</div>
</div>
