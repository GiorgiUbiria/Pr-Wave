import { APIRoute } from "astro"
import { Resend } from "resend"

const resend = new Resend(
    process.env.RESEND_API_KEY
)

export const GET: APIRoute = async ({ params, request }) => {
    const send = await resend.emails.send({
        from: "foryou@prwave.net",
        to: "ubiriagiorgi8@gmail.com",
        subject: "Something",
        html: "<p> paragraph </p>",
        text: "Hi",
    })

    if (send.data) {
        return new Response(
            JSON.stringify({
                message: send.data,
            }),
            {
                status: 200,
                statusText: "OK",
            }
        )
    } else {
        return new Response(
            JSON.stringify({
                message: send.error,
            }),
            {
                status: 500,
                statusText: "Internal Server Error",
            }
        )
    }
}
