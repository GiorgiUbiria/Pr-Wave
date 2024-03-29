<script lang="ts">
	import Content from '../../../components/Content.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let columns = [
		{ title: 'სახელი', field: 'first_name' },
		{ title: 'გვარი', field: 'last_name' },
		{ title: 'მეილი', field: 'mail' },
		{ title: 'ტელეფონის ნომერი', field: 'phone_number' }
	];

	let rows = data.users;
</script>

<svelte:head>
	<title>მომხმარებლები</title>
</svelte:head>

<Content title="Users" {rows} {columns} />
