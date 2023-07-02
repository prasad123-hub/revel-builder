import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { ProjectItem } from "@/components/project-item"

const projects: Project[] = [
  {
    id: 1,
    name: "Revel",
    description: "Revel is a testimonial collection tool.",
    url: "https://revel.netlify.app",
    image: "/revel.svg",
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "Revel",
    description: "Revel is a testimonial collection tool.",
    url: "https://revel.netlify.app",
    image: "/revel.svg",
    createdAt: new Date(),
  },
]

interface Project {
  id: number
  name: string
  description: string
  url: string
  image: string
  createdAt?: Date
}

export default async function DashbaordPage() {
  return (
    <>
      <div className="w-full py-12 md:py-14 lg:py-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text font-hand text-xl font-semibold text-transparent">
              Peoject wise testimonials
            </h3>
            <h1 className="max-w-xl py-2 pb-6 font-cal text-4xl font-bold">
              Your Projects
            </h1>
          </div>
          <div className="py-2 md:py-0">
            <Link
              href="/dashboard/new-project"
              className={cn(buttonVariants({ size: "sm" }))}
            >
              Create New Project
            </Link>
          </div>
        </div>
        {projects.length > 0 ? (
          <>
            {projects.map((project) => (
              <ProjectItem key={project.id} project={project as Project} />
            ))}
          </>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="logo" />
            <EmptyPlaceholder.Title>No projects created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any projects created yet. Start creating
              project and collect testimonials.
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
      </div>
    </>
  )
}
