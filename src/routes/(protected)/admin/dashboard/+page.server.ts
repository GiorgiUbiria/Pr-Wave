import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const prerender = true

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    const userFetch = await supabase.auth.getUser();

    if (!userFetch.data.user) {
        redirect(303, "/")
    }
}
