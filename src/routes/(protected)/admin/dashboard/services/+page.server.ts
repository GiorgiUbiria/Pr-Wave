import type { PageServerLoad } from "../../$types";
import { fail, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    const { locals: { supabase } } = event

    const userFetch = await supabase.auth.getUser();

    if (!userFetch.data.user) {
        redirect(303, "/")
    } else {
        const { data: serviceData, error } = await supabase.from("services").select()

        if (error) {
            return fail(403)
        }

        const validResponse = { user: userFetch.data.user, services: serviceData }

        return validResponse;
    }
}
