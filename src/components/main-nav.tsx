"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname()

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-3">
        <Image src="/revel.svg" alt="Revel Logo" width={32} height={32} />
        <span className="inline-block font-cal text-xl font-bold text-primary">
          {siteConfig.name}
        </span>
      </Link>

      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-foreground hover:text-black",
                    item.disabled && "cursor-not-allowed opacity-80",
                    pathname === item.href && "text-slate-800"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
