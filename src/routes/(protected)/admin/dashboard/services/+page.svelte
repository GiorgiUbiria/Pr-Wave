<script lang="ts">
	import Content from '../../../components/Content.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let columns = [
		{ title: 'სერვისის სახელი', field: 'service_name' },
		{ title: 'აქტიური', field: 'isactive' }
	];

	let rows = data.services;
</script>

<svelte:head>
	<title>სერვისები</title>
</svelte:head>

<Content title="Services" {rows} {columns} />
