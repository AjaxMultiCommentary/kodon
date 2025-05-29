<script lang="ts">
	import Info from '@lucide/svelte/icons/info';
	interface Props {
		text: string;
	}

	let { text }: Props = $props();
</script>

<div class="prose text-justify tooltip tooltip-neutral" data-tip={text}>
	<Info />
</div>
