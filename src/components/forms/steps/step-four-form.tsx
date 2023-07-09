import React from "react"
import Image from "next/image"
import { Edit } from "lucide-react"

import { Button } from "@/components/ui/button"

export function StepFourForm({ readOnly }: { readOnly?: boolean }) {
  return (
    <div className="relative w-full max-w-lg rounded-xl border border-border bg-white px-8 py-6 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
      <div>
        <Image src="/revel.svg" alt="Revel Logo" width={40} height={40} />
      </div>
      <h4 className="mt-8 font-cal text-2xl font-bold">Thank You 🙏🏻</h4>
      <p className="mt-4 text-sm text-slate-600">
        Thank you so much for your support! We appreciate your support and we
        hope you enjoy using our product.
      </p>

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
