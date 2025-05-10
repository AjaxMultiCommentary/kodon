<script lang="ts">
	import type { ChangeEventHandler } from 'svelte/elements';

	type Option = {
		extra?: string | number;
		label: string;
		pid: string;
	};

	interface Props {
		inputName?: string;
		options?: Option[];
		handleOptionsChange: (options: string[]) => void;
	}

	let { inputName = 'filter-list', options = [], handleOptionsChange }: Props = $props();

	let searchValue = $state('');
	let selectedOptions: string[] = $state([]);

	let availableOptions = $derived(
		searchValue === ''
			? options
			: options.filter((o) => o.label.toLowerCase().includes(searchValue.toLowerCase()))
	);
</script>

<div>
	<input
		type="text"
		name={inputName}
		class="w-full input input-secondary input-sm mb-2"
		placeholder="Filter commentaries"
		bind:value={searchValue}
	/>
	{#each options as option}
		<!-- We need to keep a list of all of the options for the `bind:group` to work, 
			but we can just hide options that are filtered out by the search filter. -->
		<div class="text-sm mb-1" class:hidden={!availableOptions.some((o) => o.pid === option.pid)}>
			<label for={option.pid}>
				<input
					id={option.pid}
					type="checkbox"
					value={option.pid}
					bind:group={selectedOptions}
					onchange={() => handleOptionsChange(selectedOptions)}
				/>
				{option.label}
				{#if option.extra}
					<span class="base-content float-right">({option.extra})</span>
				{/if}
			</label>
		</div>
	{/each}
</div>
