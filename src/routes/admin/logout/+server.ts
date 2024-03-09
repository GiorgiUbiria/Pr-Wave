import { fail, redirect } from '@sveltejs/kit';

export const GET = async (event: any) => {
    const { locals: { supabase } } = event

    const userFetch = await supabase.auth.getUser();

    if (!userFetch.data.user) {
        fail(401);
    }

    const { error } = await supabase.auth.signOut();

    if (error) {
        fail(401);
    } else {
        redirect(302, "/")
    }
};
