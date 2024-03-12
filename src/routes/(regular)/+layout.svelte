<script lang="ts">
	import '../../app.css';
	import Navbar from './components/navbar.svelte';
	import Footer from './components/footer.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="min-h-screen bg-gradient-to-b from-[#344955] to-[#78a08399]">
	<Navbar user={data?.session?.user} />
	<slot />
	<Footer />
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.200);
	}
</style>
