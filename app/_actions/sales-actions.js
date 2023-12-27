'use server'

import { thisMonthSales } from "@/lib/sales-lib"
import supabase from "@/lib/supabase"
import { revalidateTag } from "next/cache"


export async function allSales(group=false) {
    const res = await fetch(`${process.env.BASE_URL}/api/sales`, {
        next:{
            tags:['sales']
        }
    })

        if(group) {
            const resJson = await res.json()
            return ByProductType(resJson)
        }
  

    return res.json()

}


export async function shopSale(id, filterBy = {}, stat = false,) {

    const filterQuery = `?from=${filterBy?.from}&to=${filterBy?.to}`
    const url = `${process.env.BASE_URL}/api/shop/${id}/sales${!!filterBy?.from ? filterQuery : ''}`
    const res = await fetch(url, {
        next:{
            tags:['sales']
        }
    })


   

    if (stat) {
            const resJson = await res.json()
            return  thisMonthSales(resJson)
        
    }

    return res.json()

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
    const res = await fetch(`${process.env.BASE_URL}/api/sales/total${!!filterBy?.from ? filterQuery : ''}`, {
        next:{
            tags:['sales']
        }
    })

    return res.json()
}


// export  function generateReport ()



function ByProductType(apiResponse) {
    const nestedObject = {};
  
    apiResponse.forEach((item) => {
      const productType = item.product_type;
  
      if (!nestedObject[productType]) {
        nestedObject[productType] = [];
      }
  
      nestedObject[productType].push(item);
    });
    // console.log("new type", nestedObject);
    return nestedObject;
  }
  

function generateSalesObject(formData) {

    
    const sales = [];
    let currentSales = {};

formData.forEach((value, key) => {
  if(key.includes('[type]')) {
    currentSales.product_id = value; 

} else if (key.includes('[user_id]')) { 
    currentSales.user_id = value;

} else if (key.includes('[quantity]')) { 
    currentSales.quantity = parseInt(value);
    currentSales.shop_id = getInfo.shop_id;
    
    // save user object
    sales.push(currentSales);  
    currentSales = {}; 
}
});

return sales

}