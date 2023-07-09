import { Form } from "@/types"

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
    select: {
      id: true,
      projectId: true,
    },
  })

  return (
    <>
      <FormEditor
        formId={form?.id as string}
        projectId={form?.projectId as string}
      />
    </>
  )
}
