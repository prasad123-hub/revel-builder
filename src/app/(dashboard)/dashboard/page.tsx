import { Button } from "@/components/ui/button"
import { EmptyPlaceholder } from "@/components/empty-placeholder"

export default async function DashbaordPage() {
  return (
    <>
      <div className="w-full py-12 md:py-14 lg:py-20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text font-hand text-xl font-semibold text-transparent">
              Peoject wise testimonials
            </h3>
            <h1 className="max-w-xl py-2 pb-6 font-cal text-4xl font-bold">
              Your Projects
            </h1>
          </div>
          <div>
            <Button variant="default" size="sm">
              Create New Project
            </Button>
          </div>
        </div>
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="logo" />
          <EmptyPlaceholder.Title>No projects created</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any projects created yet. Start creating project
            and collect testimonials.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      </div>
    </>
  )
}
