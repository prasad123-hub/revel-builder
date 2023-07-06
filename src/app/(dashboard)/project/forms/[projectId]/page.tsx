import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { db } from "@/lib/db"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { FormItem } from "@/components/form-item"
import { NewTestimonialForm } from "@/components/forms/new-testimonial-form"

export default async function FormsPage({
  params,
}: {
  params: { projectId: string }
}) {
  const projectId = params.projectId

  const forms = await db.form.findMany({
    where: {
      projectId: "64a6514264e7bb345a725311",
    },
  })

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
          <NewTestimonialForm projectId={projectId} />
        </div>
      </div>

      {forms.length > 0 ? (
        <>
          {forms.map((form) => (
            <FormItem key={form.id} form={form} />
          ))}
        </>
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
