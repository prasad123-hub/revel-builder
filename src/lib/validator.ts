/**
 * Shared validators used in both the frontend and backend
 */

import * as z from "zod"

export const createProjectSchema = z.object({
  companyName: z.string().min(1, "Please enter a name"),
  companyDescription: z.string().min(1, "Please enter a description"),
  companyUrl: z.string().url("Must be a valid URL"),
  companyLogo: z.string(),
  projectOwnerId: z.string(),
})
export type CreateProject = z.infer<typeof createProjectSchema>

export const createFormSchema = z.object({
  name: z.string().min(1, "Please enter a name"),
  projectId: z.string(),
  pageTitle: z.string(),
  introductoryMessage: z.string(),
  promt: z.string(),
  thankYouMessage: z.string(),
  collectRating: z.boolean(),
})
export type CreateForm = z.infer<typeof createFormSchema>

export const updateFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Please enter a name"),
  projectId: z.string(),
  pageTitle: z.string(),
  introductoryMessage: z.string(),
  promt: z.string(),
  thankYouMessage: z.string(),
  collectRating: z.boolean(),
})

export type UpdateForm = z.infer<typeof updateFormSchema>

export const createResponseSchema = z.object({
  formId: z.string(),
  projectId: z.string(),
  rating: z.number(),
  testimonial: z.string(),
  customerEmail: z.string(),
  customerName: z.string(),
  customerDesignation: z.string(),
  customerProfileImageUrl: z.string(),
})

export type CreateResponse = z.infer<typeof createResponseSchema>

export const createContactSchema = z.object({
  name: z.string(),
  email: z.string(),
  projectId: z.string(),
  subject: z.string(),
  message: z.string(),
  formId: z.string(),
})

export type CreateContact = z.infer<typeof createContactSchema>
