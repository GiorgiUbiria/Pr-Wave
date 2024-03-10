<script>
	import { closeSidebar, sidebarOpen } from './store';
</script>

<button
	on:click={closeSidebar}
	class={$sidebarOpen
		? 'bg-black fixed h-screen left-0 opacity-40 top-0 w-screen z-30 lg:bg-transparent'
		: ''}
/>
