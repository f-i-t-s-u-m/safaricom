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
import { useEffect, useState } from "react"
import {useFormState} from "react-dom"
import { useRouter } from "next/navigation"
import { upload_csv } from "../_actions/sales-actions"

export default function CsvUpload({shop_id = "2000"}) {

    const [showDialog, setShowDialog] = useState()
    const [error, setError] = useState()
    const handleFormWithInit = upload_csv.bind(null, {shop_id})
  const [state, formAction] = useFormState(handleFormWithInit, {})
  const router = useRouter()
  useEffect(() => {
    if(state?.status == 201) {
      setShowDialog(false)
      router.refresh()
    }

    else {
      // console.log("error here new shop form");
      console.log(" state ", state);
      setError({status:state?.status, message:state?.error?.message})
    }
  
  }, [state, router])

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button>CSV Upload</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload your csv file</DialogTitle>
          <DialogDescription>
            Create bulk sales record

            <p className="text-red-600">{error?.message}</p>
          </DialogDescription>
        </DialogHeader>

        
        <form action={formAction}>

        <div className="grid gap-4 py-4">
        <div className="space-y-3">
            <Label htmlFor="date" className="text-right">
              Sales Date
            </Label>
            <Input required id="date" type="date" name="date" className="col-span-3" />
          </div>

          <div className="space-y-3">
            <Label htmlFor="name" className="text-right">
              Upload CSV file
            </Label>
            <Input required id="name" type="file" accept=".csv" name="file" className="col-span-3" />
          </div>
          
        </div>
        <DialogFooter>
          <SubmitButton label="Upload" />
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
