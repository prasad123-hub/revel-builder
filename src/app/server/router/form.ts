import { z } from "zod"

import { createFormSchema } from "@/lib/validator"
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
})
