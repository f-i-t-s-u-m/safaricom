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
import { deleteSale, updateSales } from "../_actions/sales-actions"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import CalendarDateRangePicker from "@/components/calendar-date-range-picker"
import { SubmitButton } from "@/components/submit-button"
import {useFormState} from 'react-dom'
import { useRouter } from "next/navigation"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"



export  function EditSale({data}) {

  const [saleDate, setSaleDate] = useState( data.date ?? new Date())
  const [showDialog, setShowDialog] = useState()
  const handleFormWithShopId = updateSales.bind(null, {id: data.id, date:saleDate, shop_id: data.user?.shop_id})
  const [state, formAction] = useFormState(handleFormWithShopId, {})

  const router = useRouter()

 


    useEffect(() => {
      if(state?.status == 204) {
        setShowDialog(false)
          router.refresh()
      }

      else {
        console.log("error here new shop form");
      }
    }, [state, router])

  

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog} >
      <DialogTrigger className="w-full text-left">
        {/* <Button variant="ghost" className="w-full"></Button> */}
        Edit Sale
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80%] lg:max-w-[50%]">
        <DialogHeader>
          <DialogTitle><span className=" capitalize">{data.user.name} </span> sales record</DialogTitle>
          <DialogDescription>
            <div className="flex space-x-3 ">
              user_id - {data.user.user_id}
           
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
   
      <TableRow >
      <TableCell className="font-medium">{data.name}</TableCell>
      <TableCell>

      <Input name="quantity" defaultValue={data.quantity} type="number" />
     
      </TableCell>

      
    </TableRow>
    
  </TableBody>
</Table>

        <DialogFooter className="my-5">
          
          <SubmitButton  label="Update Sales"/>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


export function DeleteSalesAlert({id}) {
    const handleFormWithShopId = deleteSale.bind(null, {id: id})
  const [state, formAction] = useFormState(handleFormWithShopId, {})
  const [showDialog, setShowDialog] = useState()
    const router = useRouter()

    useEffect(() => {
        if(state?.status == 204) {
          setShowDialog(false)
            router.refresh()
        }
  
        else {
          console.log("error here new shop form");
        }
      }, [state, router])
  

    return (

        
        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
  <AlertDialogTrigger>Delete</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete sale id : `{id} `
         from sales history and report data.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <form action={formAction}>
      
      {/* <AlertDialogAction> */}
        <SubmitButton label="Delete"/>
      {/* </AlertDialogAction> */}
      </form>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

)
}