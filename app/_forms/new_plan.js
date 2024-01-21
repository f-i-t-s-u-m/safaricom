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

import { SubmitButton } from "@/components/submit-button"
import { createShop } from "../_actions/shop-actions"
import { useEffect, useState } from "react"
import {useFormState} from 'react-dom'
import { useRouter } from "next/navigation"
import { revalidatePath, revalidateTag } from "next/cache"
import { upsertPlan } from "../_actions/plan-actions"


export  function NewPlan({id, shop_id, variant = false, label="Add new plan", title="Create new plan", description = "Add new plan to your shop dashboard"}) {

  const [showDialog, setShowDialog] = useState()
  const handleFormWithShopId = upsertPlan.bind(null, {id: id, shop_id: shop_id ?? undefined})
  const [state, formAction] = useFormState(handleFormWithShopId, {})

const router = useRouter()



    useEffect(() => {
      if(state?.status == 201) {
        // console.log("state of mind - ", state);
        setShowDialog(false)
        // revalidatePath('shops')
        router.refresh()
        // if(state.data[0].id ) {
        //   // router.refresh()
        //   // router.push(`/shop/${state.data[0].id}`)
        //   console.log();
        // }
      }

      else {
        console.log("error here new shop form");
      }

      return
    
    }, [state, router])
    


  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
       
          
                  <DialogTrigger asChild>
                  <Button variant={variant} >{label}</Button>
                  </DialogTrigger>
          
          
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {description}
  
            </DialogDescription>
          </DialogHeader>
          <form action={formAction}>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="airtime">Airtime target</Label>
                <Input type="number" defaultValue={state.airtime} required id="airtime" name="airtime" placeholder="Monthly airtime target" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sim_card">Sim Card target</Label>
                <Input id="sim_card" type="number" defaultValue={state.sim_card}  required name="sim_card" placeholder="Monthly sim card target" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="device">Device target</Label>
                <Input id="device" type="number" defaultValue={state.device}  required name="device" placeholder="Monthly device target" />
              </div>

              <div className="space-y-3">
            <Label htmlFor="startDate" className="text-right" >
              Month
            </Label>
            <Input id="date" type="date" name="date" placeholder="Year-Month-Day"  className="col-span-3" />
          </div>

              
            </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <SubmitButton label={label == "Edit" ? "Update" : undefined} />
          </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
  )
}
