"use client"

import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import { cn } from "@/lib/utils"

import { Button, buttonVariants } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

interface NewProjectInputInterface {
  companyName: string
  description: string
  companyUrl: string
  companyLogo: File[]
}

export function NewProjectform() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewProjectInputInterface>()

  const onSubmit: SubmitHandler<NewProjectInputInterface> = (
    data: NewProjectInputInterface
  ) => console.log(data)

  const fileObject = watch("companyLogo")
  console.log(fileObject)

  return (
    <>
      <div className="my-10 w-full rounded-md border border-border p-10 px-4 lg:w-2/3">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              placeholder="e.g. Revel"
              className="mt-2"
              id="companyName"
              {...register("companyName", { required: true })}
            />
            {errors.companyName && errors.companyName?.type === "required" ? (
              <p className="mt-2 text-xs text-destructive">
                *Company name is required
              </p>
            ) : (
              <p className="mt-2 text-xs text-muted-foreground">
                This is your company name
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="companyDescription">
              Tell us something about your company
            </Label>
            <Textarea
              placeholder="e.g. Revel is a company that makes awesome products."
              className="mt-2"
              id="companyDescription"
              {...register("description", { required: true })}
              //   style={{ resize: "none" }}
            />
            {errors.companyName && errors.companyName?.type === "required" ? (
              <p className="mt-2 text-xs text-destructive">
                *Company description is required
              </p>
            ) : (
              <p className="mt-2 text-xs text-muted-foreground">
                This is description about your company
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="companyUrl">Company Website Url</Label>
            <Input
              placeholder="e.g. https://revel.co"
              className="mt-2"
              id="companyUrl"
              {...register("companyUrl", { required: true })}
            />
            {errors.companyName && errors.companyName?.type === "required" ? (
              <p className="mt-2 text-xs text-destructive">
                *Company Website Url is required
              </p>
            ) : (
              <p className="mt-2 text-xs text-muted-foreground">
                This is your company website url
              </p>
            )}
          </div>
          <div className="flex items-center space-x-10">
            <div>
              <Input
                type="file"
                className="mt-2"
                {...register("companyLogo", { required: true })}
              />
              {errors.companyName && errors.companyName?.type === "required" ? (
                <p className="mt-2 text-xs text-destructive">
                  *Company logo is required
                </p>
              ) : (
                <p className="mt-2 text-xs text-muted-foreground">
                  This is your company logo
                </p>
              )}
            </div>
            <div>
              {fileObject && (
                <div className="ml-10">
                  {fileObject[0] && (
                    <img
                      src={URL.createObjectURL(fileObject[0])}
                      alt=""
                      width={80}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          <Button type="submit" className="mt-4">
            Create Project
          </Button>
        </form>
      </div>
    </>
  )
}
