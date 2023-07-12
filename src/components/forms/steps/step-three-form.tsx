"use client"

import React, { useContext, useState, useTransition } from "react"
import Image from "next/image"
import { FormDetailsContext } from "@/context/formDetailsContext"
import { FileWithPreview } from "@/types"
import { generateReactHelpers } from "@uploadthing/react/hooks"
import { ArrowLeft } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

import { trpc } from "@/lib/trpc"
import { isArrayOfFile } from "@/lib/utils"
import { CreateResponse } from "@/lib/validator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ProfileImageUploader } from "@/components/profile-image-uploader"
import { OurFileRouter } from "@/app/api/uploadthing/core"

interface StepThreeFormProps {
  readOnly?: boolean
  projectId?: string
  formId?: string
}

const { useUploadThing } = generateReactHelpers<OurFileRouter>()

export function StepThreeForm({
  readOnly,
  projectId,
  formId,
}: StepThreeFormProps) {
  const { state, dispatch } = useContext(FormDetailsContext)
  const [files, setFiles] = useState<FileWithPreview[] | null>(null)
  const [isPending, startTransition] = useTransition()
  const [loading, setLoading] = useState<boolean>(false)

  // uploadthing
  const { isUploading, startUpload } = useUploadThing("productImage")

  /**
   * React Hook Form
   */
  const form = useForm<CreateResponse>()

  /**
   * TRPC Mutation
   */
  const mutation = trpc.response.createResponse.useMutation()

  /**
   * Submit handler
   * @param data
   */

  const onSubmit: SubmitHandler<CreateResponse> = async (
    data: CreateResponse
  ) => {
    startTransition(async () => {
      setLoading(true)
      try {
        // Upload images if data.images is an array of files
        const images = isArrayOfFile(data.customerProfileImageUrl)
          ? await startUpload(data.customerProfileImageUrl).then((res) => {
              const formattedImages = res?.map((image) => ({
                id: image.fileKey,
                name: image.fileKey.split("_")[1] ?? image.fileKey,
                url: image.fileUrl,
              }))
              return formattedImages ?? null
            })
          : null

        console.log("profile", images)

        // Create project
        const response = await mutation.mutateAsync({
          formId: formId as string,
          projectId: projectId as string,
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          customerProfileImageUrl: (images?.[0].url as string) ?? "",
          customerDesignation: data.customerDesignation,
          testimonial: state.customerResponse.testimonialText,
          rating: state.customerResponse.testimonialRating,
        })

        // If project is created, redirect to project page
        if (response) {
          setLoading(false)
          dispatch({ type: "details/step4" })
          toast.success("Your Response has been submitted successfully.")
        }
      } catch (error) {
        error instanceof Error
          ? toast.error(error.message)
          : toast.error("Something went wrong, please try again.")
      }
    })
  }

  return (
    <div className="relative mx-auto w-full max-w-lg rounded-xl border border-border bg-white px-8 py-6 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
      <div className="flex items-center justify-between">
        <Image
          src={state.companyLogo || "/revel.svg"}
          alt={state.companyName || "compnayName"}
          width={40}
          height={40}
          className="h-8 w-auto object-cover"
        />
        <Button
          onClick={() => dispatch({ type: "details/step2" })}
          variant="outline"
          size="sm"
          disabled={readOnly}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
      </div>
      <h4 className="mt-8 font-cal text-2xl font-bold">Almost Done 🙌🏻</h4>
      <form
        action=""
        className="w-full"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <div className="mt-4">
          <Label htmlFor="customerName">Your Name</Label>
          <Input
            placeholder="e.g. John Doe"
            className="mt-2"
            id="customerName"
            {...form.register("customerName", { required: true })}
          />
          {form.formState.errors.customerName &&
          form.formState.errors.customerName?.type === "required" ? (
            <p className="mt-2 text-xs text-destructive">* name is required</p>
          ) : (
            <p className="mt-2 text-xs text-muted-foreground">
              This is your name
            </p>
          )}
        </div>

        <div className="mt-4">
          <Label htmlFor="customerEmail">Your Email</Label>
          <Input
            placeholder="e.g. john@gmail.com"
            className="mt-2"
            id="customerEmail"
            {...form.register("customerEmail", { required: true })}
          />
          {form.formState.errors.customerEmail &&
          form.formState.errors.customerEmail?.type === "required" ? (
            <p className="mt-2 text-xs text-destructive">*email is required</p>
          ) : (
            <p className="mt-2 text-xs text-muted-foreground">
              This is your email address
            </p>
          )}
        </div>

        <div className="mt-4">
          <Label htmlFor="customerProfileImageUrl">Your Photo</Label>
          <ProfileImageUploader
            id="customerProfileImageUrl"
            name="customerProfileImageUrl"
            maxFiles={1}
            maxSize={1024 * 1024 * 4}
            setValue={form.setValue}
            files={files}
            setFiles={setFiles}
            isUploading={isUploading}
            disabled={isPending || readOnly}
          />
        </div>

        <div className="mt-4">
          <Label htmlFor="customerDesignation">Your Designation</Label>
          <Input
            placeholder="e.g. CEO"
            className="mt-2"
            id="customerDesignation"
            {...form.register("customerDesignation", { required: true })}
          />
          {form.formState.errors.customerDesignation &&
          form.formState.errors.customerDesignation?.type === "required" ? (
            <p className="mt-2 text-xs text-destructive">
              *Designation is required
            </p>
          ) : (
            <p className="mt-2 text-xs text-muted-foreground">
              This is your Designation
            </p>
          )}
        </div>

        <Button
          disabled={readOnly || loading || isPending}
          className={`mt-8 w-full ${
            readOnly ? "cursor-not-allowed disabled:opacity-100" : ""
          }`}
        >
          {loading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="mr-2 h-4 w-4 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
      <span className="absolute -top-4 right-6 inline-flex items-center rounded-full border border-border bg-white px-4 py-1">
        <Image
          src="/revel.svg"
          alt="Revel Logo"
          width={16}
          height={16}
          className="mr-2 h-4 w-auto object-cover"
        />
        <span className="text-sm font-medium">Powered by Revel</span>
      </span>
    </div>
  )
}
