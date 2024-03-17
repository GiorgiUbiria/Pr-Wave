import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals: { supabase } }) => {
    const userFetch = await supabase.auth.getUser();

    console.log(userFetch)

    if (!userFetch.data.user) {
        redirect(303, "/")
    }
}
