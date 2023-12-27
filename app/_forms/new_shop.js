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
import { createShop } from "../_actions/shop-actions"


export  function NewShop() {

  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false)


  const handleForm = async (e) => {
    const res = await createShop(e)
  
      if(res?.status == "ok") {
        router.push(`shop/${res.data.data[0].id}`)
        setShowNewTeamDialog(false)
  
      }
  
      else {
        setError(res.data)
      }

      return true
    }

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
       
          
                  <DialogTrigger asChild>
                  <Button  onClick={() => setShowNewTeamDialog(true)}>Add new shop</Button>
                  </DialogTrigger>
          
          
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new shop</DialogTitle>
            <DialogDescription>
              Add new shop to your management dashboard
  
            </DialogDescription>
          </DialogHeader>
          <form action={handleForm}>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="name">Shop name</Label>
                <Input required id="name" name="name" placeholder="Shop name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Shop location</Label>
                <Input id="location" required name="location" placeholder="Address" />
              </div>
            </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
              Cancel
            </Button>
            <SubmitButton />
          </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
  )
}
