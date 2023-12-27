'use server'

import { thisMonthSales } from "@/lib/sales-lib"
import supabase from "@/lib/supabase"
import { revalidateTag } from "next/cache"


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
        return res.json()
        
    } catch {
        console.log("error");
        return []
    }
   


}


export async function createSales(getInfo, someData, formData) {


    // console.log(getInfo);
    // const rawFormData = {
    //     id:formData?.get('id') ?? undefined,
    //     product_id:formData.get('product_id'),
    //     user_id:formData.get('user_id'),
    //     quantity: parseInt(formData.get('quantity')),
    //     // shop_id:shop_id,
       
    // }

    // const form = new formidable()

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

    // console.log(newData);
    // newData.forEach(e => console.log(e))
    // console.log(newData['c98c5e0c-6050-4dc0-84e6-8b56cb8e49d5']);

    // console.log(JSON.stringify(Object.fromEntries(formData)));
    // formData?.map(items => console.log(items))


    
    // return ""
    // console.log(sales);
    const newSales = await supabase.from('sales').insert(sales)



    if(newSales.status == 201) {
        revalidateTag(`shop-${getInfo.shop_id}-sales`)
        revalidateTag(`sales`)
        
        return {status:"ok"}
    }

    // console.log(newSales.error);

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


