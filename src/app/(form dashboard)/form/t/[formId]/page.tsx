import { Form, Project } from "@/types"

import { db } from "@/lib/db"
import { CustomerFacingForm } from "@/components/customer-facing-form"

export default async function ReviewForm({
  params,
}: {
  params: { formId: string }
}) {
  const form = await db.form.findUnique({
    where: {
      id: params.formId,
    },
  })

  const project = await db.project.findUnique({
    where: {
      id: form?.projectId as string,
    },
  })
  return (
    <>
      <div className="mx-auto w-full max-w-xl">
        <CustomerFacingForm form={form as Form} project={project as Project} />
      </div>
    </>
  )
}
