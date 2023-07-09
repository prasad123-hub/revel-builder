"use client"

import React from "react"
import Image from "next/image"
import { Edit } from "lucide-react"

import { Button } from "@/components/ui/button"

export function StepOneForm({ readOnly }: { readOnly?: boolean }) {
  return (
    <div className="relative w-full max-w-lg rounded-xl border border-border bg-white px-8 py-6 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
      <div>
        <Image src="/revel.svg" alt="Revel Logo" width={40} height={40} />
      </div>
      <h4 className="mt-8 font-cal text-2xl font-bold">Share a Testimonial</h4>
      <p className="mt-4 text-sm text-slate-600">
        We genuinely value your feedback and the opportunity to serve you
        better. Thank you in advance for taking the time to share your thoughts.
        Your testimonial will not only make a difference to us but also assist
        others in making informed decisions about our products/services.
      </p>
      <Button disabled={readOnly} className="mt-8 w-full disabled:opacity-100">
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
