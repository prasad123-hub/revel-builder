import { Resend } from "resend"

import { createContactSchema } from "@/lib/validator"
import { procedure, protectedProcedure, router } from "@/app/server/trpc"

const resend = new Resend(process.env.RESEND_API_KEY)

export const contactRouter = router({
  createResponse: procedure
    .input(createContactSchema)
    .mutation(async (opts) => {
      const newContact = opts.ctx.db.contact.create({
        data: {
          projectId: opts.input.projectId,
          name: opts.input.name,
          email: opts.input.email,
        },
      })

      const emailSent = await resend.emails.send({
        from: "noreply@revel.npmstack.com",
        to: opts.input.email,
        subject: "Revel - Thank you for your interest",
        html: "<p>Thank you for your interest in Revel. We will get back to you shortly.</p>",
      })

      if (!newContact || !emailSent) {
        throw new Error("Error creating contact or sending email")
      }

      return newContact
    }),
})
