import { z } from "zod"

import { createResponseScheme } from "@/lib/validator"
import { procedure, protectedProcedure, router } from "@/app/server/trpc"

export const responseRouter = router({
  createResponse: procedure.input(createResponseScheme).mutation((opts) => {
    console.log(opts.input)
    const newResponse = opts.ctx.db.response.create({
      data: {
        formId: opts.input.formId,
        projectId: opts.input.projectId,
        rating: opts.input.rating,
        testimonial: opts.input.testimonial,
        customerEmail: opts.input.customerEmail,
        customerName: opts.input.customerName,
        customerDesignation: opts.input.customerDesignation,
        customerProfileImageUrl: opts.input.customerProfileImageUrl,
      },
    })
    if (!newResponse) {
      throw new Error("Error creating response")
    }

    return newResponse
  }),

  getResponsesByFormId: protectedProcedure
    .input(z.object({ formId: z.string() }))
    .query((opts) => {
      // get project by id
      const response = opts.ctx.db.response.findMany({
        where: {
          formId: opts.input.formId,
        },
      })

      if (!response) {
        throw new Error("Error getting response")
      }

      return response
    }),
})
