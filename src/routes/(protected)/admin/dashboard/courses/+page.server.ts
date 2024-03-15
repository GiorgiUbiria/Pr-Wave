import type { PageServerLoad } from "../../$types";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
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
