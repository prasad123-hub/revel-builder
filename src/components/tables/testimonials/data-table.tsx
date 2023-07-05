"use client"

import * as React from "react"
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StarRating } from "@/components/star-rating"

const data: Testimonial[] = [
  {
    id: "m5gr84i9",
    designation: "CEO",
    name: "Prasad",
    testimonial:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore doloremque harum dignissimos rem, adipisci architecto doloribus eius cupiditate delectus consectetur",

    person:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    status: "Approved",
    email: "prasad@gmail.com",
  },
  {
    id: "3u1reuv4",
    name: "Rajesh",
    designation: "CEO",
    testimonial:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore doloremque harum dignissimos rem, adipisci architecto doloribus eius cupiditate delectus consectetur",
    person:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",

    status: "Approved",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    name: "Mahesh",
    designation: "CEO",
    testimonial:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore doloremque harum dignissimos rem, adipisci architecto doloribus eius cupiditate delectus consectetur",

    person:
      "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHVzZXJzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    status: "Approved",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    name: "Ramesh",
    designation: "CEO",
    testimonial:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore doloremque harum dignissimos rem, adipisci architecto doloribus eius cupiditate delectus consectetur",
    person:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    status: "Approved",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    name: "Suresh",
    designation: "CEO",
    testimonial: "This is some testimonial text.",
    person:
      "https://images.unsplash.com/photo-1563237023-b1e970526dcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHVzZXJzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    status: "Unapproved",
    email: "carmella@hotmail.com",
  },
]

export type Testimonial = {
  id: string
  name: string
  testimonial: string
  //   persom coloum as object
  designation: string
  person: string
  status: "Approved" | "Unapproved"
  email: string
}

export const columns: ColumnDef<Testimonial>[] = [
  {
    accessorKey: "person",
    header: ({ column }) => {
      return <div className="ml-4">Person</div>
    },
    cell: ({ row }) => {
      const name = row.original.name
      const email = row.original.email
      const designation = row.original.designation
      return (
        <div className="ml-4 flex items-center">
          <div>
            <img
              className="inline-block h-9 w-9 rounded-full object-cover"
              src={`${row.getValue("person")}`}
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
              {name}
            </p>
            <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
              {designation}
            </p>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "email",
    header: () => <div className="ml-8 max-w-min">Email</div>,
    cell: ({ row }) => {
      return (
        <div className="ml-8">
          <p className="text-xs">{row.getValue("email")}</p>
        </div>
      )
    },
  },
  {
    accessorKey: "testimonial",
    header: () => <div className="ml-8 max-w-min">Testimonials</div>,
    cell: ({ row }) => {
      return (
        <div className="ml-8 max-w-md">
          <StarRating readOnly />
          <p className="mt-2 text-xs">{row.getValue("testimonial")}</p>
        </div>
      )
    },
  },
  {
    accessorKey: "date",
    header: () => <div className="max-w-min">Date</div>,
    cell: ({ row }) => (
      <div className="text-xs capitalize">{new Date().getFullYear()}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="ml-8 max-w-min">Status</div>,
    cell: ({ row }) => (
      <div className="ml-8 text-xs capitalize">{row.getValue("status")}</div>
    ),
  },
  //   {
  //     id: "actions",
  //     enableHiding: false,
  //     cell: ({ row }) => {
  //       const payment = row.original

  //       return (
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="ghost" className="h-8 w-8 p-0">
  //               <span className="sr-only">Open menu</span>
  //               <DotsHorizontalIcon className="h-4 w-4" />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="end">
  //             <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //             <DropdownMenuItem
  //               onClick={() => navigator.clipboard.writeText(payment.id)}
  //             >
  //               Copy payment ID
  //             </DropdownMenuItem>
  //             <DropdownMenuSeparator />
  //             <DropdownMenuItem>View customer</DropdownMenuItem>
  //             <DropdownMenuItem>View payment details</DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       )
  //     },
  //   },
]

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="py-6" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
