<script lang="ts">
	import Content from '../../../components/Content.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let columns = [
		{ title: 'კურსის სახელი', field: 'course_name' },
		{ title: 'აქტიური', field: 'isactive' },
		{ title: 'დაწყების თარიღი', field: 'start_date' },
		{ title: 'დასრულების თარიღი', field: 'end_date' }
	];

	let rows = data.courses;
</script>

<svelte:head>
	<title>კურსები</title>
</svelte:head>

<Content title="Courses" {rows} {columns} />
