import { FileWithPath } from "react-dropzone"

export type FileWithPreview = FileWithPath & {
  preview: string
}

export type Form = {
  id: string
  name: string
  projectId: string
  pageTitle: string
  introductoryMessage: string
  promt: string
  thankYouMessage: string
  collectRating: boolean
  createdAt: Date
  updatedAt: Date
}

export type Project = {
  id: string
  companyName: string
  companyDescription: string
  companyUrl: string
  companyLogo: string
  projectOwnerId: string
  createdAt: Date
  updatedAt: Date
}

export type Testimonial = {
  id: string
  formId: string
  projectId: string
  customerName: string
  customerEmail: string
  customerProfileImageUrl: string
  customerDesignation: string
  testimonial: string
  rating: number
  createdAt: Date
  updatedAt: Date
}
