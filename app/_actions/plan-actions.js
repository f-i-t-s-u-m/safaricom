'use server'

import { thisMonthSales } from "@/lib/sales-lib"
import supabase from "@/lib/supabase"
import { revalidatePath, revalidateTag } from "next/cache"


export async function allPlanes() {

    try {

        
        const res = await fetch(`${process.env.BASE_URL}/api/plan`, 
        { 
            cache:'no-cache',
            next: { 
                tags: ['plans']
            } 

    })
        
        return res.json()
    } catch {
        console.log("error");
        return []
    }
      
  


}


export async function shopPlan(id) {

    const url = `${process.env.BASE_URL}/api/plan/${id}`

    try {

        const res = await fetch(url, {
            cache:'no-cache',
            next:{
                tags:['plans']
            }
            
        })


        return res.json()
        
    } catch {
        console.log("error");
        return []
    }
   


}



export async function upsertPlan(getInfo, someData, formData) {

    // console.log("getInfo - ", getInfo, "someData - ", someData, "formdate - ",  formData);
   
    const airtime = formData.get('airtime');
    const sim_card = formData.get('sim_card');
    const device = formData.get('device');
    const date = formData.get('date');
    const shop_id = getInfo.shop_id
    const id = getInfo.id ?? undefined

    const upsertRes = await supabase.from('plan').upsert({
        id, airtime, sim_card, device, date, shop_id
    })

    console.log(upsertRes);

    if(upsertRes.status == 204) {
        revalidateTag('sales')
        // revalidateTag('/sales')
        // revalidatePath(`/shop/${getInfo.shop_id}/sales`)
        // revalidatePath('/')
    }

    return upsertRes

}

export async function deletePlan(data) {

   

    const deleteRes = await supabase.from('plan').delete().eq('id', data.id)

    // console.log(deleteRes);
    return deleteRes
}

