<script lang="ts">
	interface Props {
		name: string;
	}

	let { name }: Props = $props();
</script>

<h3 class="font-bold pt-4">{name}</h3>
