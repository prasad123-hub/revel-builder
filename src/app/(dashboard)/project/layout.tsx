import { Sidebar } from "@/components/sidebar"

export default async function ProjectLayoutProps({
  children,
}: {
  children: React.ReactNode
}) {
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
