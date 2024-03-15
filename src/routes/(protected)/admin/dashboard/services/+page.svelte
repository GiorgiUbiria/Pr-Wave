<script lang="ts">
	import Content from '../../../components/Content.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let columns = [
		{ title: 'Service Name', field: 'service_name' },
		{ title: 'Active', field: 'isactive' }
	];

	let rows = data.services;
</script>

<svelte:head>
	<title>Services</title>
</svelte:head>

<Content title="Services" {rows} {columns} />
