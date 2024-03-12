<script lang="ts">
	import { page } from '$app/stores';
	import type { User } from '@supabase/supabase-js';

	export let user: User | undefined;
</script>

<nav
	class="flex flex-col md:container mx-auto gap-4 md:gap-0 px-6 py-8 md:py-4 md:flex md:flex-row justify-between items-center"
>
	<a
		href="/"
		aria-current={$page.url.pathname === '/'}
		class="text-white text-2xl md:text-4xl font-bold">PR WAVE</a
	>
	<div class="flex space-x-4">
		{#if user !== undefined}
			<a
				href="/admin/dashboard"
				aria-current={$page.url.pathname === '/admin/dashboard'}
				class="text-white hover:text-gray-300">DASHBOARD</a
			>
		{/if}
		<a
			href="/courses"
			aria-current={$page.url.pathname === '/courses'}
			class="text-white hover:text-gray-300">COURSES</a
		>
		<a
			href="/services"
			aria-current={$page.url.pathname === '/services'}
			class="text-white hover:text-gray-300">SERVICES</a
		>
		<a
			href="/blogs"
			aria-current={$page.url.pathname === '/blogs'}
			class="text-white hover:text-gray-300">BLOGS</a
		>
		<a
			href="/about"
			aria-current={$page.url.pathname === '/about'}
			class="text-white hover:text-gray-300">ABOUT</a
		>
	</div>
</nav>
