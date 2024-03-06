<script lang="ts">
	import { writable, get } from 'svelte/store';

	const info = [
		{
			title: 'Exciting Courses',
			content: 'Learn new, valuable things that will help you pave your path in this profession.',
			route: '/courses'
		},
		{
			title: 'Valuable Services',
			content:
				'Want to expand your business? Help people discover you? You are on a right path. We will help you achieve that.',
			route: '/services'
		},
		{
			title: 'Interesting Blogs',
			content: 'Read interesting blogs about everything.',
			route: '/blogs'
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

	setInterval(changeInfo, 5000);

	$: if (get(currentIndex) === info.length - 1) {
		setTimeout(() => {
			currentIndex.set(0);
		}, 500);
	}
</script>

<div class="container mx-auto px-6 py-16 flex flex-col items-center justify-center text-white">
	{#each info as { title, content, route }, i (title)}
		<div class="carousel-item {$currentIndex == i ? 'visible' : ''} text-center">
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
				class="w-2.5 h-2.5 bg-white rounded-full {$currentIndex == i ? 'animate-pulse' : ''}"
				on:click={(e) => changeIndex(i)}
				aria-label="change view"
			></button>
		{/each}
	</div>
	<div class="py-8 flex flex-col container mx-auto px-6 md:grid md:grid-cols-2 gap-4">
		<div class="flex flex-col gap-4">
			<img
				src="https://img.graphicsurf.com/2020/10/social-media-vector-flat-illustration.jpg"
				alt="Social Media Marketing Illustration"
				class="mx-auto"
				width="500"
				height="300"
				style="aspect-ratio: 500 / 300; object-fit: cover;"
			/>
			<img
				src="https://img.graphicsurf.com/2020/10/social-media-vector-flat-illustration.jpg"
				alt="Social Media Marketing Illustration"
				class="mx-auto"
				width="500"
				height="300"
				style="aspect-ratio: 500 / 300; object-fit: cover;"
			/>
		</div>
		<div class="flex flex-col gap-4">
			<img
				src="https://img.graphicsurf.com/2020/10/social-media-vector-flat-illustration.jpg"
				alt="Social Media Marketing Illustration"
				class="mx-auto"
				width="500"
				height="300"
				style="aspect-ratio: 500 / 300; object-fit: cover;"
			/>
			<img
				src="https://img.graphicsurf.com/2020/10/social-media-vector-flat-illustration.jpg"
				alt="Social Media Marketing Illustration"
				class="mx-auto"
				width="500"
				height="300"
				style="aspect-ratio: 500 / 300; object-fit: cover;"
			/>
		</div>
	</div>
</div>

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
