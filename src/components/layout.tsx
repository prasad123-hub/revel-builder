import Link from "next/link"
import { UserButton, useUser } from "@clerk/nextjs"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"
import { SiteFooter } from "./site-footer"
import { buttonVariants } from "./ui/button"

export function Layout({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useUser()
  return (
    <>
      <div className="hidden w-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-500 via-red-600 to-orange-400 py-2 text-center text-xs font-semibold text-white md:block">
        This is a demo site. Built for educational purposes only.
      </div>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
        <div className="container hidden h-20 items-center justify-between py-6 md:flex">
          <MainNav items={siteConfig.mainNav} />
          <LoginandSignup />
        </div>
        <div className="flex items-center justify-between p-4 md:hidden">
          <MobileNav items={siteConfig.mainNav} />
          <LoginandSignup />
        </div>
      </header>
      <div className="mx-auto max-w-7xl flex-1 px-4 md:px-8 lg:px-12">
        {children}
      </div>
      <SiteFooter />
    </>
  )
}

const LoginandSignup = () => {
  const { isSignedIn } = useUser()
  return (
    <>
      {isSignedIn ? (
        <UserButton />
      ) : (
        <>
          <nav className="space-x-4">
            <Link
              href="/sign-in"
              className={cn(
                buttonVariants({ size: "default", variant: "outline" }),
                "px-4"
              )}
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              className={cn(buttonVariants({ size: "default" }), "px-4")}
            >
              Get Started for Free
            </Link>
          </nav>
        </>
      )}
    </>
  )
}
