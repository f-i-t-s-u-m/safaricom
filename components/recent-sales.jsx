import { listShopUsers } from "@/app/_actions/shop-actions"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { LProgressBar } from "./progressBar"
import { shopPlan } from "@/app/_actions/plan-actions"
import { NewPlan } from "@/app/_forms/new_plan"
import { getFirstLastDaysOfMon } from "@/lib/dates-lib"
import { shopSale } from "@/app/_actions/sales-actions"
import { calculateTotals } from "@/lib/sales-lib"
  
  export default async function RecentSales({id}) {
    const plan = await shopPlan(id)
    const [start, end] = getFirstLastDaysOfMon()
    const shopMonthlySales = await shopSale(id, {start, end}, true)
    const totalSales = calculateTotals(shopMonthlySales)
    console.log("plan ", plan);
    if(plan.length) {

      return (
        
        <div className="space-y-5">
        
        <LProgressBar label="Airtime" target={plan[0].airtime}  sales={totalSales.air_time} />
        <LProgressBar label="Sim Card" target={plan[0].sim_card}  sales={totalSales.sim_card} />
        <LProgressBar label="Device" target={plan[0].device}  sales={totalSales.device} />
    
        </div> 
  )
} else {
  return (
    <NewPlan shop_id={id} />
    )
}
  }