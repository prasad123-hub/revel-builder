import React, { useContext } from "react"
import { FormDetailsContext } from "@/context/formDetailsContext"
import {
  ChevronDown,
  Contact,
  Hand,
  MessageSquare,
  PartyPopper,
} from "lucide-react"

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
  const { state, dispatch } = useContext(FormDetailsContext)

  return (
    <>
      <div className="space-y-4">
        <Collapsible
          open={state.steps.step1}
          onOpenChange={() => {
            dispatch({ type: "details/step1" })
          }}
          className="w-full space-y-2"
        >
          <div className="flex items-center space-x-4 border-b border-border px-4 pb-4">
            <CollapsibleTrigger asChild>
              <div className="flex w-full cursor-pointer items-center">
                <Button variant="ghost" size="sm" className="">
                  <ChevronDown
                    size={16}
                    className={`${
                      state.steps.step1
                        ? "rotate-180 duration-300"
                        : "duration-300"
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
              <Input
                id="title"
                value={state.pageTitle}
                onChange={(e) => {
                  dispatch({
                    type: "details/pageTitle",
                    payload: e.target.value,
                  })
                }}
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="introMessage">Introductory Message</Label>
              <Textarea
                id="introMessage"
                value={state.introMessage}
                className="h-[100px]"
                onChange={(e) => {
                  dispatch({
                    type: "details/introMessage",
                    payload: e.target.value,
                  })
                }}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible
          open={state.steps.step2}
          onOpenChange={() => {
            dispatch({ type: "details/step2" })
          }}
          className="w-full space-y-2"
        >
          <div className="flex items-center space-x-4 border-b border-border px-4 pb-4">
            <CollapsibleTrigger asChild>
              <div className="flex w-full cursor-pointer items-center">
                <Button variant="ghost" size="sm" className="">
                  <ChevronDown
                    size={16}
                    className={`${
                      state.steps.step2
                        ? "rotate-180 duration-300"
                        : "duration-300"
                    }`}
                  />
                  <span className="sr-only">Toggle</span>
                </Button>
                <h6 className="inline-flex items-center font-cal font-medium">
                  <span className="inline-block">Response Page (Step 2/4)</span>
                  <MessageSquare
                    size={16}
                    className="ml-3 mt-1 text-orange-600"
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
                value={state.promt}
                className="h-[150px]"
                onChange={(e) => {
                  dispatch({ type: "details/promt", payload: e.target.value })
                }}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible
          open={state.steps.step3}
          onOpenChange={() => {
            dispatch({ type: "details/step3" })
          }}
          className="w-full space-y-2"
        >
          <div className="flex items-center space-x-4 border-b border-border px-4 pb-4">
            <CollapsibleTrigger asChild>
              <div className="flex w-full cursor-pointer items-center">
                <Button variant="ghost" size="sm" className="">
                  <ChevronDown
                    size={16}
                    className={`${
                      state.steps.step3
                        ? "rotate-180 duration-300"
                        : "duration-300"
                    }`}
                  />
                  <span className="sr-only">Toggle</span>
                </Button>
                <h6 className="inline-flex items-center font-cal font-medium">
                  <span className="inline-block">
                    Attribution Page (Step 3/4)
                  </span>
                  <Contact size={16} className="ml-3 mt-1 text-green-600" />
                </h6>
              </div>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2">
            <div className="mt-4">
              <p className="text-mute-foreground text-sm">
                This page is used for collecting user information. Like name,
                email, profile image, designation etc.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible
          open={state.steps.step4}
          onOpenChange={() => {
            dispatch({ type: "details/step4" })
          }}
          className="w-full space-y-2"
        >
          <div className="flex items-center space-x-4 border-b border-border px-4 pb-4">
            <CollapsibleTrigger asChild>
              <div className="flex w-full cursor-pointer items-center">
                <Button variant="ghost" size="sm" className="">
                  <ChevronDown
                    size={16}
                    className={`${
                      state.steps.step4
                        ? "rotate-180 duration-300"
                        : "duration-300"
                    }`}
                  />
                  <span className="sr-only">Toggle</span>
                </Button>
                <h6 className="inline-flex items-center font-cal font-medium">
                  <span className="inline-block">
                    Thank You Page (Step 4/4)
                  </span>
                  <PartyPopper
                    size={16}
                    className="ml-3 mt-1 text-yellow-600"
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
                value={state.thankYouMessage}
                className="h-[80px]"
                onChange={(e) => {
                  dispatch({
                    type: "details/thankYouMessage",
                    payload: e.target.value,
                  })
                }}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  )
}
