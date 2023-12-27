'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { allProducts, createProduct } from "../_actions/product-actions"
import { createSales } from "../_actions/sales-actions"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { allUsers } from "../_actions/user-action"
import { Calendar } from "@/components/ui/calendar"
import CalendarDateRangePicker from "@/components/calendar-date-range-picker"
import { SubmitButton } from "@/components/submit-button"
import {useFormState} from 'react-dom'


export  function NewSales({shop_id}) {

  const [userData, setUserData] = useState()
  const [products, setProduct] = useState()
  const [activeCategory, setActiveCategory] = useState()
  const handleFormWithShopId = createSales.bind(null, shop_id)
  const [state, formAction] = useFormState(createSales, {shop_id})

    useEffect(() => {
       allUsers().then(e => {
        setUserData(e)
        // return e
       })

       allProducts().then(e => {
        setProduct(e)
       })

    }, [])

  

  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button >Add Sales</Button>

      </DialogTrigger>
      <DialogContent className="sm:max-w-[80%] lg:max-w-[50%]">
        <DialogHeader>
          <DialogTitle>Add sales</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
        <CalendarDateRangePicker mode="single" />
        <Select >
              
                  <SelectTrigger>
                    <SelectValue placeholder="Select products" />
                  </SelectTrigger>
              
                <SelectContent>
                  {products?.map(e => (

                  <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>
                  ))}
                  
                </SelectContent>
              </Select>
        <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead >ID</TableHead>
      <TableHead>Name</TableHead>
      <TableHead className="max-w-[200px] w-44">Method</TableHead>
      <TableHead className="text-right w-[100px]">Quantity</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {userData?.map((user, index) => (
      <TableRow key={user.id}>
        <Input type="hidden" name={`user[${index}][user_id]`} value={user.id} />
      <TableCell>{user.user_id}</TableCell>
      <TableCell className="font-medium">{user.name}</TableCell>
      <TableCell>
      <Select name={`user[${index}][type]`}>
              
                  <SelectTrigger>
                    <SelectValue placeholder="Select products" />
                  </SelectTrigger>
              
                <SelectContent>
                  {products?.map(e => (

                  <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>
                  ))}
                  
                </SelectContent>
              </Select>
      </TableCell>
      <TableCell className="text-right"><Input name={`user[${index}][quantity]`} type="number" /></TableCell>
    </TableRow>
      ))}
  </TableBody>
</Table>

        <DialogFooter>
          
          <SubmitButton  label="Create Sales"/>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
