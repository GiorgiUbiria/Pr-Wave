import type { Post } from '$lib/types'

export async function load({ fetch }: any) {
	const response = await fetch('/blog/api/posts')
	const posts: Post[] = await response.json()
	return { posts }
}
