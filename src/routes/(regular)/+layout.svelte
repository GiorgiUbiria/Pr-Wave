<script lang="ts">
	import '../../app.css';

	import Footer from './components/LandingPage/Footer.svelte';
	import Nav from './components/LandingPage/Nav.svelte';

	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div
	class="leading-normal tracking-normal text-white gradient"
	style="font-family: 'Source Sans Pro', sans-serif;"
>
	<Nav user={data?.session?.user} />
	<slot />
	<Footer />
</div>

<style lang="postcss">
	.gradient {
		background-image: linear-gradient(to right, #344955, #50727b);
	}
</style>
