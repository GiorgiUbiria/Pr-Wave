<script lang="ts">
	import { writable } from 'svelte/store';
	import Table from './table.svelte';
	import AdditionalField from './additional_field.svelte';

	export let title: string;
	export let columns: any;
	export let rows: any;

	let view = writable('list');

	function changeView() {
		view.update((currentView) => (currentView === 'list' ? 'grid' : 'list'));
	}

	let currentDate = new Date();
	let day = currentDate.getDate();
	let month = currentDate.getMonth() + 1;
	let year = currentDate.getFullYear();
</script>

<div class="flex flex-wrap">
	<div class="w-full lg:w-8/12 bg-gray-800 py-6 px-6 rounded-3xl">
		<div class="flex justify-between text-white items-center mb-8">
			<p class="text-2xl font-bold">{title}</p>
			<p class="">{day + '-' + month + '-' + year}</p>
		</div>
		<Table {rows} cols={columns} />
	</div>

	<div class="w-full mt-8 lg:mt-0 lg:w-4/12 lg:pl-4">
		<AdditionalField />
	</div>
</div>
