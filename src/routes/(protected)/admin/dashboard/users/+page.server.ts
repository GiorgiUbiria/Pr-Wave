import type { PageServerLoad } from "../../$types";
import { fail, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    const { locals: { supabase } } = event

    const { data: userData, error } = await supabase.from("users").select()

    if (error) {
        return fail(403)
    }

    const validResponse = { users: userData }

    return validResponse;
}
