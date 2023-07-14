"use client"

import { useContext, useState } from "react"
import { FormDetailsContext } from "@/context/formDetailsContext"
import { Testimonial } from "@/types"
import { useUser } from "@clerk/nextjs"

import { formatDate } from "@/lib/utils"
import { StarRating } from "@/components/star-rating"
import { TestimonialDetails } from "@/components/testimonial-details"

interface Props {
  data: {
    id: string
    projectId: string
    name: string
    email: string
    createdAt: Date
    updatedAt: Date
  }[]
  responses: {
    id: string
    formId: string
    projectId: string
    customerName: string
    customerEmail: string
    customerProfileImageUrl: string
    customerDesignation: string
    testimonial: string
    rating: number
    createdAt: Date
    updatedAt: Date
  }[]
}

export function ContactTable({ data, responses }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { state, dispatch } = useContext(FormDetailsContext)
  const user = useUser()

  const intitialData = [
    {
      id: "123",
      customerName: "Prasad",
      customerEmail: "prasad@revel.npmstack.com",
      customerDesignation: "Founder Revel.com",
      customerProfileImageUrl: "/avatar.svg",
      testimonial: `Hey ${user.user?.firstName}! Welcome to Revel 👋  Revel's never gonna give you up or let you down. Click this demo testimonial to see how you can view, edit or share it.`,
      testimonialSecondLine: "",
      rating: 5,
      createdAt: new Date().toISOString(),
    },
  ]

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {data.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Staus
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Testimonial
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.map((contact) => (
                    <tr
                      key={contact.id}
                      className="cursor-pointer transition-colors hover:bg-gray-50"
                    >
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                        {contact.name}
                      </td>
                      <td className="whitespace-pre-wrap px-3 py-5 text-sm text-gray-500">
                        {contact.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                          Invite Sent
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {responses.filter(
                          (customer) => customer.customerEmail === contact.email
                        ).length > 0 ? (
                          <div>
                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                              Collected
                            </span>
                          </div>
                        ) : (
                          <div>
                            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                              Not Collected
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>
                No contacts found. Invite your contacts to collect testimonials.
              </div>
            )}
          </div>
        </div>
      </div>
      <TestimonialDetails isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}
