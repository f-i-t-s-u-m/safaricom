"use client"

import * as React from "react"
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {useFormState} from "react-dom"
import { createShop, listShop } from "@/app/_actions/shop-actions"
import {redirect, usePathname, useRouter } from "next/navigation"
import { SubmitButton } from "./submit-button"

const groups = [
  {
    label: "Personal Account",
    teams: [
      {
        label: "Alicia Koch",
        value: "personal",
      },
    ],
  },
  {
    label: "Teams",
    teams: [
      {
        label: "Acme Inc.",
        value: "acme-inc",
      },
      {
        label: "Monsters Inc.",
        value: "monsters",
      },
    ],
  },
]


export default function ShopSwitcher({ className }, {params}) {

  
  // console.log("shops fiba", ;

  const [open, setOpen] = React.useState(false)
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)
  const [selectedTeam, setSelectedTeam] = React.useState()
  const [error, setError] = React.useState(null)

  const [shops, setShops] = React.useState()

  const path = usePathname()

  const router = useRouter()

  const shopId = path.split("/")[3] ?? null;


  React.useEffect(() => {
     const data = listShop().then(e => {
      setShops(e)
      return e
     })


     console.log("ddd", data);

    //  setSelectedTeam(old => {
    //   return data?.filter(e => e.id == shopId)
    //  })
  }, [shopId, path])
  
   console.log("selected team", selectedTeam, shopId);


  const handleForm = async (e) => {
  const res = await createShop(e)

    if(res?.status == "ok") {
      router.push(`shop/${res.data.data[0].id}`)
      setShowNewTeamDialog(false)

    }

    else {
      setError(res.data)
    }
  }
 
  return <p>Logo</p>

  // return (
  //   <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
  //     <Popover open={open} onOpenChange={setOpen}>
  //       <PopoverTrigger asChild>
  //         <Button
  //           variant="outline"
  //           role="combobox"
  //           aria-expanded={open}
  //           aria-label="Select a team"
  //           className={cn("w-[200px] justify-between", className)}
  //         >
  //           <Avatar className="mr-2 h-5 w-5">
  //             {/* <AvatarImage
  //               src={`https://avatar.vercel.sh/${selectedTeam.value}.png`}
  //               alt={selectedTeam.label}
  //             /> */}
  //             <AvatarFallback>SC</AvatarFallback>
  //           </Avatar>
  //           {selectedTeam?.name}
  //           <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
  //         </Button>
  //       </PopoverTrigger>
  //       <PopoverContent className="w-[200px] p-0">
  //         <Command>
  //           <CommandList>
  //             <CommandInput placeholder="Search team..." />
  //             <CommandEmpty>No team found.</CommandEmpty>
  //             {/* {shops.map((group) => ( */}
  //               <CommandGroup  heading="Shops">
  //                 {shops?.map((team) => (
  //                   <CommandItem
  //                     key={team.id}
  //                     onSelect={() => {

  //                           router.push(`/shop/${team.id}`)
  //                       // setSelectedTeam(team)
  //                       // setOpen(false)
  //                     }}
  //                     className="text-sm"
  //                   >
  //                     <Avatar className="mr-2 h-5 w-5">
  //                       <AvatarImage
  //                         src={`https://avatar.vercel.sh/${team.id}.png`}
  //                         alt={team.label}
  //                         className="grayscale"
  //                       />
  //                       <AvatarFallback>SC</AvatarFallback>
  //                     </Avatar>
  //                     {team.name}
  //                     <CheckIcon
  //                       className={cn(
  //                         "ml-auto h-4 w-4",
  //                         selectedTeam?.id === team?.id
  //                           ? "opacity-100"
  //                           : "opacity-0"
  //                       )}
  //                     />
  //                   </CommandItem>
  //                 ))}
  //               </CommandGroup>
  //             {/* ))} */}
  //           </CommandList>
  //           <CommandSeparator />
  //           <CommandList>
  //             <CommandGroup>
  //               <DialogTrigger asChild>
  //                 <CommandItem
  //                   onSelect={() => {
  //                     setOpen(false)
  //                     setShowNewTeamDialog(true)
  //                   }}
  //                 >
  //                   <PlusCircledIcon className="mr-2 h-5 w-5" />
  //                   Create Team
  //                 </CommandItem>
  //               </DialogTrigger>
  //             </CommandGroup>
  //           </CommandList>
  //         </Command>
  //       </PopoverContent>
  //     </Popover>
  //     <DialogContent>
  //       <DialogHeader>
  //         <DialogTitle>Create new shop</DialogTitle>
  //         <DialogDescription>
  //           Add new shop to your management dashbard

  //           {error && <p className=" text-red-600">Error: {error}</p>}
  //         </DialogDescription>
  //       </DialogHeader>
  //       <form action={handleForm}>
  //         <div className="space-y-4 py-2 pb-4">
  //           <div className="space-y-2">
  //             <Label htmlFor="name">Shop name</Label>
  //             <Input required id="name" name="name" placeholder="Shop name" />
  //           </div>
  //           <div className="space-y-2">
  //             <Label htmlFor="location">Shop location</Label>
  //             <Input id="location" required name="location" placeholder="Address" />
  //           </div>
  //         </div>
  //       <DialogFooter>
  //         <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
  //           Cancel
  //         </Button>
  //         <SubmitButton />
  //       </DialogFooter>
  //       </form>
  //     </DialogContent>
  //   </Dialog>
  // )
}


