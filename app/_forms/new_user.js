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
import { createUser } from "../_actions/user-action"
import { SubmitButton } from "@/components/submit-button"
import { useEffect, useState } from "react"
import {useFormState} from "react-dom"

export function NewUser({shop_id, user, variant = false, label="Add new user", title="Create new profile", description = "Add new user to your shop"}) {
    // console.log("shop_id", shop_id);
    const  handleFormWithShopId = createUser.bind(null, {shop_id})
    const [showDialog, setShowDialog] = useState()
  const [state, formAction] = useFormState(handleFormWithShopId, {...user})


  useEffect(() => {
    if(state?.status == 201) {
      setShowDialog(false)
    }

    else {
      console.log("error here new shop form");
    }
  
  }, [state, user])

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button >{label}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> {title} </DialogTitle>
          <DialogDescription>
            {description}
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
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input id="phone" type="number" name="phone" className="col-span-3" />
          </div>

          <div className="space-y-3">
            <Label htmlFor="userId" className="text-right">
              User Id
            </Label>
            <Input id="userId" type="text" name="user_id"  className="col-span-3" />
          </div>

          <div className="space-y-3">
            <Label htmlFor="startDate" className="text-right" >
              Start Date
            </Label>
            <Input id="startDate" type="date" name="start_date" placeholder="Year-Month-Day"  className="col-span-3" />
          </div>

          <div className="space-y-3">
            <Label htmlFor="userType" className="text-right">
              Type
            </Label>
            <Select id="userType" name="user_type" >
               
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user type" />
                  </SelectTrigger>
                
                <SelectContent>
                  <SelectItem value="dsa">DSA</SelectItem>
                  <SelectItem value="ba">BA</SelectItem>
                  <SelectItem value="dsp">DSP</SelectItem>
                </SelectContent>
              </Select>
          </div>
        </div>
        <DialogFooter>
          <SubmitButton label={!!user ? 'Update' : 'Create user'} />
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
