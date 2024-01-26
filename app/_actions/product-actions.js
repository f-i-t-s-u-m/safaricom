'use server'

import supabase from "@/lib/supabase"
import { revalidatePath, revalidateTag } from "next/cache"
import { cookies } from "next/headers"


export async function allProducts() {


    try {
        const res = await fetch(`${process.env.BASE_URL}/api/product`, {
            cache:'no-cache',
            next:{
                tags:['products']
            }
        })
        
        return res.json()
    } catch {
        console.log("error");
        return []
    }


}



export async function createProduct(state, formData) {


    if(cookies().get('auth') != "area_manager") {return }

    const rawFormData = {
        id:formData?.get('id') ?? undefined,
        name:formData.get('name'),
        price:formData.get('price'),
        product_type:formData.get('product_type'),
        icon_url:formData.get('icon_url'),
       
    }

    const newProduct = await supabase.from('product').upsert(rawFormData).select()

    // console.log(formData, rawFormData, newShop);


    if(newProduct.status == 201) {
        revalidateTag('products') 
        revalidatePath('/products')
        return newProduct
    }

    return {status:"error"}

}