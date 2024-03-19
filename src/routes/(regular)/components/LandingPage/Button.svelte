<script lang="ts">
	export let primary = true;
	export let secondary = false;
	export let center = true;
	if (secondary) primary = false;
</script>

<div class:flex={center} class="items-center justify-center">
	<button
		class={`
  ${primary && 'text-gray-800 bg-white'}
  ${secondary && 'text-gray-50 gradient'}
  mx-auto lg:mx-0 hover:underline font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out
  `}
	>
		<slot>Click me!</slot>
	</button>
</div>

<style>
	.gradient {
		background-image: linear-gradient(to right, #344955, #50727B);
	}
</style>
