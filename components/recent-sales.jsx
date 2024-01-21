import { listShopUsers } from "@/app/_actions/shop-actions"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { LProgressBar } from "./progressBar"
import { allPlanes, shopPlan } from "@/app/_actions/plan-actions"
import { NewPlan } from "@/app/_forms/new_plan"
import { getFirstLastDaysOfMon } from "@/lib/dates-lib"
import { getTotalSales, shopSale } from "@/app/_actions/sales-actions"
import { calculateTotals } from "@/lib/sales-lib"
import { generateAchievement } from "@/lib/plans-lib"
import RProgressBar from "./raduisProgressBar"
  
  export default async function RecentSales({id = null}) {

    const [start, end] = getFirstLastDaysOfMon()
    let plan
    let monthlySales


    if(id) {
       plan = await shopPlan(id)
       monthlySales = await shopSale(id, {start, end}, true)
    }

    else {
      plan = await allPlanes()
      monthlySales = await getTotalSales({from:start, to:end})
    }
    const totalSales = calculateTotals(monthlySales)
    // console.log("plan ", plan);
    if(plan.length) {
      const percentage = generateAchievement(plan, totalSales)

      return (
        
        <div className="space-y-5">

          <div className="w-full flex justify-center">

            <RProgressBar percentage={percentage.total} />
          </div>

         
        
        <LProgressBar  label="Airtime" percentage={percentage.airtime} target={plan[0].airtime}  sales={totalSales.air_time} />
        <LProgressBar  label="Sim Card" percentage={percentage.sim_card} target={plan[0].sim_card}  sales={totalSales.sim_card} />
        <LProgressBar  label="Device" percentage={percentage.device} target={plan[0].device}  sales={totalSales.device} />
    
        </div> 
  )
} else {

  if(id) {

    
    return (
      <NewPlan shop_id={id} />
      )
    }
}
  }