export default async function ReviewFormLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="flex min-h-screen w-full items-center justify-center bg-slate-200 p-4 py-8">
        {children}
      </main>
    </>
  )
}
