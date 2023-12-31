import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns= [
  {
    id:'user id',
    accessorKey: "user.user_id",
    header: ({ column }) => (
      <DataTableColumnHeader  column={column} title="User ID" />
    ),
    cell: ({ row }) => (
      row.original.user?.user_id
    ),

  },

  {
    id:'user name',
    accessorKey: "user.name",
    header: ({ column }) => (
      <DataTableColumnHeader className=" text-right " column={column} title="User" />
    ),
    cell: ({ row }) => row.original.user?.name,
  },
  {
    id:"name",
    accessorKey: "name",
    
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
    cell: ({ row }) => row.getValue("name")
    
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("date")}</div>,
  },

  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("quantity")}</div>,
  },
  {
    accessorKey: "revenue",
    header: ({ column }) => (
      <DataTableColumnHeader className=" text-right " column={column} title="Revenue" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("revenue"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className=" font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]