/**
 * Shared validators used in both the frontend and backend
 */

import * as z from "zod"

export const createProjectSchema = z.object({
  companyName: z.string().min(1, "Please enter a name"),
  companyDescription: z.string().min(1, "Please enter a description"),
  companyUrl: z.string().url("Must be a valid URL"),
})
export type CreateProject = z.infer<typeof createProjectSchema>
