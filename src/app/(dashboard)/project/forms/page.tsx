import Link from "next/link"

import { db } from "@/lib/db"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { NewTestimonialForm } from "@/components/forms/new-testimonial-form"

interface Props {
  params: {}
}

export default async function TestimonialPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const projectId = searchParams?.projectId

  const forms = await db.form.findMany({
    where: {
      projectId: projectId as string,
    },
  })

  const project = await db.project.findUnique({
    where: {
      id: projectId as string,
    },
  })

  console.log("project", project)

  return (
    <div className="py-12 lg:px-10 ">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text font-hand text-xl font-semibold text-transparent">
            Manage forms
          </h3>
          <h1 className="max-w-xl py-2 pb-6 font-cal text-4xl font-bold">
            Testimonial Forms
          </h1>
        </div>
        <div>
          <NewTestimonialForm />
        </div>
      </div>

      {forms.length > 0 ? (
        <p>Something is there</p>
      ) : (
        <>
          <div>
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="logo" />
              <EmptyPlaceholder.Title>No forms created</EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                You don&apos;t have any forms created yet. Start creating form
                to collect testimonials.
              </EmptyPlaceholder.Description>
            </EmptyPlaceholder>
          </div>
        </>
      )}
    </div>
  )
}
