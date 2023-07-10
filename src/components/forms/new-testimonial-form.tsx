"use client"

import { useContext, useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { FormDetailsContext } from "@/context/formDetailsContext"
import { toast } from "sonner"

import { trpc } from "@/lib/trpc"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "../ui/input"
import { Label } from "../ui/label"

export function NewTestimonialForm({
  projectId,
  formLength,
}: {
  projectId: string
  formLength: number
}) {
  const { state, dispatch } = useContext(FormDetailsContext)
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [loading, setLoading] = useState<boolean>(false)
  const [name, setName] = useState<string>("")

  const mutation = trpc.form.createForm.useMutation()
  const handleSubmit = () => {
    startTransition(async () => {
      setLoading(true)
      try {
        // Create New Form
        const form = await mutation.mutateAsync({
          projectId,
          name: name,
          pageTitle: state.pageTitle,
          promt: state.promt,
          introductoryMessage: state.introMessage,
          thankYouMessage: state.thankYouMessage,
          collectRating: true,
        })

        // If project is created, redirect to project page
        if (form) {
          setLoading(false)
          toast.success("Form created successfully.")
          router.push(`/form/c/${form.id}`)
        }
      } catch (error) {
        error instanceof Error
          ? toast.error(error.message)
          : toast.error("Something went wrong, please try again.")
      }
    })
  }

  console.log(formLength)
  return (
    <>
      {formLength >= 1 ? (
        <Button
          onClick={() =>
            toast.error(
              "As of now, you can only create only one form per project"
            )
          }
          className="w-full"
        >
          Create New
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create New</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a form</DialogTitle>
              <DialogDescription>
                You can create different forms to collect different testimonial
                types.
              </DialogDescription>
            </DialogHeader>
            <Label>Form Name</Label>
            <Input
              placeholder="Enter a form name"
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              onClick={handleSubmit}
              className="w-full"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create a Form"}
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
