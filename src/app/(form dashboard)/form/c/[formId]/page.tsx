import { Form, Project } from "@/types"

import { db } from "@/lib/db"
import { FormEditor } from "@/components/form-editor"

export default async function NewFormPage({
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
      <FormEditor form={form as Form} project={project as Project} />
    </>
  )
}
