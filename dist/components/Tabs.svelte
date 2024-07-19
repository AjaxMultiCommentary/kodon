<script>export let items = [];
export let activeTabIndex = 0;
const handleClick = (tabValue) => () => activeTabIndex = tabValue;
$:
  activeItem = items[activeTabIndex];
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
