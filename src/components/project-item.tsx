"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { cn, formatDate } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { ProjectOperation } from "@/components/project-operation"

import { Icons } from "./icons"
import { Button, buttonVariants } from "./ui/button"

interface Project {
  id: string
  companyName: string
  companyDescription: string
  companyUrl: string
  companyLogo: string
  projectOwnerId: string
  createdAt: Date
  updatedAt: Date
}

interface ProjectItemProps {
  project: Project
}

export function ProjectItem({ project }: ProjectItemProps) {
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)

  const project_name = project.companyName.split(".")[0].toLowerCase()

  return (
    <div className="flex items-center justify-between border border-border py-4 pr-8">
      <div className="mx-8">
        <Image
          src={project.companyLogo}
          width={32}
          height={32}
          alt={project.companyLogo}
        />
      </div>
      <div className="grid grow items-start gap-1">
        <Link
          href={`/dashboard/collection/${project.id}`}
          className="font-semibold hover:underline"
        >
          {project.companyName}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(project.createdAt?.toString() as string)}
          </p>
        </div>
      </div>
      {/* <ProjectOperation id={project.id} title={project.companyName} /> */}
      <div className="space-x-2">
        <Link
          href={`/project/testimonials?projectId=${project.id}`}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          View Project
        </Link>
        <Button
          onClick={() => setShowDeleteAlert(true)}
          variant="destructive"
          size="sm"
        >
          Delete
        </Button>
      </div>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this snap?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                // event.preventDefault()
                // setIsDeleteLoading(true)
                // const deleted = await deleteSnap(id)
                // if (deleted) {
                //   setIsDeleteLoading(false)
                //   setShowDeleteAlert(false)
                //   router.refresh()
                // }
              }}
              className="bg-red-600 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
