import type { PageServerLoad } from "../../$types";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    async function getServicesFromSupabase() {
        try {
            let { data: services, error } = await supabase
                .from('services')
                .select(`
            service_name,
            isactive
      `)
            if (error) {
                throw (error)
            }

            return services
        } catch (error) {
            fail(403)
        }
    }

    return {
        services: await getServicesFromSupabase()
    }
}
