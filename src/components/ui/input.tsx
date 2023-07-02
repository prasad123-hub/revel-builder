"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { Button, buttonVariants } from "./button"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    // if type is file, then return a button with text Upload Logo
    if (type === "file") {
      return (
        <label className="flex h-9 w-[160px] flex-col items-start justify-start rounded-md bg-background text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
          <input type={type} className="hidden" ref={ref} {...props} />
          <span
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            Upload Compnay Logo
          </span>
        </label>
      )
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
