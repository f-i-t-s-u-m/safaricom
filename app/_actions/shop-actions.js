'use server'

import supabase from "@/lib/supabase"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export async function listShop() {
    try {
    const res = await fetch(`${process.env.BASE_URL}/api/shop`, {
        next:{
            tags:['shops']
        }
    })

    return res.json()

} catch {
    console.log("error");
    return []
}

}


export async function getShop(id) {

    try {
    const res = await fetch(`${process.env.BASE_URL}/api/shop/${id}`, {
        next:{
            tags:[`shop-${id}`]
        }
    })

    return res.json()

} catch {
    console.log("error");
    return []
}

}


export async function listShopUsers(id) {

    try {

        const res = await fetch(`${process.env.BASE_URL}/api/shop/${id}/users`, {
            next:{
                tags:[`shop-${id}-users`]
            }
        })
        
        return res.json()
    } catch {
        console.log("error");
        return []
    }

}


export async function createShop(formData) {
     const id  = formData.get('id') ?? undefined
    const name = formData.get('name')
    const location = formData.get('location')

    if (name == '' || location == '') {
        return {status:"error", data:"one or more fields missing"}
    }

    const rawFormData = {
        id,
        name,
        location
    }



    const newShop = await supabase.from('shop').upsert(rawFormData).select()

    // console.log(newShop);
    
    // console.log(formData, rawFormData, newShop);


    if(newShop.status == 201) {

        revalidateTag('shops')
        return {status:"ok", data:newShop}
    }

    return {status:"error", data:"somthing went wrong"}

}