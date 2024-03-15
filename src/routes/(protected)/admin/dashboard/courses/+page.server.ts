import type { PageServerLoad } from "../../$types";
import { fail, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    const { locals: { supabase } } = event

    const { data: courseData, error } = await supabase.from("courses").select()

    if (error) {
        return fail(403)
    }

    const validResponse = { courses: courseData }

    return validResponse;
}
