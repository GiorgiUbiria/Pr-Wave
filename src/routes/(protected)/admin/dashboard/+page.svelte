<script lang="ts">
	import type { PageData } from './$types';

	export let user: PageData;
</script>

<h1>Admin Dashboard</h1>

<h2>{JSON.stringify(user)}</h2>

<a href="/admin/logout">Logout</a>
