import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals: { supabase } }) => {
    const userFetch = await supabase.auth.getUser();
    const userSession = await supabase.auth.getSession();

    if (!userFetch.data.user) {
        console.log("There's no user")
        console.log("User: ", userFetch)
        console.log("Session: ", userSession)
    }
}
