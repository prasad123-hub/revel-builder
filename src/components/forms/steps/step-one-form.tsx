"use client"

import React, { useContext } from "react"
import Image from "next/image"
import Link from "next/link"
import { FormDetailsContext } from "@/context/formDetailsContext"
import { Edit } from "lucide-react"

import { Button } from "@/components/ui/button"

export function StepOneForm({ readOnly }: { readOnly?: boolean }) {
  const { state, dispatch } = useContext(FormDetailsContext)
  return (
    <div className="relative mx-auto w-full max-w-lg rounded-xl border border-border bg-white px-8 py-6 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
      <div className="flex items-center">
        <Link href={state.companyWebsite || ""} target="_blank">
          <Image
            src={state.companyLogo || "/"}
            alt="Revel Logo"
            width={40}
            height={40}
            className="mr-2 h-8 w-auto object-cover"
          />
        </Link>
      </div>
      <h4 className="mt-8 font-cal text-2xl font-bold">{state.pageTitle}</h4>
      <p className="mt-4 text-sm text-slate-600">{state.introMessage}</p>
      <Button
        onClick={() => dispatch({ type: "details/step2" })}
        disabled={readOnly}
        className="mt-8 w-full disabled:opacity-100"
      >
        <Edit size={16} className="mr-2" />
        Write Review
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
