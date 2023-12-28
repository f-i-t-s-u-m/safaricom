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
import { useRouter } from "next/navigation"


export  function NewSales({user}) {

  // const [userData, setUserData] = useState()
  const [products, setProduct] = useState()
  const [saleDate, setSaleDate] = useState( new Date())
  const [showDialog, setShowDialog] = useState()
  const handleFormWithShopId = createSales.bind(null, {user_id:user.id, shop_id: user.shop_id, date:saleDate})
  const [state, formAction] = useFormState(handleFormWithShopId, {})

  const router = useRouter()

    useEffect(() => {
  

       allProducts().then(e => {
        setProduct(e)
       })

    }, [])


    useEffect(() => {
      if(state?.status == 201) {
        setShowDialog(false)
          router.push(`/shop/${user.shop_id}/users`)
      }

      else {
        console.log("error here new shop form");
      }
    }, [state, router, user])

  

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog} >
      <DialogTrigger asChild>
        <Button >Add Sales</Button>

      </DialogTrigger>
      <DialogContent className="sm:max-w-[80%] lg:max-w-[50%]">
        <DialogHeader>
          <DialogTitle><span className=" capitalize">{user.name} </span> sales record</DialogTitle>
          <DialogDescription>
            <div className="flex space-x-3 ">
              user_id - {user.user_id}
           
            </div>
          </DialogDescription>
          <div className="space-y-2 mt-3">
        <p className="text-gray-500">Date</p>
        <CalendarDateRangePicker required mode="single" onChange={setSaleDate} />
        {/* {console.log(saleDate)} */}
          </div>
        </DialogHeader>
        <form action={formAction}>
        
        <Table>
  <TableHeader>
    <TableRow>
      <TableHead className="max-w-[200px] w-44">Product</TableHead>
      <TableHead className="text-right w-[100px]">Quantity</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {products?.map((product, index) => (
      <TableRow key={product.id}>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell>

      <Input name={product.id} type="number" />
     
      </TableCell>
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
