'use server'

import { thisMonthSales } from "@/lib/sales-lib"
import supabase from "@/lib/supabase"
import { revalidatePath, revalidateTag } from "next/cache"


export async function allSales(group=false) {

    try {

        
        const res = await fetch(`${process.env.BASE_URL}/api/sales`, 
        { 
            cache:'no-cache',
            next: { 
                tags: ['sales']
            } 

    })
        
        return res.json()
    } catch {
        console.log("error");
        return []
    }
      
  


}


export async function shopSale(id, filterBy = {}, stat = false) {

    const filterQuery = `?from=${filterBy?.from}&to=${filterBy?.to}`
    const url = `${process.env.BASE_URL}/api/shop/${id}/sales${!!filterBy?.from ? filterQuery : ''}`

    try {

        const res = await fetch(url, {
            cache:'no-cache',
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

  
    const newSales = await supabase.from('sales').insert(sales)



    if(newSales.status == 201) {
        revalidateTag('sales')
        revalidatePath(`/shop/${getInfo.shop_id}/sales`)
        revalidatePath('/')
        
        return newSales
    }


    return {status:"error", data:newSales.error}

}

export async function updateSales(getInfo, someData, formData) {

    // console.log("getInfo - ", getInfo, "someData - ", someData, "formdate - ",  formData);
   
    const quantity = formData.get('quantity');

    const updateRes = await supabase.from('sales').update({
        ...getInfo, quantity
    }).eq('id', getInfo.id)

    // console.log(updateRes);

    if(updateRes.status == 204) {
        revalidateTag('sales')
        // revalidateTag('/sales')
        // revalidatePath(`/shop/${getInfo.shop_id}/sales`)
        // revalidatePath('/')
    }

    return updateRes

}

export async function deleteSale(data) {

   

    const deleteRes = await supabase.from('sales').delete().eq('id', data.id)

    // console.log(deleteRes);
    return deleteRes
}


export async function getTotalSales(filterBy) {
    
    const filterQuery = `?from=${filterBy?.from}&to=${filterBy?.to}`

    try {

        const res = await fetch(`${process.env.BASE_URL}/api/sales/total${!!filterBy?.from ? filterQuery : ''}`, {
            cache:'no-cache',
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


