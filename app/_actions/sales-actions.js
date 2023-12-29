'use server'

import { thisMonthSales } from "@/lib/sales-lib"
import supabase from "@/lib/supabase"
import { revalidatePath, revalidateTag } from "next/cache"


export async function allSales(group=false) {

    try {

        
        const res = await fetch(`${process.env.BASE_URL}/api/sales`, {
            next:{
                tags:['sales']
            }
        })
        
        return res.json()
    } catch {
        console.log("error");
        return []
    }
      
  


}


export async function shopSale(id, filterBy = {}, stat = false,) {

    const filterQuery = `?from=${filterBy?.from}&to=${filterBy?.to}`
    const url = `${process.env.BASE_URL}/api/shop/${id}/sales${!!filterBy?.from ? filterQuery : ''}`

    try {

        const res = await fetch(url, {
            next:{
                tags:['sales']
            }
        })


        if(stat) {
            const sales = await res.json()
            return thisMonthSales(sales)
        }

        return res.json()
        
    } catch {
        console.log("error");
        return []
    }
   


}


export async function createSales(getInfo, someData, formData) {


  
    const sales = Object.keys(Object.fromEntries(formData))
    ?.map((item) => {
        return {
            product_id:item,
            quantity:Object.fromEntries(formData)[item],
            user_id: getInfo?.user_id,
            shop_id:getInfo?.shop_id,
            date:getInfo?.date.toISOString().split("T")[0]
        }
    }).filter(e => e.quantity && e.product_id)

  
    const newSales = await supabase.from('sales').upsert(sales)



    if(newSales.status == 201) {
        revalidateTag('sales')
        revalidatePath(`/shop/${getInfo.shop_id}/sales`)
        revalidatePath('/')
        
        return newSales
    }


    return {status:"error", data:newSales.error}

}

export async function getTotalSales(filterBy) {
    
    const filterQuery = `?from=${filterBy?.from}&to=${filterBy?.to}`

    try {

        const res = await fetch(`${process.env.BASE_URL}/api/sales/total${!!filterBy?.from ? filterQuery : ''}`, {
            next:{
                tags:['sales']
            }
        })
        return res.json()

    } catch {
        console.log("error");
        return []
    }

}


// export  function generateReport ()


