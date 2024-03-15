<script lang="ts">
	import { writable } from 'svelte/store';

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

		<!--TODO: Breaks the mobile responsiveness, fix.  -->
		<div class="relative overflow-x-auto w-full">
			<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
				<thead
					class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
				>
					<tr>
						{#each columns as column}
							<th scope="col" class="px-6 py-3"> {column.title} </th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each rows as row}
						<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
							{#each columns as column}
								<td class="px-6 py-4"> {row[column.field]} </td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<!-- TODO: Implement pagination based on the URL parameters -->
		<nav aria-label="Page navigation example" class="flex justify-center pt-2">
			<ul class="flex items-center -space-x-px h-8 text-sm">
				<li>
					<a
						href="#"
						class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
					>
						<span class="sr-only">Previous</span>
						<svg
							class="w-2.5 h-2.5 rtl:rotate-180"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 6 10"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 1 1 5l4 4"
							/>
						</svg>
					</a>
				</li>
				<li>
					<a
						href="#"
						class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>1</a
					>
				</li>
				<li>
					<a
						href="#"
						class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>2</a
					>
				</li>
				<li>
					<a
						href="#"
						aria-current="page"
						class="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
						>3</a
					>
				</li>
				<li>
					<a
						href="#"
						class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>4</a
					>
				</li>
				<li>
					<a
						href="#"
						class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>5</a
					>
				</li>
				<li>
					<a
						href="#"
						class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
					>
						<span class="sr-only">Next</span>
						<svg
							class="w-2.5 h-2.5 rtl:rotate-180"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 6 10"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m1 9 4-4-4-4"
							/>
						</svg>
					</a>
				</li>
			</ul>
		</nav>
	</div>

	<div class="w-full mt-8 lg:mt-0 lg:w-4/12 lg:pl-4">
		<div class="bg-gray-800 rounded-3xl px-6 pt-6">
			<div class="flex text-white text-2xl pb-6 font-bold">
				<p>Client Messages</p>
			</div>
			<div class="border-t solid border-gray-700 p-4 flex 2xl:items-start w-full hover:bg-gray-700">
				<img
					src="https://images.unsplash.com/photo-1533993192821-2cce3a8267d1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fHdvbWFuJTIwbW9kZXJufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
					alt="profile"
					class="object-cover w-10 h-10 rounded-full"
				/>
				<div class="pl-4 w-full">
					<div class="flex items-center justify-between w-full">
						<div class="text-white font-medium">Mark</div>
						<div class="flex justify-center items-center cursor-pointer h-7 w-7">
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
								class="text-white"
							>
								<polygon
									points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
								/>
							</svg>
						</div>
					</div>
					<p class="my-2 text-sm text-gray-400">
						I am really impressed! Can't wait to see the final result.
					</p>
					<p class="text-right text-gray-400 text-sm">Dec, 12</p>
				</div>
			</div>
		</div>
	</div>
</div>
