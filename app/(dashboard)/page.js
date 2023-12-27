
import Overview from "@/components/overview"
import { getTotalSales } from "../_actions/sales-actions"

export default async function DashboardPage({params, searchParams}) {
  const {id} = params
  const {from, to} = searchParams
  console.log("search", searchParams);
  const totalSales = await getTotalSales({from, to}, id)
  
  return (
    <>
     <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
    <div className=" w-7/12">


      <Overview data={totalSales} />
      
    </div>
    </>
  )
}