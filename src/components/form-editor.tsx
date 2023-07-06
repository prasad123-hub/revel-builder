"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

import { FormDetails } from "./form-details"

export function FormEditor() {
  return (
    <div className="grid min-h-screen grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="flex h-full flex-col justify-between p-8">
        <div>
          <Link href="/form/create">
            <Button variant="ghost" size="sm">
              <ArrowLeft size={16} className="mr-2" />
              Forms
            </Button>
          </Link>
          <h1 className="mt-4 font-cal text-xl font-bold">New Form</h1>
          <div className="rounded-md py-4">
            <p className="bg-slate-50 p-4 text-sm text-muted-foreground">
              💡 Welcome to your collection form! Your form helps you collect
              text and video testimonials from your customers.
            </p>
          </div>
        </div>
        <div className="mt-4 min-h-max flex-grow overflow-hidden border-y border-border">
          <div
            className="scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent 
          scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 
          scrollbar-track:!rounded dark:scrollbar-track:!bg-slate-500/[0.16] dark:scrollbar-thumb:!bg-slate-500/50 
          lg:supports-scrollbars:pr-2 max-h-96 min-w-full flex-none overflow-hidden px-4 pt-2
          lg:max-h-96 lg:overflow-auto"
          >
            <FormDetails />
          </div>
        </div>
        <div className="w-full px-8 pt-8">
          <Button className="w-full">Save Changes</Button>
        </div>
      </div>
      <div className="h-full bg-yellow-300">Narkhedkar</div>
    </div>
  )
}
