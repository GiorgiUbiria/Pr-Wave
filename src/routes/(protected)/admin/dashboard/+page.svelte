<script lang="ts">
	import type { PageData } from './$types';
	import Content from '../../components/Content.svelte';

	export let user: PageData;
</script>

<svelte:head>
	<title>Admin Dashboard for PR WAVE Website</title>
</svelte:head>

<Content title="Home" />
