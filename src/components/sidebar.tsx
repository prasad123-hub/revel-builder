"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { UserButton, UserProfile, useUser } from "@clerk/nextjs"
import { ArrowLeft, Download, FormInput, Heart, UserCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

export function Sidebar() {
  const { user } = useUser()
  const pathname = usePathname()
  const projectId = pathname.split("/")[3]
  return (
    <>
      {/* Static sidebar for desktop */}
      <div className="relative hidden border-r border-border lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="px-8 pt-8">
          <Image src="/revel.svg" alt="Revel" width={30} height={30} />
        </div>
        <div className="px-6 pt-4">
          <Link
            href="/dashboard"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Projects
          </Link>
        </div>
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Collect
            </h2>
            <div className="space-y-1">
              <Link
                href={`/project/forms/${projectId}`}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-full justify-start"
                )}
              >
                <FormInput className="mr-2 h-4 w-4" />
                Forms
              </Link>
              <Link
                href={`/project/import/${projectId}`}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-full justify-start"
                )}
              >
                <Download className="mr-2 h-4 w-4" />
                Import Testimonials
              </Link>
              <Link
                href={`/project/contact/${projectId}`}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-full justify-start"
                )}
              >
                <UserCircle className="mr-2 h-4 w-4" />
                Contacts
              </Link>
            </div>
          </div>
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Manage
            </h2>
            <div className="space-y-1">
              <Link
                href={`/project/testimonials/${projectId}`}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-full justify-start"
                )}
              >
                <Heart className="mr-2 h-4 w-4" />
                Testimonials
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-6">
          <div className="flex items-center justify-center">
            <div>
              <UserButton />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {user?.firstName}
              </p>
              <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                {user?.emailAddresses[0].emailAddress}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
