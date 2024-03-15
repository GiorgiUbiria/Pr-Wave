<script lang="ts">
	import Content from '../../../components/Content.svelte';
	import type { PageData } from '../$types';

	export let data: PageData;

	let columns = [
		{ title: 'First Name', field: 'first_name' },
		{ title: 'Last Name', field: 'last_name' },
		{ title: 'Email', field: 'mail' },
		{ title: 'Phone Number', field: 'phone_number' }
	];

	let rows = data.users;
</script>

<svelte:head>
	<title>Users</title>
</svelte:head>

<Content title="Users" {rows} {columns} />
