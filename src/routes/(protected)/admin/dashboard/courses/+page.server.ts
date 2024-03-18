import type { PageServerLoad } from "../../$types";
import { fail, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    const userFetch = await supabase.auth.getUser();

    if (!userFetch.data.user) {
        redirect(303, "/")
    }

    async function getCoursesFromSupabase() {
        try {
            let { data: courses, error } = await supabase
                .from('courses')
                .select(`
                    course_name,
                    start_date,
                    end_date,
                    isactive
              `)

            if (error) {
                throw (error)
            }

            return courses
        } catch (error) {
            fail(403)
        }
    }

    return {
        courses: await getCoursesFromSupabase()
    }
}
