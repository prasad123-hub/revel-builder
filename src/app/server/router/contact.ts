import { Resend } from "resend"

import { createContactSchema } from "@/lib/validator"
import { RevelInviteUserEmail } from "@/components/email-template"
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
        subject: `${opts.input.subject} - ${opts.input.name}`,
        react: RevelInviteUserEmail({
          username: opts.input.name,
          message: opts.input.message,
          formId: opts.input.formId,
        }),
      })

      if (!newContact || !emailSent) {
        throw new Error("Error creating contact or sending email")
      }

      return newContact
    }),
})
