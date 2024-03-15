<script lang="ts">
	import { page } from '$app/stores';
	import type { User } from '@supabase/supabase-js';

	export let user: User | undefined;

	let isOpen = false;

	function toggleMenu() {
		isOpen = !isOpen;
	}
</script>

<nav class="border-gray-200 dark:bg-gray-900">
	<div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
		<a href="http://localhost:5173/" class="flex items-center space-x-3 rtl:space-x-reverse">
			<img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="PR Wave Logo" />
			<span class="self-center text-2xl font-semibold whitespace-nowrap text-white"
				>PR WAVE</span
			>
		</a>
		<button
			data-collapse-toggle="navbar-default"
			on:click={toggleMenu}
			type="button"
			class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
			aria-controls="navbar-default"
			aria-expanded={isOpen}
		>
			<span class="sr-only">Open navigation bar</span>
			<svg
				class="w-5 h-5"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 17 14"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M1 1h15M1 7h15M1 13h15"
				/>
			</svg>
		</button>
		<div class="{isOpen ? '' : 'hidden'} w-full md:block md:w-auto" id="navbar-default">
			<ul
				class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-transparent md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700"
			>
				{#if user !== undefined}
					<li>
						<a
							href="/admin/dashboard"
							class="text-white"
							aria-current={$page.url.pathname === '/admin/dashboard'}
							on:click={toggleMenu}
						>
							Dashboard
						</a>
					</li>
				{/if}
				<li>
					<a
						href="/blogs"
						aria-current={$page.url.pathname === '/blogs'}
						on:click={toggleMenu}
						class={$page.url.pathname === '/blogs'
							? 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500'
							: 'block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}
					>
						Blogs
					</a>
				</li>
				<li>
					<a
						href="/about"
						aria-current={$page.url.pathname === '/about'}
						on:click={toggleMenu}
						class={$page.url.pathname === '/about'
							? 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500'
							: 'block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}
					>
						About
					</a>
				</li>
				<li>
					<a
						href="/contact_us"
						aria-current={$page.url.pathname === '/contact_us'}
						on:click={toggleMenu}
						class={$page.url.pathname === '/contact_us'
							? 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500'
							: 'block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}
					>
						Blogs
					</a>
				</li>
			</ul>
		</div>
	</div>
</nav>
