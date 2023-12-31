import { currentUser } from "@clerk/nextjs"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default async function LandingLayoutProps({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader userId={user?.id as string} />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 md:px-8 lg:px-12">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
