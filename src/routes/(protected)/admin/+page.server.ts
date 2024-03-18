import { fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { redirect } from "@sveltejs/kit";
import { goto } from "$app/navigation";

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    const userFetch = await supabase.auth.getUser();

    if (userFetch.data.user) {
        console.log("User exists")
        goto("admin/dashboard")
    }
}

export const actions: Actions = {
    default: async (event) => {
        const { request, locals: { supabase } } = event

        const formData = await request.formData()
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const passwordConfirmation = formData.get('passwordConfirmation') as string

        if (passwordConfirmation != password) {
            return fail(422, {
                error: "Passwords don't match"
            })
        }

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            return fail(422, {
                error: error.message
            });
        }

        redirect(303, "/blogs")
    }
}
