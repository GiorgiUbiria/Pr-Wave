<script lang="ts">
	export let form: any;
</script>

<h2>Auth</h2>

<form method="POST" class="flex flex-col w-64 gap-2">
	<label for="email"> Email </label>
	<input type="email" name="email" id="email" />

	<label for="password"> Password </label>
	<input type="password" name="password" id="password" />

	<button type="submit">Sign In</button>
</form>

{#if form?.error}
	<p class="error">{form.error}</p>
{:else if form?.message}
	<p class="success">{form.message}</p>
{/if}
