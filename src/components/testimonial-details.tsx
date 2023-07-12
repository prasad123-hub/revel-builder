import { useContext, useRef, useState } from "react"
import Image from "next/image"
import { FormDetailsContext } from "@/context/formDetailsContext"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Calendar, CrossIcon } from "lucide-react"

import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Sheet, SheetContent } from "@/components/ui/sheet"

import { DownloadAsImage } from "./download-image"
import { StarRating } from "./star-rating"

export function TestimonialDetails({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) {
  const { state, dispatch } = useContext(FormDetailsContext)

  return (
    <Sheet open={isOpen}>
      <SheetContent className="overflow-y-scroll p-0 pb-12">
        <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <Cross2Icon
            onClick={() => setIsOpen(false)}
            className="h-5 w-5 cursor-pointer font-bold text-white"
          />
          <span className="sr-only">Close</span>
        </div>
        <div className="h-[140px] w-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500"></div>
        <div className="px-8">
          <div className="-mt-[28px] h-14 w-14 flex-shrink-0">
            <img
              className="h-14 w-14 rounded-full bg-slate-600 object-cover"
              src={state.testimonialDetails.imgUrl || "/avatar.svg"}
              alt=""
            />
          </div>
          <h1 className="mt-3 font-cal text-2xl font-bold">
            {state.testimonialDetails.customerName}
          </h1>
          <h5 className="text-md font-medium text-muted-foreground">
            {state.testimonialDetails.customerDesignation}
          </h5>
          <StarRating
            readOnly
            initialValue={state.testimonialDetails.testimonialRating}
          />
          <p className="text-sm font-medium">
            {state.testimonialDetails.testimonialText}
          </p>
          <span className="mt-4 block rounded-xl border border-border p-4">
            <span className="inline-flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                Date :{" "}
              </span>
              <span className="ml-2 text-sm font-medium text-muted-foreground">
                {formatDate(state.testimonialDetails.createdAt)}
              </span>
            </span>
          </span>
        </div>
        <div className="mt-8 px-8">
          <h1 className="font-cal font-bold">
            Download Images of your Testimonials ✨
          </h1>
          <h6 className="mt-3 text-sm font-medium">Choose style</h6>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <ImageOneDiaglog state={state.testimonialDetails} />
            <ImageTwoDiaglog state={state.testimonialDetails} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

const ImageOneDiaglog = ({
  state,
}: {
  state: {
    id: string
    imgUrl: string
    customerName: string
    customerEmail: string
    customerDesignation: string
    testimonialText: string
    testimonialRating: number
    createdAt: string
    choosenImage: number
  }
}) => {
  const imageRef = useRef(null)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="h-10 w-full">
          <Image
            src="/ss-one.png"
            alt="testimonial example screenshot"
            width={300}
            height={100}
            className="h-[100px] w-full rounded-xl object-cover"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <div
          ref={imageRef}
          className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-10"
        >
          <div className="w-full rounded-xl bg-white p-4">
            <StarRating readOnly initialValue={state.testimonialRating} />
            <div className="mt-4">
              <p>{state.testimonialText}</p>
            </div>
            <div className="mt-4 flex items-center">
              <div className="h-8 w-8 flex-shrink-0">
                <img
                  className="h-8 w-8 rounded-full bg-slate-600 object-cover"
                  src={state.imgUrl || "/avatar.svg"}
                  alt=""
                />
              </div>
              <div className="ml-4">
                <div className="text-xs font-medium text-gray-900">
                  {state.customerName}
                </div>
                <div className="-mt-1 text-xs text-gray-500">
                  {state.customerEmail}
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DownloadAsImage editorRef={imageRef} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const ImageTwoDiaglog = ({
  state,
}: {
  state: {
    id: string
    imgUrl: string
    customerName: string
    customerEmail: string
    customerDesignation: string
    testimonialText: string
    testimonialRating: number
    createdAt: string
    choosenImage: number
  }
}) => {
  const imageRef = useRef(null)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="h-10 w-full">
          <Image
            src="/ss-two.png"
            alt="testimonial example screenshot"
            width={300}
            height={100}
            className="h-[100px] w-full rounded-xl object-cover"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <div
          ref={imageRef}
          className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-green-200 via-green-400 to-green-500 p-10"
        >
          <div className="flex w-full flex-col items-center justify-center rounded-xl bg-white p-4">
            <div className="-mt-10 h-12 w-12 flex-shrink-0">
              <img
                className="h-12 w-12 rounded-full bg-slate-600 object-cover"
                src={state.imgUrl || "/avatar.svg"}
                alt=""
              />
            </div>
            <StarRating readOnly initialValue={state.testimonialRating} />
            <div className="-mt-2 flex items-center text-center">
              <div>
                <div className="font-medium text-gray-900">
                  {state.customerName}
                </div>
                <div className="font-medium text-gray-500">
                  {state.customerEmail}
                </div>
              </div>
            </div>
            <div className="text-md mt-4 text-center text-sm font-medium">
              <p>{state.testimonialText}</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DownloadAsImage editorRef={imageRef} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
