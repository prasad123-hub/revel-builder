import * as React from "react"
import Image from "next/image"
import type { FileWithPreview } from "@/types"
import {
  useDropzone,
  type Accept,
  type FileRejection,
  type FileWithPath,
} from "react-dropzone"
import type {
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from "react-hook-form"
import { toast } from "sonner"

import { formatBytes } from "@/lib/utils"

import { Input } from "./ui/input"

interface FileDialogProps<TFieldValues extends FieldValues>
  extends React.HTMLAttributes<HTMLDivElement> {
  name: Path<TFieldValues>
  setValue: UseFormSetValue<TFieldValues>
  accept?: Accept
  maxSize?: number
  maxFiles?: number
  files: FileWithPreview[] | null
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>
  isUploading?: boolean
  disabled?: boolean
}

export function ProfileImageUploader<TFieldValues extends FieldValues>({
  name,
  setValue,
  accept = {
    "image/*": [],
  },
  maxSize = 1024 * 1024 * 2,
  maxFiles = 1,
  files,
  setFiles,
  isUploading = false,
  disabled = false,
  className,
  ...props
}: FileDialogProps<TFieldValues>) {
  const onDrop = React.useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      setValue(
        name,
        acceptedFiles as PathValue<TFieldValues, Path<TFieldValues>>,
        {
          shouldValidate: true,
        }
      )

      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ errors }) => {
          if (errors[0]?.code === "file-too-large") {
            toast.error(
              `File is too large. Max size is ${formatBytes(maxSize)}`
            )
            return
          }
          errors[0]?.message && toast.error(errors[0].message)
        })
      }
    },

    [maxSize, name, setFiles, setValue]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
    multiple: maxFiles > 1,
    disabled,
  })

  // Revoke preview url when component unmounts
  React.useEffect(() => {
    return () => {
      if (!files) return
      files.forEach((file) => URL.revokeObjectURL(file.preview)) // Make sure to revoke the data uris to avoid memory leaks
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div {...getRootProps()} {...props} className="flex items-center">
        <Input {...getInputProps()} id={props.id} disabled={disabled} />
        <div className="">
          <div>
            {files?.length ? (
              <div className="grid gap-5">
                {files?.map((file, i) => (
                  <FileCard
                    key={i}
                    i={i}
                    name={name}
                    setValue={setValue}
                    files={files}
                    setFiles={setFiles}
                    file={file}
                  />
                ))}
              </div>
            ) : (
              <span className="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                <svg
                  className="h-full w-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

interface FileCardProps<TFieldValues extends FieldValues> {
  i: number
  file: FileWithPreview
  name: Path<TFieldValues>
  setValue: UseFormSetValue<TFieldValues>
  files: FileWithPreview[] | null
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>
}

function FileCard<TFieldValues extends FieldValues>({
  file,
}: FileCardProps<TFieldValues>) {
  return (
    <div className="relative">
      <div className="">
        <Image
          src={file.preview}
          alt={file.name}
          className="h-10 w-10 shrink-0 rounded-full object-cover"
          width={40}
          height={40}
          loading="lazy"
        />
        {/* <div className="flex flex-col">
          <p className="line-clamp-1 text-sm font-medium text-muted-foreground">
            {file.name}
          </p>
        </div> */}
      </div>
    </div>
  )
}
