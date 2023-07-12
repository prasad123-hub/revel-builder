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
  })

  return (
    <div className="mx-auto w-full ">
      <div>
        <h3 className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text font-hand text-xl font-semibold text-transparent">
          Collection of testimonials
        </h3>
        <h1 className="max-w-xl py-2 pb-6 font-cal text-4xl font-bold">
          Testimonials
        </h1>
      </div>

      <DataTableDemo data={testimonials as any} />
    </div>
  )
}
