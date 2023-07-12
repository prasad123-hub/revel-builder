"use client"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { Testimonial } from "@/types"
import { ColumnDef } from "@tanstack/react-table"

import { formatDate } from "@/lib/utils"
import { StarRating } from "@/components/star-rating"

export const columns: ColumnDef<Testimonial>[] = [
  {
    accessorKey: "customerProfileImageUrl",
    header: ({ column }) => {
      return <div className="ml-4">Person</div>
    },
    cell: ({ row }) => {
      const name = row.original.customerName || ""
      const designation = row.original.customerDesignation || ""
      return (
        <div className="ml-4 flex items-center">
          <div>
            <img
              className="inline-block h-9 w-9 rounded-full object-cover"
              src={`${row.getValue("customerProfileImageUrl")}`}
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
              {name}
            </p>
            <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
              {designation}
            </p>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "customerEmail",
    header: () => <div className="ml-8 max-w-min">Email</div>,
    cell: ({ row }) => {
      return (
        <div className="ml-8">
          <p className="text-xs">{row.getValue("customerEmail")}</p>
        </div>
      )
    },
  },
  {
    accessorKey: "testimonial",
    header: () => <div className="ml-8 max-w-min">Testimonials</div>,
    cell: ({ row }) => {
      const rating = row.original.rating
      console.log(rating)
      return (
        <div className="ml-8 max-w-md">
          <StarRating readOnly initialValue={rating} />
          <p className="mt-2 text-xs">{row.getValue("testimonial")}</p>
        </div>
      )
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="max-w-min">Date</div>,
    cell: ({ row }) => (
      <div className="text-xs capitalize">
        {formatDate(row.getValue("updatedAt"))}
      </div>
    ),
  },
]
