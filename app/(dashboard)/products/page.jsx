import { allProducts } from "@/app/_actions/product-actions"
import { NewProduct } from "@/app/_forms/new_product"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DotsVerticalIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons"

export default async function page() {
  
    const products = await allProducts()

  return (
  <>
      <div className='mb-10'>
     <h2 className="text-3xl mb-0 pb-1 font-bold tracking-tight">Products</h2>
     <p className="text-gray-600">All of your products</p>
    </div>
    <Table>
    <TableCaption>A list of products.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="">Name</TableHead>
        <TableHead>Icon</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Type</TableHead>
        <TableHead className="text-right">Action</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {products.map((item) => (
        <TableRow key={item.id}>
          <TableCell className="font-medium">{item.name}</TableCell>
          <TableCell>{item.icon}</TableCell>
          <TableCell>{item.price}</TableCell>
          <TableCell className="capitalize">{item.product_type.split("_").join(" ")}</TableCell>
          <TableCell className="text-right">
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              {/* <MoreVertical className="h-4 w-4" /> */}
              <DotsVerticalIcon />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="gap-x-2">
              <Pencil1Icon />
              Edit 
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-x-2 bg-red-600 text-white">
              <TrashIcon className=" font-extrabold" />
              Delete 
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
    
  </Table>
  
      </>
  )
}




   
