
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import Overview from "@/components/overview"
import RecentSales from "@/components/recent-sales"
import DashboardCards from "@/components/dashboard-cards"
import {shopSale } from "@/app/_actions/sales-actions"

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