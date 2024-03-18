import type { PageServerLoad } from "../../$types";
import { fail } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    const userFetch = await supabase.auth.getUser();

    if (!userFetch.data.user) {
        redirect(303, "/")
    }

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
