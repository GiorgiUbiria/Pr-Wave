import type { PageServerLoad } from "../$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    const { locals: { supabase } } = event

    const userFetch = await supabase.auth.getUser();

    if (!userFetch.data.user) {
        redirect(303, "/")
    } else {
        return {
            user: userFetch.data.user
        }
    }
}
