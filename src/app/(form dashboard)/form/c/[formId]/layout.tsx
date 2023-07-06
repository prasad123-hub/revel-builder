export default async function NewFormPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className="flex-1 2xl:container">{children}</main>
}
