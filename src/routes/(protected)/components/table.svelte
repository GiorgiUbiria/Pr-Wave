<script lang="ts">
	export let rows: any[];
	export let cols: any[];
</script>

<div class="flex flex-col">
	<div class="overflow-x-scroll sm:-mx-6 lg:-mx-8">
		<div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
			<div class="overflow-hidden">
				<div class="max-w-full overflow-x-auto">
					<table class="min-w-full text-left text-sm font-light text-surface dark:text-white">
						<thead class="border-b border-neutral-200 font-medium dark:border-white/10">
							<tr>
								<th scope="col" class="px-6 py-4"></th>
								{#each cols as column}
									<th scope="col" class="px-6 py-4">{column.title}</th>
								{/each}
							</tr>
						</thead>
						<tbody>
							{#each rows as row, i}
								<tr
									class="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600"
								>
									<td class="whitespace-nowrap px-6 py-4 font-medium">{i + 1}</td>
									{#each cols as column}
										<td class="whitespace-nowrap px-6 py-4">{row[column.field]}</td>
									{/each}
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
