"use client"

import React from "react"
import Image from "next/image"
import { Edit } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ProfileImageUploader } from "@/components/profile-image-uploader"
import { StarRating } from "@/components/star-rating"

export function StepThreeForm({ readOnly }: { readOnly?: boolean }) {
  return (
    <div className="relative w-full max-w-lg rounded-xl border border-border bg-white px-8 py-6 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
      <div>
        <Image src="/revel.svg" alt="Revel Logo" width={40} height={40} />
      </div>
      <h4 className="mt-8 font-cal text-2xl font-bold">Almost Done 🙌🏻</h4>
      <div className="mt-4">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Enter your name" />
      </div>

      <div className="mt-4">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" placeholder="Enter your email" />
      </div>

      <div>
        <ProfileImageUploader
          files={[]}
          setFiles={() => {}}
          name="profile-image"
          setValue={() => {}}
        />
      </div>

      <div className="mt-4">
        <Label htmlFor="designation">Your Designation</Label>
        <Input id="designation" placeholder="Enter your designation" />
      </div>

      <Button disabled={readOnly} className="mt-8 w-full disabled:opacity-100">
        Submit Review
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
