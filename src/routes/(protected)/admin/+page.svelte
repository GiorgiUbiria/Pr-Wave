<section
	class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 place-self-center"
>
	<h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">ადმინის პანელზე გადასასვლელად გაიარეთ ავტორიზაცია</h2>

	<form method="POST">
		<div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
			<div>
				<label class="text-gray-700 dark:text-gray-200" for="email">მეილი</label>
				<input
					id="email"
					name="email"
					type="email"
					class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
				/>
			</div>

			<div>
				<label class="text-gray-700 dark:text-gray-200" for="password">პაროლი</label>
				<input
					id="password"
					name="password"
					type="password"
					class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
				/>
			</div>

			<div>
				<label class="text-gray-700 dark:text-gray-200" for="passwordConfirmation"
					>პაროლის დამოწმება</label
				>
				<input
					id="passwordConfirmation"
					name="passwordConfirmation"
					type="password"
					class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
				/>
			</div>
		</div>

		<div class="flex justify-end mt-6">
			<button
				type="submit"
				class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
				>შესვლა</button
			>
		</div>
	</form>
</section>
