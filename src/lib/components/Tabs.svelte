<script lang="ts">
	type Item = {
		name: string;
		content: any;
	};
	interface Props {
		items?: Item[];
		activeTabIndex?: number;
	}

	let { items = [], activeTabIndex = $bindable(0) }: Props = $props();

	const handleClick = (tabValue: number) => () => (activeTabIndex = tabValue);

	let activeItem = $derived(items[activeTabIndex]);
</script>

<div>
	<div role="tablist" class="tabs tabs-bordered">
		{#each items as item, index}
			<a
				href="?tabindex={index}"
				role="tab"
				class="tab"
				class:tab-active={index === activeTabIndex}
				onclick={handleClick(index)}>{item.name}</a
			>
		{/each}
	</div>
	<div class="mt-4">
		{@html activeItem.content}
	</div>
</div>
