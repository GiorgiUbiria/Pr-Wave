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
			<DropdownMenu.Label>My Account</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Group>
				<DropdownMenu.Item>
					Profile
					<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					Billing
					<DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					Settings
					<DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					Keyboard shortcuts
					<DropdownMenu.Shortcut>⌘K</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<DropdownMenu.Group>
				<DropdownMenu.Item>Team</DropdownMenu.Item>
				<DropdownMenu.Sub>
					<DropdownMenu.SubTrigger>Invite users</DropdownMenu.SubTrigger>
					<DropdownMenu.SubContent>
						<DropdownMenu.Item>Email</DropdownMenu.Item>
						<DropdownMenu.Item>Message</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>More...</DropdownMenu.Item>
					</DropdownMenu.SubContent>
				</DropdownMenu.Sub>
				<DropdownMenu.Item>
					New Team
					<DropdownMenu.Shortcut>⌘+T</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<DropdownMenu.Item>GitHub</DropdownMenu.Item>
			<DropdownMenu.Item>Support</DropdownMenu.Item>
			<DropdownMenu.Item>API</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item>
                <!-- TODO: Fix the logout not working in this scenario -->
				<a href="/admin/logout">Log out</a>
				<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</span>
