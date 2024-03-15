<script lang="ts">
	import Content from '../../components/Content.svelte';

	let rows: any[] = [];
	let columns: any[] = [];
</script>

<svelte:head>
	<title>Admin Dashboard for PR WAVE Website</title>
</svelte:head>

<Content title="Home" {rows} {columns} />
