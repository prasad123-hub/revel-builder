"use client"

import React, { useState } from "react"
import { Rating } from "react-simple-star-rating"

export function StarRating({ readOnly }: { readOnly?: boolean }) {
  const [rating, setRating] = useState(4)

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate)
  }

  const handleReset = () => {
    // Set the initial value
    setRating(0)
  }

  const onPointerEnter = () => console.log("Enter")
  const onPointerLeave = () => console.log("Leave")
  const onPointerMove = (value: number, index: number) =>
    console.log(value, index)

  return (
    <div className="my-4 flex items-center">
      {/* set initial value */}
      <Rating
        className="flex items-center"
        SVGstyle={{ display: "inline" }}
        size={20}
        onClick={handleRating}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}
        initialValue={rating}
        readonly={readOnly}
        /* Available Props */
      />
    </div>
  )
}
