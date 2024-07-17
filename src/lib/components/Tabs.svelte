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

<div>
	<div role="tablist" class="tabs tabs-bordered">
		{#each items as item, index}
			<a
				href="?tabindex={index}"
				role="tab"
				class="tab"
				class:tab-active={index === activeTabIndex}
				on:click={handleClick(index)}>{item.name}</a
			>
		{/each}
	</div>
	<div class="mt-4">
		{@html activeItem.content}
	</div>
</div>
