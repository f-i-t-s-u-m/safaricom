"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import Link from "next/link"
import { DeleteSalesAlert, EditSale } from "@/app/_forms/edit_sales"




export function DataTableRowActions({
  row,
}) {

  const userId = row.original?.user?.id


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onSelect={e => e.preventDefault()}>
          <EditSale data={row.original} />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="block w-full" href={`/user/${userId}`}>

          View User
          </Link>
          </DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={e => e.preventDefault()}>
          <DeleteSalesAlert id={row.original.id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}