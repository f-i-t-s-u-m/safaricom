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
import { createProduct } from "../_actions/product-actions"
import { SubmitButton } from "@/components/submit-button"
import { useEffect, useState } from "react"
import {useFormState} from "react-dom"
import { useRouter } from "next/navigation"

export function NewProduct() {

    const [showDialog, setShowDialog] = useState()
  const [state, formAction] = useFormState(createProduct, {})
  const router = useRouter()
  useEffect(() => {
    if(state?.status == 201) {
      setShowDialog(false)
      router.refresh()
    }

    else {
      console.log("error here new shop form");
    }
  
  }, [state, router])

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button>Add new product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new product</DialogTitle>
          <DialogDescription>
            create new products
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>

        <div className="grid gap-4 py-4">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" name="name" className="col-span-3" />
          </div>
          <div className="space-y-3">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input id="price" name="price" className="col-span-3" />
          </div>

          

          

          <div className="space-y-3">
            <Label htmlFor="username" className="text-right">
              Type
            </Label>
            <Select name="product_type" >
               
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user type" />
                  </SelectTrigger>
                
                <SelectContent>
                  <SelectItem value="air_time">Air Time</SelectItem>
                  <SelectItem value="sim_card">Sim Card</SelectItem>
                  <SelectItem value="device">Device</SelectItem>
                </SelectContent>
              </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="icon_url" className="text-right">
              Product Icon Url
            </Label>
            <Input id="icon_url" name="icon_url" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <SubmitButton label="Create new product" />
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
