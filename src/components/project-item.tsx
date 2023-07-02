import Image from "next/image"
import Link from "next/link"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { ProjectOperation } from "@/components/project-operation"

interface Project {
  id: number
  name: string
  description: string
  url: string
  image: string
  createdAt?: Date
}

interface ProjectItemProps {
  project: Project
}

export function ProjectItem({ project }: ProjectItemProps) {
  return (
    <div className="flex items-center justify-between border border-border p-4">
      <div>
        <Image src={project.image} width={32} height={32} alt={project.name} />
      </div>
      <div className="ml-10 grid grow items-start gap-1">
        <Link
          href={`/dashboard/collection/${project.id}`}
          className="font-semibold hover:underline"
        >
          {project.name}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(project.createdAt?.toString() as string)}
          </p>
        </div>
      </div>
      <ProjectOperation id={project.id} title={project.name} />
    </div>
  )
}

ProjectItem.Skeleton = function SnapItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
