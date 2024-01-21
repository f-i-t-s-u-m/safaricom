'use server'

import { thisMonthSales } from "@/lib/sales-lib"
import supabase from "@/lib/supabase"
import  csvToJson, { csvStringToJson }  from "convert-csv-to-json"
import { writeFile } from "fs/promises"
import { revalidatePath, revalidateTag } from "next/cache"
import { allProducts } from "./product-actions"
import { listShopUsers } from "./shop-actions"
// import formidable from "formidable"


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

export async function upload_csv(bindData, init_data, formData) {
    // console.log(formData);
    const path = "public/upload/safari.csv"

    
    
    const file = formData.get('file')
    const date = formData.get("date")

    // console.log();

    const bytes = await file.arrayBuffer()

    const file_buffer = Buffer.from(bytes)

    const fileString = file_buffer.toString('utf-8')


    const parseSales = csvToJson.indexHeader(14).fieldDelimiter(',').csvStringToJson(fileString)

    
    const filterParseSales = parseSales.filter(e => e.UserID && e.UserName && e.UserID != "Total");
    const results = await prepareSalesData(filterParseSales, date, bindData?.shop_id)
    // console.log(results);

    if(!results.length) {   
        return {staus:"403", message:"no data to insert"}
    }
    const newSales = await supabase.from('sales').insert(results)
    // console.log(newSales);
    return newSales

}



async function prepareSalesData(data, date, shop_id) {

    const results = []
   const products = await allProducts()
   const salers = await listShopUsers(shop_id)

        data.forEach(user => { 
            
            // console.log(Object.keys(user));
            let userId = user['UserID']
            let userInfo = salers.filter(saler => saler?.user_id == userId)
            // console.log(userInfo, "done");
            let soldProducts = Object.keys(user)
            
            soldProducts.forEach(name => {
                if(parseInt(user[name])) {

                    let linkedProduct = products.filter(pro => pro.name.replaceAll(" ", '') == name)
                    if(linkedProduct.length) {
                        
                        let salesItem = {
                            user_id: userInfo?.[0]?.id,
                            product_id: linkedProduct?.[0]?.id,
                            shop_id: shop_id,
                            date:date,
                            quantity: parseInt(user[name])
                        
                    }

                    results.push(salesItem)
                }
            }
            })
            


    })
   

    return results

}
