<script lang="ts">
	import { page } from '$app/stores';

	const id: string = $page.params.id;
</script>

<div class="w-full h-screen mx-auto flex flex-col lg:flex-row pt-8">
	<div class="w-full lg:w-7/10 border-black border flex flex-col place-items-center">
		<h2 class="text-white text-2xl pb-2">Course Name</h2>
		<video class="w-1/2" controls>
			<source
				src="https://static.videezy.com/system/resources/previews/000/004/862/original/Flare_Logo_Reveal_Animation.mp4"
				type="video/mp4"
			/>
			Your browser does not support the video tag.
		</video>
	</div>
	<div class="w-full lg:w-3/10 border-red-800 border flex flex-col place-items-center">
		<section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
			<h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">
				Register on Course
			</h2>

			<form>
				<div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
					<div>
						<label class="text-gray-700 dark:text-gray-200" for="username">Username</label>
						<input
							id="username"
							type="text"
							class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
						/>
					</div>

					<div>
						<label class="text-gray-700 dark:text-gray-200" for="emailAddress">Email Address</label>
						<input
							id="emailAddress"
							type="email"
							class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
						/>
					</div>

					<div>
						<label class="text-gray-700 dark:text-gray-200" for="password">Password</label>
						<input
							id="password"
							type="password"
							class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
						/>
					</div>

					<div>
						<label class="text-gray-700 dark:text-gray-200" for="passwordConfirmation"
							>Password Confirmation</label
						>
						<input
							id="passwordConfirmation"
							type="password"
							class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
						/>
					</div>
				</div>

				<div class="flex justify-end mt-6">
					<button
						class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
						>Save</button
					>
				</div>
			</form>
		</section>
	</div>
</div>
