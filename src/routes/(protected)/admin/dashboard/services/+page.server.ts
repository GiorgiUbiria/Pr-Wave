import type { PageServerLoad } from "../../$types";
import { fail, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    const { locals: { supabase } } = event

    const { data: serviceData, error } = await supabase.from("services").select()

    if (error) {
        return fail(403)
    }

    const validResponse = { services: serviceData }

    return validResponse;
}
