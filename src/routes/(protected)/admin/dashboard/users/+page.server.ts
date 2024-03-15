import type { PageServerLoad } from "../../$types";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    async function getUsersFromSupabase() {
        try {
            let { data: users, error } = await supabase
                .from('users')
                .select(`
                    first_name,
                    last_name,
                    mail,
                    phone_number
              `)

            if (error) {
                throw (error)
            }

            return users
        } catch (error) {
            fail(403)
        }
    }

    return {
        users: await getUsersFromSupabase()
    }
}
