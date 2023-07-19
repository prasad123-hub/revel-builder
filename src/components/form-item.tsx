"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Check, Copy, Share2 } from "lucide-react"
import { toast } from "sonner"

import { useCopyToClipboard } from "@/lib/copy-to-clipboard"
import { trpc } from "@/lib/trpc"
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

import { Icons } from "./icons"
import { Button, buttonVariants } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

interface Form {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  projectId: string
}

interface TestimonialItemProps {
  form: Form
}

export function FormItem({ form }: TestimonialItemProps) {
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)
  const [showShareModal, setShowShareModal] = useState<boolean>(false)

  const mutatate = trpc.form.deleteForm.useMutation()

  return (
    <div className="flex items-center justify-between rounded-xl border border-border px-8 py-4">
      <div className="grid grow items-start gap-1">
        <Link
          href={`/form/c/${form.id}`}
          className="font-semibold hover:underline"
        >
          {form.name}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(form.createdAt?.toString() as string)}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Link
          href={`/form/c/${form.id}`}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          View Form
        </Link>
        <ShareButton formId={form.id} />
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
              Are you sure you want to delete this form?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)
                const deleted = await mutatate.mutateAsync({
                  id: form.id,
                  projectId: form.projectId,
                })
                if (deleted) {
                  setIsDeleteLoading(false)
                  setShowDeleteAlert(false)
                  toast.success("Form deleted successfully")
                  router.refresh()
                } else {
                  setIsDeleteLoading(false)
                  setShowDeleteAlert(false)
                  toast.error("Something went wrong")
                }
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

FormItem.Skeleton = function FormItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}

function ShareButton({ formId }: { formId: string }) {
  const [value, copy] = useCopyToClipboard()
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  const copyToClipboard = useCallback(
    (value: string) => {
      copy(value)
      setHasCopied(true)
    },
    [copy]
  )

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"} size={"sm"}>
            <Share2 size={16} className="mr-2" />
            Share
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Copy Link</DialogTitle>
            <DialogDescription>
              You can share this link with your customers to collect
              feedback/testimonials
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-lg border border-border p-2 text-center text-sm shadow-lg">
            {`${process.env.NEXT_PUBLIC_BASE_URL}/form/t/${formId}`}
          </div>
          <Button
            onClick={() =>
              copyToClipboard(
                `${process.env.NEXT_PUBLIC_BASE_URL}/form/t/${formId}`
              )
            }
          >
            {hasCopied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                <span>Copy</span>
              </>
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
