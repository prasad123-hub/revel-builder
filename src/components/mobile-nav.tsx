"use client"

import { useState } from "react"
import Image from "next/image"
import Link, { LinkProps } from "next/link"
import { usePathname, useRouter } from "next/navigation"
// import { CustomerDetailsProps } from "@/types"
// import { useUser } from "@clerk/clerk-react"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface MobileNavProps {
  items?: NavItem[]
}

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  //   const { isSignedIn } = useUser()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <HamburgerMenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center space-x-2"
          onOpenChange={setOpen}
        >
          <Image src="/revel.svg" alt="Revel Logo" width={24} height={24} />
          <span className="inline-block text-lg font-bold">
            {siteConfig.name}
          </span>
        </MobileLink>
        <div className="mt-12 flex flex-col space-y-3">
          {items?.map(
            (item) =>
              item.href && (
                <MobileLink
                  key={item.href}
                  href={item.href}
                  onOpenChange={setOpen}
                  className=""
                >
                  {item.title}
                </MobileLink>
              )
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}
