'use client'
import { ReloadIcon } from "@radix-ui/react-icons"
 
import { Button } from "@/components/ui/button"

import { useFormStatus } from 'react-dom'
 
export function SubmitButton({label = "Create", className = ''}) {

    const { pending } = useFormStatus()


  return (
    <Button type="submit" disabled={pending} className={className}>
      {!pending ? label :
      <>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      Please wait
      </>
       }
    </Button>
  )
}