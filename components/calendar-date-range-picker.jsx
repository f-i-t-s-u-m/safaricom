"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format, subDays } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function CalendarDateRangePicker({
  className, mode="range", onChange = null, url = null
}) {
  const searchParams  = useSearchParams()
  const getFilterBy = searchParams.get("filterBy") ?? 'week';
  
  const generateDate = onChange ? new Date() : {to: new Date(), from: subDays(new Date(), 7)}

  const [date, setDate] = React.useState(generateDate)

  const router = useRouter()

  const pathname = usePathname()


  console.log(pathname);

 

  const handleChange = (date) => {
    setDate(date)
    // console.log(date);
    if(onChange) {
      onChange(date)
    }

    else {

      // onChange(date)
      const startDate = date.from.toISOString().slice(0,10)
      const endDate = date.to.toISOString().slice(0,10)
      router.push(`${pathname}?from=${startDate}&to=${endDate}`);
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : date ? format(date, "PPP") : (
              <span>Pick a date</span>
            )} 
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode={mode}
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleChange}
            
            numberOfMonths={mode == "range" ? 2 : 1}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}