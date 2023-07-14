"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { trpc } from "@/lib/trpc"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { RevelInviteUserEmail } from "./email-template"
import { Textarea } from "./ui/textarea"

export function InviteEditor({
  projectId,
  formId,
}: {
  projectId: string
  formId: string
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("Share your feedback with us")
  const [message, setMessage] = useState(
    "Got a quick minute? We'd love to hear your thoughts! Your feedback helps us make sure we're delivering the best experience possible."
  )

  const mutation = trpc.contact.createResponse.useMutation()

  const handleSubmit = async () => {
    if (!formId) {
      toast.error("Please create a form")
      return
    }

    setLoading(true)
    const res = await mutation.mutateAsync({
      projectId: projectId as string,
      name,
      email,
      subject,
      message,
      formId,
    })
    if (res) {
      // close sheet when invite is sent

      router.push(`/project/contact/${projectId}`)
      router.refresh()
      toast.success("Invitation sent!")
    }
    setName("")
    setEmail("")
    setLoading(false)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Invite</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll pb-10 sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Invite your customer</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-3 space-y-3">
          <div className="flex items-center space-x-4">
            <div className="w-full">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                className="col-span-3"
                placeholder="John Doe"
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                className="col-span-3"
                placeholder="john@gmail.com"
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
          </div>
          <div className="">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              className="col-span-3"
              onChange={(e) => {
                setSubject(e.target.value)
              }}
            />
          </div>
          <div className="">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              className="col-span-3"
              onChange={(e) => {
                setMessage(e.target.value)
              }}
            />
          </div>
        </div>
        <Button onClick={handleSubmit} type="submit" className="mt-4">
          {loading ? "Sending..." : "Send Invite"}
        </Button>
        <hr className="mt-4" />
        <div className="mt-6">
          <h5 className="text-sm font-semibold">Email Preview</h5>
          <Template
            name={name}
            email={email}
            subject={subject}
            message={message}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}

const Template = ({
  name,
  email,
  message,
  subject,
}: {
  name?: string
  email?: string
  message?: string
  subject?: string
}) => {
  return (
    <div className="mt-4 rounded-lg border border-border">
      <div className="border-b border-border bg-slate-100 p-2 text-sm font-bold">
        New Message
      </div>
      <div className="mt-1 bg-white px-2 py-1">
        <h5 className="text-xs">From : noreply@revel.com</h5>
        <h5 className="text-xs">To : {email}</h5>
      </div>
      <hr />
      <div className="px-2 py-1">
        <h5 className="text-sm font-semibold">
          {subject} {name}
        </h5>
      </div>
      <hr />
      <div className="rounded-lg bg-white p-4">
        <h4 className="text-sm font-medium">Hey {name} 👋🏻</h4>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
        <Button className="mt-4" size="sm">
          Share Testimonial
        </Button>
        <p className="mt-1 text-[10px]">
          If button not works copy paste following link into your browser
        </p>
        <a href="#" className="-mt-4 text-[10px] text-indigo-600">
          https://revel.com/feedback/123456
        </a>
      </div>
    </div>
  )
}
