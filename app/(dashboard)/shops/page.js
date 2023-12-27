
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


import ShopSwitcher from "@/components/shop-switcher"
import MainNav from "@/components/main-nav"
import CalendarDateRangePicker from "@/components/calendar-date-range-picker"
import CardWithImg from "@/components/card-with-img"
import User from "@/components/user"
import { listShop } from "@/app/_actions/shop-actions"
import { NewShop } from "@/app/_forms/new_shop"

export default async function DashboardPage() {
  const shops = await listShop()
  return (
    <>
    <div className="flex justify-between">
    <div>
     <h2 className="text-3xl mb-0 pb-1 font-bold tracking-tight">Shops</h2>
     <p className="text-gray-600">List of active shops</p>
    </div>

      <NewShop />
     
    </div>
    <div className="grid grid-cols-4 gap-6">

          {shops.map(e => (
            
            <CardWithImg key={e.id} {...e} />
          ))}

    
      
    </div>
    </>
  )
}