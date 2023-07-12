"use client"

import React, { useContext, useState } from "react"
import { FormDetailsContext } from "@/context/formDetailsContext"
import { Rating } from "react-simple-star-rating"

export function StarRating({
  readOnly,
  initialValue,
}: {
  readOnly?: boolean
  initialValue?: number
}) {
  const { state, dispatch } = useContext(FormDetailsContext)

  return (
    <div className="my-4 flex items-center">
      {/* set initial value */}
      <Rating
        className="flex items-center"
        SVGstyle={{ display: "inline" }}
        size={20}
        onClick={(rate: number) => {
          dispatch({
            type: "details/customerResponse/testimonialRating",
            payload: rate,
          })
        }}
        initialValue={initialValue || state.customerResponse.testimonialRating}
        readonly={readOnly}
      />
    </div>
  )
}
