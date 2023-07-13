import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { SheetDemo } from "@/components/invite-editor"
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

  return (
    <>
      <div className="flex items-center justify-between pt-12">
        <div className="">
          <h3 className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text font-hand text-xl font-semibold text-transparent">
            Manage contacts
          </h3>
          <h1 className="max-w-xl py-2 font-cal text-4xl font-bold">
            Invite People
          </h1>
        </div>
        <div>
          <SheetDemo projectId={projectId} />
        </div>
      </div>
      <ContactTable data={contacts} />
    </>
  )
}
