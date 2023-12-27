'use server'

import supabase from "@/lib/supabase"
import { revalidateTag } from "next/cache"


export async function allProducts() {
    const res = await fetch(`${process.env.BASE_URL}/api/product`, {
        next:{
            tags:['products']
        }
    })

    return res.json()

}



export async function createProduct(formData) {



    const rawFormData = {
        id:formData?.get('id') ?? undefined,
        name:formData.get('name'),
        price:formData.get('price'),
        product_type:formData.get('product_type'),
        icon_url:formData.get('icon_url'),
       
    }

    console.log(rawFormData);
    const newProduct = await supabase.from('product').upsert(rawFormData)

    // console.log(formData, rawFormData, newShop);


    if(newProduct.status == 201) {
        revalidateTag('products') 
        
        return {status:"ok", data:newProduct}
    }

    return {status:"error"}

}