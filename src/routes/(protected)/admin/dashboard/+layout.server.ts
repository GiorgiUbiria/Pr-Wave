import type { LayoutServerLoad } from "./$types";
import { goto } from "$app/navigation";

export const load: LayoutServerLoad = async ({ locals: { supabase } }) => {
    const userFetch = await supabase.auth.getUser();

    if (!userFetch.data.user) {
        console.log("There's no user")
        goto("/")
    }
}
