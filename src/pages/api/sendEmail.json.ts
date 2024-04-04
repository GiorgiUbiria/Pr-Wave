import { APIRoute } from "astro"
import { Resend } from "resend"

const resend = new Resend(
    process.env.RESEND_API_KEY
)

export const GET: APIRoute = async ({ params, request }) => {
    const send = await resend.emails.send({
        from: "ubiriagiorgi8@gmail.com",
        to: "lei85la@gmail.com",
        subject: "Something",
        html: "<p> paragraph </p>",
        text: "Hi",
    })

    if (send.data) {
        return new Response(
            JSON.stringify({
                message: send.data,
            })
        )
    } else {
        return new Response(
            JSON.stringify({
                message: send.error,
            })
        )
    }
}
