import { z } from "zod"

import { db } from "@/lib/db"
import { CreateProject, createProjectSchema } from "@/lib/validator"
import { procedure, protectedProcedure, router } from "@/app/server/trpc"

export const projectRouter = router({
  createProject: protectedProcedure
    .input(createProjectSchema)
    .mutation((opts) => {
      const newProject = opts.ctx.db.project.create({
        data: {
          companyName: opts.input.companyName,
          companyDescription: opts.input.companyDescription,
          companyUrl: opts.input.companyUrl,
          companyLogo: opts.input.companyLogo,
          projectOwnerId: opts.input.projectOwnerId,
        },
      })

      if (!newProject) {
        throw new Error("Error creating project")
      }

      return newProject
    }),

  getProjectById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query((opts) => {
      // get project by id
      const project = opts.ctx.db.project.findMany({
        where: {
          id: opts.input.id,
        },
      })

      if (!project) {
        throw new Error("Error getting project")
      }

      return project
    }),
})
