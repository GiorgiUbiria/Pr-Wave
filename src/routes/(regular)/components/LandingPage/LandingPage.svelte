<script lang="ts">
	import Hero from './Hero.svelte';
	import Features from './Features.svelte';
	import Cards from './Cards.svelte';
	import Pricing from './Pricing.svelte';
	import CallToAction from './CallToAction.svelte';
</script>

<div>
	<Hero />

	<Features />

	<Cards />

	<Pricing />

	<CallToAction />
</div>

<style>
	.gradient {
		background-image: linear-gradient(to right, #ff69b4, #ffff00);
		/* Replace #ff69b4 with the desired shade of pink
       and #ffff00 with the desired shade of yellow */
	}
</style>
