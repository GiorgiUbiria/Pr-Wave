<script lang="ts">
	import Table from './table.svelte';
	import AdditionalField from './additional_field.svelte';

	export let title: string;
	export let columns: any;
	export let rows: any;

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
		{#if title == 'Users' || title == 'Services' || title == 'Courses'}
			<Table {rows} cols={columns} />
		{:else}
			<h1 class="text-3xl">
				{title}
			</h1>
		{/if}
	</div>

	<div class="w-full mt-8 lg:mt-0 lg:w-4/12 lg:pl-4">
		<AdditionalField />
	</div>
</div>
