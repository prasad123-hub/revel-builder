import { StarRating } from "@/components/star-rating"
import { columns, Payment } from "@/components/tables/testimonials/columns"
import { DataTableDemo } from "@/components/tables/testimonials/data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="mx-auto w-full">
      <div>
        <h3 className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text font-hand text-xl font-semibold text-transparent">
          Collection of testimonials
        </h3>
        <h1 className="max-w-xl py-2 pb-6 font-cal text-4xl font-bold">
          Testimonials
        </h1>
      </div>

      <DataTableDemo />
    </div>
  )
}
