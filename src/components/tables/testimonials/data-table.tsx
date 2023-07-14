"use client"

import { useContext, useState } from "react"
import { FormDetailsContext } from "@/context/formDetailsContext"
import { Testimonial } from "@/types"
import { useUser } from "@clerk/nextjs"

import { formatDate } from "@/lib/utils"
import { StarRating } from "@/components/star-rating"
import { TestimonialDetails } from "@/components/testimonial-details"

export function DataTableDemo({ data }: { data: Testimonial[] }) {
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
                    className="px-10 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Testimonial
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Date
                  </th>
                </tr>
              </thead>
              {data.length > 0 ? (
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.map((testimonial) => (
                    <tr
                      key={testimonial.id}
                      onClick={() => {
                        dispatch({
                          type: "details/testimonialDetails",
                          payload: {
                            id: testimonial.id,
                            customerName: testimonial.customerName,
                            customerEmail: testimonial.customerEmail,
                            customerDesignation:
                              testimonial.customerDesignation,
                            imgUrl: testimonial.customerProfileImageUrl,
                            testimonialRating: testimonial.rating,
                            testimonialText: testimonial.testimonial,
                            createdAt: testimonial.createdAt,
                          },
                        })
                        setIsOpen(true)
                      }}
                      className="cursor-pointer transition-colors hover:bg-gray-50"
                    >
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="flex items-center">
                          <div className="h-11 w-11 flex-shrink-0">
                            <img
                              className="h-11 w-11 rounded-full bg-slate-600 object-cover"
                              src={
                                testimonial.customerProfileImageUrl ||
                                "/avatar.svg"
                              }
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {testimonial.customerName}
                            </div>
                            <div className="mt-1 text-xs text-gray-500">
                              {testimonial.customerEmail}
                            </div>
                            <div className="text-xs text-gray-500">
                              {testimonial.customerDesignation}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-pre-wrap px-10 py-5 text-sm text-gray-500">
                        <StarRating
                          readOnly
                          initialValue={testimonial.rating}
                        />
                        {testimonial.testimonial}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {formatDate(new Date(testimonial.createdAt) as any)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody className="divide-y divide-gray-200 bg-white">
                  {intitialData.map((testimonial) => (
                    <tr
                      key={testimonial.id}
                      onClick={() => {
                        dispatch({
                          type: "details/testimonialDetails",
                          payload: {
                            id: testimonial.id,
                            customerName: testimonial.customerName,
                            customerEmail: testimonial.customerEmail,
                            customerDesignation:
                              testimonial.customerDesignation,
                            imgUrl: testimonial.customerProfileImageUrl,
                            testimonialRating: testimonial.rating,
                            testimonialText: testimonial.testimonial,
                            createdAt: testimonial.createdAt,
                          },
                        })
                        setIsOpen(true)
                      }}
                      className="cursor-pointer transition-colors hover:bg-gray-50"
                    >
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="flex items-center">
                          <div className="h-11 w-11 flex-shrink-0">
                            <img
                              className="h-11 w-11 rounded-full bg-slate-600 object-cover"
                              src={
                                testimonial.customerProfileImageUrl ||
                                "/avatar.svg"
                              }
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {testimonial.customerName}
                            </div>
                            <div className="mt-1 text-xs text-gray-500">
                              {testimonial.customerEmail}
                            </div>
                            <div className="text-xs text-gray-500">
                              {testimonial.customerDesignation}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-pre-wrap px-10 py-5 text-sm text-gray-500">
                        <StarRating
                          readOnly
                          initialValue={testimonial.rating}
                        />
                        {testimonial.testimonial}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {formatDate(new Date(testimonial.createdAt) as any)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
      <TestimonialDetails isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}
