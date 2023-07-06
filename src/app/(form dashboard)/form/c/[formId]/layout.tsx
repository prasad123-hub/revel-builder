export default async function NewFormPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 md:px-8 lg:px-12">
      {children}
    </main>
  )
}
