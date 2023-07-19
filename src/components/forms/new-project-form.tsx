"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { FileWithPreview } from "@/types"
import { useUser } from "@clerk/nextjs"
import { generateReactHelpers } from "@uploadthing/react/hooks"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

import { trpc } from "@/lib/trpc"
import { isArrayOfFile } from "@/lib/utils"
import { CreateProject } from "@/lib/validator"
import type { OurFileRouter } from "@/app/api/uploadthing/core"

import { FileDialog } from "../file-dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

const { useUploadThing } = generateReactHelpers<OurFileRouter>()

export function NewProjectform() {
  const router = useRouter()
  const { user } = useUser()
  const [files, setFiles] = React.useState<FileWithPreview[] | null>(null)
  const [isPending, startTransition] = React.useTransition()
  const [loading, setLoading] = React.useState<boolean>(false)

  // uploadthing
  const { isUploading, startUpload } = useUploadThing("productImage")

  /**
   * React Hook Form
   */
  const form = useForm<CreateProject>()

  /**
   * TRPC Mutation
   */
  const mutation = trpc.project.createProject.useMutation()

  /**
   * Submit handler
   * @param data
   */

  const onSubmit: SubmitHandler<CreateProject> = async (
    data: CreateProject
  ) => {
    startTransition(async () => {
      setLoading(true)
      try {
        // Upload images if data.images is an array of files
        const images = isArrayOfFile(data.companyLogo)
          ? await startUpload(data.companyLogo).then((res) => {
              const formattedImages = res?.map((image) => ({
                id: image.fileKey,
                name: image.fileKey.split("_")[1] ?? image.fileKey,
                url: image.fileUrl,
              }))
              return formattedImages ?? null
            })
          : null

        // Create project
        const project = await mutation.mutateAsync({
          companyName: data.companyName,
          companyDescription: data.companyDescription,
          companyUrl: data.companyUrl,
          companyLogo: (images?.[0].url as string) ?? null,
          projectOwnerId: user?.id as string,
        })

        // If project is created, redirect to project page
        if (project) {
          setLoading(false)
          toast.success("Project created successfully!")
          router.push(`/project/testimonials/${project.id}`)
        }
      } catch (error) {
        error instanceof Error
          ? toast.error(error.message)
          : toast.error("Something went wrong, please try again.")
      }
    })
  }

  return (
    <>
      <div className="my-10 w-full rounded-md border border-border p-10 px-4 lg:w-2/3">
        <form
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
          className="space-y-8"
        >
          <div>
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              placeholder="e.g. Revel"
              className="mt-2"
              id="companyName"
              {...form.register("companyName", { required: true })}
            />
            {form.formState.errors.companyName &&
            form.formState.errors.companyName?.type === "required" ? (
              <p className="mt-2 text-xs text-destructive">
                *Company name is required
              </p>
            ) : (
              <p className="mt-2 text-xs text-muted-foreground">
                This is your company name
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="companyDescription">
              Tell us something about your company
            </Label>
            <Textarea
              placeholder="e.g. Revel is a company that makes awesome products."
              className="mt-2"
              id="companyDescription"
              {...form.register("companyDescription", { required: true })}
            />
            {form.formState.errors.companyName &&
            form.formState.errors.companyName?.type === "required" ? (
              <p className="mt-2 text-xs text-destructive">
                *Company description is required
              </p>
            ) : (
              <p className="mt-2 text-xs text-muted-foreground">
                This is description about your company
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="companyUrl">Company Website Url</Label>
            <Input
              placeholder="e.g. https://revel.co"
              className="mt-2"
              id="companyUrl"
              {...form.register("companyUrl", { required: true })}
            />
            {form.formState.errors.companyName &&
            form.formState.errors.companyName?.type === "required" ? (
              <p className="mt-2 text-xs text-destructive">
                *Company Website Url is required
              </p>
            ) : (
              <p className="mt-2 text-xs text-muted-foreground">
                This is your company website url
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="companyLogo">Upload Your Company Logo</Label>
            <FileDialog
              setValue={form.setValue}
              name="companyLogo"
              maxFiles={1}
              maxSize={1024 * 1024 * 4}
              files={files}
              setFiles={setFiles}
              isUploading={isUploading}
              disabled={isPending}
            />
          </div>
          <Button type="submit" className="mt-4" disabled={loading}>
            {loading ? "Creating..." : "Create Project"}
          </Button>
        </form>
      </div>
    </>
  )
}
