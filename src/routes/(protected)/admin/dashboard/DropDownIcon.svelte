<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
</script>

<span class="block relative">
	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild let:builder>
			<Button builders={[builder]}>
				<img
					src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
					class="w-10 h-10 rounded-full"
					alt="Rounded avatar"
				/>
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="w-56">
			<DropdownMenu.Label>ლეილა ბერძენიშვილი</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Item>
				<form action="/admin/logout" method="POST">
					<button type="submit">გამოსვლა ანგარიშიდან</button>
				</form>
				<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</span>
