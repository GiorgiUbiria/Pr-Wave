import type { PageServerLoad } from "../$types";
import { fail, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    const { locals: { supabase } } = event

    const userFetch = await supabase.auth.getUser();

    if (!userFetch.data.user) {
        redirect(303, "/")
    } else {
        const { data: userData, error } = await supabase.from("users").select()

        if (error) {
            return fail(403)
        }

        const validResponse = { user: userFetch.data.user, users: userData }

        return validResponse;
    }
}
