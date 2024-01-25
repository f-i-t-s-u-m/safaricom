
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
import Overview from "@/components/overview"
import RecentSales from "@/components/recent-sales"
import { getShop } from "@/app/_actions/shop-actions"
import { NewUser } from "@/app/_forms/new_user"
import { NewSales } from "@/app/_forms/new_sales"
import DashboardCards from "@/components/dashboard-cards"
import { getTotalSales, shopSale } from "@/app/_actions/sales-actions"

export default async function DashboardPage({params, searchParams}) {
  const {id} = params
  // const shop = await getShop(id)

  const {from, to} = searchParams
  const totalSales = await shopSale(id, {from, to}, true, false)


  return (
    <>
      
      <div className=" flex-col md:flex px-6">
       
        <div className="flex-1 space-y-4 md:p-8 pt-6">
          
              <DashboardCards totalSales={totalSales} />
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
               
                    <Overview data={totalSales}/>
                 
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Target and Achievement</CardTitle>
                     
                    <CardDescription>
                      This month target and achievement report
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales id={id} />
                  </CardContent>
                </Card>
              </div>
           
        </div>
      </div>
    </>
  )
}