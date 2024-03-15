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
		<div class="flex flex-wrap justify-between items-center pb-8">
			<div class="flex items-center mt-4 md:mt-0">
				<button
					class="text-white rounded-md {$view == 'grid'
						? 'bg-transparent'
						: 'bg-gray-700'} p-2 ml-2"
					on:click={() => changeView()}
					title="List View"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<line x1="8" y1="6" x2="21" y2="6" />
						<line x1="8" y1="12" x2="21" y2="12" />
						<line x1="8" y1="18" x2="21" y2="18" />
						<line x1="3" y1="6" x2="3.01" y2="6" />
						<line x1="3" y1="12" x2="3.01" y2="12" />
						<line x1="3" y1="18" x2="3.01" y2="18" />
					</svg>
				</button>
				<button
					class="text-white rounded-md {$view == 'grid'
						? 'bg-gray-700'
						: 'bg-transparent'} p-2 ml-2"
					on:click={() => changeView()}
					title="Grid View"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<rect x="3" y="3" width="7" height="7" />
						<rect x="14" y="3" width="7" height="7" />
						<rect x="14" y="14" width="7" height="7" />
						<rect x="3" y="14" width="7" height="7" />
					</svg>
				</button>
			</div>
		</div>
		<Table {rows} cols={columns} />
	</div>

	<div class="w-full mt-8 lg:mt-0 lg:w-4/12 lg:pl-4">
		<AdditionalField />
	</div>
</div>
