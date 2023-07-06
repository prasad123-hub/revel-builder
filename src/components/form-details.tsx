import React from "react"
import { ChevronDown, Hand } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"

export function FormDetails() {
  const [welcomePage, setWelcomPage] = React.useState(true)
  const [promtPage, setPromtPage] = React.useState(false)
  const [thankYouPage, setThankYouPage] = React.useState(false)
  const [attribution, setAttribution] = React.useState(false)

  function handleWelcomePage() {
    setWelcomPage(!welcomePage)
    setPromtPage(false)
    setThankYouPage(false)
    setAttribution(false)
  }

  function handlePromtPage() {
    setWelcomPage(false)
    setPromtPage(!promtPage)
    setThankYouPage(false)
    setAttribution(false)
  }

  function handleThankYouPage() {
    setWelcomPage(false)
    setPromtPage(false)
    setThankYouPage(!thankYouPage)
    setAttribution(false)
  }

  function handleAttribution() {
    setWelcomPage(false)
    setPromtPage(false)
    setThankYouPage(false)
    setAttribution(!attribution)
  }

  return (
    <>
      <div className="space-y-4">
        <Collapsible
          open={welcomePage}
          onOpenChange={handleWelcomePage}
          className="w-full space-y-2"
        >
          <div className="flex items-center space-x-4 border-b border-border px-4 pb-4">
            <CollapsibleTrigger asChild>
              <div className="flex w-full cursor-pointer items-center">
                <Button variant="ghost" size="sm" className="">
                  <ChevronDown
                    size={16}
                    className={`${
                      welcomePage ? "rotate-180 duration-300" : "duration-300"
                    }`}
                  />
                  <span className="sr-only">Toggle</span>
                </Button>
                <h6 className="inline-flex items-center font-cal font-medium">
                  <span className="inline-block">Welcome Page (Step 1/4)</span>
                  <Hand
                    size={16}
                    className="ml-3 mt-1 rotate-45 text-purple-600"
                  />
                </h6>
              </div>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2">
            <div>
              <Label htmlFor="title">Page Title</Label>
              <Input id="title" value={"Share a Testimonial"} />
            </div>
            <div className="mt-4">
              <Label htmlFor="introMessage">Introductory Message</Label>
              <Textarea
                id="introMessage"
                value="Do you love using our product? We'd love to hear about it!"
                className="h-[80px]"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible
          open={promtPage}
          onOpenChange={handlePromtPage}
          className="w-full space-y-2"
        >
          <div className="flex items-center space-x-4 border-b border-border px-4 pb-4">
            <CollapsibleTrigger asChild>
              <div className="flex w-full cursor-pointer items-center">
                <Button variant="ghost" size="sm" className="">
                  <ChevronDown
                    size={16}
                    className={`${
                      promtPage ? "rotate-180 duration-300" : "duration-300"
                    }`}
                  />
                  <span className="sr-only">Toggle</span>
                </Button>
                <h6 className="inline-flex items-center font-cal font-medium">
                  <span className="inline-block">Response Page (Step 2/4)</span>
                  <Hand
                    size={16}
                    className="ml-3 mt-1 rotate-45 text-purple-600"
                  />
                </h6>
              </div>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2">
            <div className="mt-4">
              <Label htmlFor="promt">Promt</Label>
              <Textarea
                id="promt"
                value="- What do you like most about us?
                - Would you recommend us to a friend?"
                className="h-[150px]"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible
          open={attribution}
          onOpenChange={handleAttribution}
          className="w-full space-y-2"
        >
          <div className="flex items-center space-x-4 border-b border-border px-4 pb-4">
            <CollapsibleTrigger asChild>
              <div className="flex w-full cursor-pointer items-center">
                <Button variant="ghost" size="sm" className="">
                  <ChevronDown
                    size={16}
                    className={`${
                      attribution ? "rotate-180 duration-300" : "duration-300"
                    }`}
                  />
                  <span className="sr-only">Toggle</span>
                </Button>
                <h6 className="inline-flex items-center font-cal font-medium">
                  <span className="inline-block">
                    Attribution Page (Step 3/4)
                  </span>
                  <Hand
                    size={16}
                    className="ml-3 mt-1 rotate-45 text-purple-600"
                  />
                </h6>
              </div>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2">
            <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
              @radix-ui/colors
            </div>
            <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
              @stitches/react
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible
          open={thankYouPage}
          onOpenChange={handleThankYouPage}
          className="w-full space-y-2"
        >
          <div className="flex items-center space-x-4 border-b border-border px-4 pb-4">
            <CollapsibleTrigger asChild>
              <div className="flex w-full cursor-pointer items-center">
                <Button variant="ghost" size="sm" className="">
                  <ChevronDown
                    size={16}
                    className={`${
                      thankYouPage ? "rotate-180 duration-300" : "duration-300"
                    }`}
                  />
                  <span className="sr-only">Toggle</span>
                </Button>
                <h6 className="inline-flex items-center font-cal font-medium">
                  <span className="inline-block">
                    Thank You Page (Step 4/4)
                  </span>
                  <Hand
                    size={16}
                    className="ml-3 mt-1 rotate-45 text-purple-600"
                  />
                </h6>
              </div>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2 pb-4">
            <div className="mt-4">
              <Label htmlFor="thankYouMessage">Thank You Message</Label>
              <Textarea
                id="thankYouMessage"
                value="hope you enjoy using our product."
                className="h-[80px]"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  )
}
