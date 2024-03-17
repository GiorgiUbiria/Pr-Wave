<script lang="ts">
	import { writable, get } from 'svelte/store';

    import Services from "./components/services.svelte"
    import Courses from "./components/courses.svelte"

	const info = [
		{
			title: 'Exciting Courses',
			content: 'Learn new, valuable things that will help you pave your path in this profession.',
			route: '#courses'
		},
		{
			title: 'Valuable Services',
			content:
				'Want to expand your business? Help people discover you? You are on a right path. We will help you achieve that.',
			route: '#services'
		},
		{
			title: 'Interesting Blogs',
			content: 'Read interesting blogs about everything.',
			route: '#blogs'
		}
	];

	const currentIndex = writable(0);

	function changeInfo() {
		const index = get(currentIndex);
		const newIndex = (index + 1) % info.length;
		currentIndex.set(newIndex);
	}

	function changeIndex(i: number) {
		currentIndex.set(i);
	}

	setInterval(changeInfo, 50000);

	$: if (get(currentIndex) === info.length - 1) {
		setTimeout(() => {
			currentIndex.set(0);
		}, 5000);
	}
</script>

<div class="container mx-auto px-6 py-16 flex flex-col items-center justify-center text-white">
	{#each info as { title, content, route }, i (title)}
		<div class="carousel-item text-center {$currentIndex == i ? 'visible' : ''}">
			<h1 class="text-5xl font-bold transition-all">{title}</h1>
			<p class="mt-4 text-xl transition-all">{content}</p>
			<a
				class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none
					focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10
					px-4 py-2 mt-6 bg-yellow-400 text-gray-800 hover:bg-yellow-500"
				href={route}
			>
				READ MORE
			</a>
		</div>
	{/each}
	<div class="mt-4 flex space-x-2">
		{#each info as _, i}
			<button
				class="w-2.5 h-2.5 rounded-full {$currentIndex == i
					? 'animate-pulse bg-white'
					: 'bg-gray-400'}"
				on:click={(e) => changeIndex(i)}
				aria-label="change view"
			></button>
		{/each}
	</div>
</div>

<Services />
<Courses />

<style>
	.carousel-item {
		display: none;
		opacity: 0;
		transition: opacity 2s ease-in-out;
	}

	.carousel-item.visible {
		opacity: 1;
		display: block;
	}
</style>
