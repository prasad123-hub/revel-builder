import { currentUser } from "@clerk/nextjs"

import { Sidebar } from "@/components/sidebar"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

interface LandingLayoutProps {
  children: React.ReactNode
  params: {
    name: string
  }
}

export default async function ProjectLayoutProps({
  children,
  params,
}: LandingLayoutProps) {
  const user = await currentUser()

  console.log(params.name, "from layout")

  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative flex h-screen items-start overflow-y-scroll">
        <Sidebar />
        <main className="mx-auto w-full py-4 lg:pl-72">
          <div className="px-4 lg:px-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
