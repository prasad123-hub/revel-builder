import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

// import { CustomerDetailsProps } from "@/types"
// import { useUser } from "@clerk/clerk-react"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  //   const { isSignedIn } = useUser()
  const pathname = usePathname()

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-3">
        <Image src="/revel.svg" alt="Revel Logo" width={32} height={32} />
        <span className="inline-block text-lg font-bold">
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
                  href={"/sign-in"}
                  className={cn(
                    "flex items-center text-sm font-medium text-foreground/90 hover:text-black",
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
      {/* {isSignedIn && (
        <>
          <span
            className={`-ml-6 inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium ring-1 ring-inset ${
              subscriptionStatus?.isPro
                ? "bg-red-500/10 text-red-400 ring-red-500/20"
                : "bg-green-500/10 text-green-400 ring-green-500/20"
            }`}
          >
            {subscriptionStatus?.isPro ? "Pro" : "Free Trial"}
          </span>
        </>
      )} */}
    </div>
  )
}
