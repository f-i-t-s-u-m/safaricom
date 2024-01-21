
import Overview from "@/components/overview"
import { getTotalSales } from "../_actions/sales-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecentSales from "@/components/recent-sales";

export default async function DashboardPage({params, searchParams}) {
  const {id} = params
  const {from, to} = searchParams
  // console.log("search", searchParams);
  const totalSales = await getTotalSales({from, to}, id)
  
  return (
    <>
     <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

                    <Overview data={totalSales} />
                  


                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Target and Achievement</CardTitle>
                     
                    <CardDescription>
                      This month target and achievement report
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
      
    </div>
    </>
  )
}