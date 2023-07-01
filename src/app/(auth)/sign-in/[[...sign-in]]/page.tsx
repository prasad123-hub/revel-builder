import Image from "next/image"
import Link from "next/link"
import { SignIn } from "@clerk/nextjs"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export default function SignInPage() {
  return (
    <>
      <div className="container relative grid min-h-[100vh] flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/sign-up"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Create New Account
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0" />
          <Link href="/">
            <div className="relative z-20 flex items-center text-lg font-medium">
              <Image src="/revel.svg" width={32} height={32} alt="Revel" />
              <span className="ml-2 font-cal text-lg font-bold text-primary">
                Revel
              </span>
            </div>
          </Link>
        </div>
        <div className="lg:p-8">
          <SignIn
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
            redirectUrl="/dashboard"
          />
        </div>
      </div>
    </>
  )
}
