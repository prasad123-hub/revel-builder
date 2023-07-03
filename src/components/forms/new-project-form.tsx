"use client"

import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import { trpc } from "@/lib/trpc"
import { CreateProject } from "@/lib/validator"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

export function NewProjectform() {
  /**
   * React Hook Form
   */
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateProject>()

  /**
   * TRPC Mutation
   */
  const mutation = trpc.create.useMutation()

  /**
   * Submit handler
   * @param data
   */

  const onSubmit: SubmitHandler<CreateProject> = async (
    data: CreateProject
  ) => {
    mutation.mutate(data, {
      onSuccess: (data, variables, context) => {
        console.log("success", data)
      },
      onError: (error) => {
        console.log(error)
      },
      onSettled: () => {
        console.log("settled")
      },
    })
  }

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
              {...register("companyDescription", { required: true })}
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

          <div></div>
          <Button type="submit" className="mt-4">
            {mutation.isLoading ? "Creating Project ..." : "Create Project"}
          </Button>
        </form>
      </div>
    </>
  )
}
