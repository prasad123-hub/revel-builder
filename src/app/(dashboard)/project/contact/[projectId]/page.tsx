import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { InviteEditor } from "@/components/invite-editor"
import { ContactTable } from "@/components/tables/contacts/contact-table"

export default async function ContactsPage({
  params,
}: {
  params: { projectId: string }
}) {
  const projectId = params.projectId

  const contacts = await db.contact.findMany({
    where: {
      projectId: projectId,
    },
  })

  const formId = await db.form.findFirst({
    where: {
      projectId: projectId,
    },
    select: {
      id: true,
    },
  })

  const responses = await db.response.findMany({
    where: {
      projectId: projectId as string,
      formId: formId?.id as string,
    },
  })

  return (
    <>
      <div className="flex items-center justify-between pt-12">
        <div>
          <h1 className="max-w-xl py-2 font-cal text-4xl font-bold">
            Invite People
          </h1>
        </div>
        <div>
          <InviteEditor projectId={projectId} formId={formId?.id as string} />
        </div>
      </div>
      <ContactTable data={contacts} responses={responses} />
    </>
  )
}
