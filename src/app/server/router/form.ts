import { z } from "zod"

import { createFormSchema, updateFormSchema } from "@/lib/validator"
import { protectedProcedure, router } from "@/app/server/trpc"

export const formRouter = router({
  createForm: protectedProcedure.input(createFormSchema).mutation((opts) => {
    console.log(opts.input)
    const newForm = opts.ctx.db.form.create({
      data: {
        name: opts.input.name,
        projectId: opts.input.projectId,
        pageTitle: opts.input.pageTitle,
        introductoryMessage: opts.input.introductoryMessage,
        promt: opts.input.promt,
        thankYouMessage: opts.input.thankYouMessage,
        collectRating: opts.input.collectRating,
      },
    })

    console.log("newForm", newForm)

    if (!newForm) {
      throw new Error("Error creating project")
    }

    return newForm
  }),

  getFormById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query((opts) => {
      // get project by id
      const form = opts.ctx.db.form.findFirst({
        where: {
          id: opts.input.id,
        },
      })

      if (!form) {
        throw new Error("Error getting project")
      }

      return form
    }),

  updateFormDetails: protectedProcedure
    .input(updateFormSchema)
    .mutation((opts) => {
      const updatedForm = opts.ctx.db.form.update({
        where: {
          id: opts.input.id,
        },
        data: {
          name: opts.input.name,
          projectId: opts.input.projectId,
          pageTitle: opts.input.pageTitle,
          introductoryMessage: opts.input.introductoryMessage,
          promt: opts.input.promt,
          thankYouMessage: opts.input.thankYouMessage,
          collectRating: opts.input.collectRating,
        },
      })

      if (!updatedForm) {
        throw new Error("Error updating form")
      }

      return updatedForm
    }),
})
