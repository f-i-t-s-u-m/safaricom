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


export  function NewShop({shop, variant = false, label="Add new shop", title="Create new shop", description = "Add new shop to your management dashboard"}) {

  const [showNewTeamDialog, setShowNewTeamDialog] = useState()
  const handleFormWithShopId = createShop.bind(null, {id:shop?.id ?? undefined})
  const [state, formAction] = useFormState(handleFormWithShopId, {...shop})

const router = useRouter()



    useEffect(() => {
      if(state?.status == 201) {
        setShowNewTeamDialog(false)
        if(state.data[0].id ) {
          router.push(`/shop/${state.data[0].id}`)
        }
      }

      else {
        console.log("error here new shop form");
      }
    
    }, [state, router, shop])
    


  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
       
          
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
                <Label htmlFor="name">Shop name</Label>
                <Input type="text" defaultValue={state.name} required id="name" name="name" placeholder="Shop name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Shop location</Label>
                <Input id="location" defaultValue={state.location}  required name="location" placeholder="Address" />
              </div>
            </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
              Cancel
            </Button>
            <SubmitButton label={label == "Edit" ? "Update" : undefined} />
          </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
  )
}
