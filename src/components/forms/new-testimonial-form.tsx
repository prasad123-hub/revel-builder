"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
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

export function NewTestimonialForm({ projectId }: { projectId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [name, setName] = useState<string>("")

  const mutation = trpc.form.createForm.useMutation()
  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await mutation.mutateAsync({
        name: "Testimonial Form",
        pageTitle: "Share a testimonial!",
        introductoryMessage:
          "We genuinely value your feedback and the opportunity to serve you better. Thank you in advance for taking the time to share your thoughts. Your testimonial will not only make a difference to us but also assist others in making informed decisions about our products/services.",
        collectRating: true,
        promt:
          "Overall, what would you say is the biggest value or advantage of using our product/service?",
        thankYouMessage:
          "Thank you so much for your support! We appreciate your support and we hope you enjoy using our product.",
        projectId: projectId as string,
      })

      if (res) {
        setLoading(false)
        toast.success("Form created successfully")
        router.push(`/form/c/${res.id}`)
      }
    } catch (error) {
      setLoading(false)
      toast.error("Something went wrong")
      router.refresh()
    }
  }

  return (
    <>
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
          <Button onClick={handleSubmit} className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create a Form"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
