export const prerender = true;

import { fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    const { locals: { supabase } } = event

    const userFetch = await supabase.auth.getUser();

    if (userFetch.data.user) {
        redirect(303, "/admin/dashboard")
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

        return {
            message: "success"
        }
    }
}
