'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { DotsVerticalIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { NewShop } from '@/app/_forms/new_shop'
import { Button } from './ui/button'

export default function ActionDropdown({data}) {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon">
        <DotsVerticalIcon/>
        <span className="sr-only">More</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
     

      <DropdownMenuItem onSelect={e => e.preventDefault()}  className="m-0 p-0">
        <div className='flex  w-full items-center  px-2'>
        <Pencil1Icon />
        <NewShop variant="ghost" shop={data}  label="Edit" title="Edit " description="edit your shop" type="ghost" />
        </div>
      </DropdownMenuItem>

      <DropdownMenuItem className="gap-x-2 bg-red-600 text-white">
        <TrashIcon className=" font-extrabold" />
        Delete 
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}
