"use client"

import React, { useContext } from "react"
import Image from "next/image"
import { FormDetailsContext } from "@/context/formDetailsContext"
import { ArrowLeft, Edit } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { StarRating } from "@/components/star-rating"

export function StepTwoForm({ readOnly }: { readOnly?: boolean }) {
  const { state, dispatch } = useContext(FormDetailsContext)
  return (
    <div className="relative mx-auto w-full max-w-lg rounded-xl border border-border bg-white px-8 py-6 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
      <div className="flex items-center justify-between">
        <Image
          src={state.companyLogo || "/revel.svg"}
          alt={state.companyName || ""}
          width={40}
          height={40}
          className="h-10 w-auto object-cover"
        />
        <Button
          onClick={() => dispatch({ type: "details/step1" })}
          variant="outline"
          size="sm"
          disabled={readOnly}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
      </div>
      <h4 className="mt-8 font-cal text-2xl font-bold">
        Write a text testimonial
      </h4>
      <p className="mt-4 text-sm text-slate-600">{state.promt}</p>
      <StarRating readOnly={readOnly} />
      <Textarea
        className="mt-4 h-[230px] disabled:opacity-100"
        placeholder="Write something nice ✨"
        disabled={readOnly}
        onChange={(e) =>
          dispatch({
            type: "details/customerResponese/testimonialText",
            payload: e.target.value,
          })
        }
      />
      <Button
        onClick={() => dispatch({ type: "details/step3" })}
        disabled={readOnly}
        className="mt-8 w-full disabled:opacity-100"
      >
        Submit
      </Button>
      <span className="absolute -top-4 right-6 inline-flex items-center rounded-full border border-border bg-white px-4 py-1">
        <Image
          src="/revel.svg"
          alt="Revel Logo"
          width={16}
          height={16}
          className="mr-2 h-4 w-auto object-cover"
        />
        <span className="text-sm font-medium">Powered by Revel</span>
      </span>
    </div>
  )
}
