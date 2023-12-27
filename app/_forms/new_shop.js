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
import { useState } from "react"
import { useRouter } from "next/navigation"


export  function NewShop() {

  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false)

const router = useRouter()
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
