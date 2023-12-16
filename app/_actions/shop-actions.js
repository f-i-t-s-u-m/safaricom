'use server'

import supabase from "@/lib/supabase"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export async function listShop() {
    const res = await fetch(`${process.env.BASE_URL}/api/shop`, {
        next:{
            tags:['shops']
        }
    })

    return res.json()

}


export async function getShop(id) {
    const res = await fetch(`${process.env.BASE_URL}/api/shop/${id}`, {
        next:{
            tags:[`shop-${id}`]
        }
    })

    return res.json()

}


export async function listShopUsers(id) {
    const res = await fetch(`${process.env.BASE_URL}/api/shop/${id}/users`, {
        next:{
            tags:[`shop-${id}-users`]
        }
    })

    return res.json()

}


export async function createShop(formData) {
    const rawFormData = {
        id:formData.get('id') ?? undefined,
        name:formData.get('name'),
        location:formData.get('location')
    }

    const newShop = await supabase.from('shop').upsert(rawFormData)

    console.log(formData, rawFormData, newShop);


    if(newShop.status == 201) {

        revalidateTag('shops')        
        return {status:"ok", data:newShop}
    }

    return {status:"error"}

}