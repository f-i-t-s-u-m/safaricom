'use client'
    import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function DateFilter() {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams  = useSearchParams()

  const getFilterBy = searchParams.get("filterBy") ?? 'week';

  console.log(pathname);

  const handleChange = (e) => {
    // console.log("welooo );
    router.push(`${pathname}?filterBy=${e}`);
  }
  

  return (
    <Select defaultValue={getFilterBy} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Filter Sales</SelectLabel>
          <SelectItem value="week">Week</SelectItem>
          <SelectItem value="month">Month</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

