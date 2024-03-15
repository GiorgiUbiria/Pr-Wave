<script lang="ts">
	import Content from '../../../components/Content.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let columns = [
		{ title: 'Course Name', field: 'course_name' },
		{ title: 'Active', field: 'isactive' },
		{ title: 'Start Date', field: 'start_date' },
		{ title: 'End Date', field: 'end_date' }
	];

	let rows = data.courses;
</script>

<svelte:head>
	<title>Courses</title>
</svelte:head>

<Content title="Courses" {rows} {columns} />
