import { json } from '@sveltejs/kit'
import { getPostsData } from '$lib/posts'

export async function GET() {
    const posts = await getPostsData()
    return json(posts)
}
