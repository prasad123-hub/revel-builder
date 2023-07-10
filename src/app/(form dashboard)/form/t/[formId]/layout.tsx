export default async function ReviewFormLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="flex min-h-screen w-full items-center justify-center bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 p-4 py-8">
        {children}
      </main>
    </>
  )
}
