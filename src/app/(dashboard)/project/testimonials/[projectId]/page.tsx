import { db } from "@/lib/db"
import { DataTableDemo } from "@/components/tables/testimonials/data-table"

export default async function TestimonialPage({
  params,
}: {
  params: { projectId: string }
}) {
  const testimonials = await db.response.findMany({
    where: {
      projectId: params.projectId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="mx-auto w-full ">
      <div>
        <h1 className="max-w-xl py-4 pb-6 font-cal text-4xl font-bold">
          Testimonials
        </h1>
      </div>

      <DataTableDemo data={testimonials} />
    </div>
  )
}
