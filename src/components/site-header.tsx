"use client"

import React from "react"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import { User } from "@clerk/nextjs/dist/types/server"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"
import { buttonVariants } from "./ui/button"

export function SiteHeader({ userId }: { userId: string }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
      <div className="container hidden h-20 items-center justify-between py-6  md:flex">
        <MainNav items={siteConfig.mainNav} />
        {userId ? (
          <UserButton />
        ) : (
          <nav className="space-x-3">
            <Link
              href="/sign-in"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "px-4"
              )}
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              className={cn(buttonVariants({ size: "sm" }), "px-4")}
            >
              Get Started for Free
            </Link>
          </nav>
        )}
      </div>
      <div className="flex items-center justify-between p-4 md:hidden">
        <MobileNav items={siteConfig.mainNav} />
        <nav>
          {userId ? (
            <UserButton />
          ) : (
            <Link
              href="/sign-in"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "px-4"
              )}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
