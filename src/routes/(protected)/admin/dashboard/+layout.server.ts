import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals: { supabase } }) => {
    const userFetch = await supabase.auth.getUser();

    if (!userFetch.data.user) {
        console.log("There's no user")
        redirect(303, "/about")
    }
}
