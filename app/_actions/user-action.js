'use server'

import supabase from "@/lib/supabase"
import { revalidateTag } from "next/cache"


export async function getUser(id) {
    try {

        const res = await fetch(`${process.env.BASE_URL}/api/user/${id}`, {
            next:{
                tags:[`user-${id}`]
            }
        })
    } catch {
        console.log("error");
        return []
    }

    return res.json()

}

export async function allUsers() {

    try {

        const res = await fetch(`${process.env.BASE_URL}/api/user`, {
            next:{
                tags:['users']
            }
        })
        
        return res.json()
        
    } catch {
        console.log("error");
        return []
    }
}



export async function createUser(shop_id, formData) {
    const rawFormData = {
        id:formData?.get('id') ?? undefined,
        name:formData.get('name'),
        phone:formData.get('phone'),
        user_id:formData.get('user_id'),
        start_date:formData.get('start_date'),
        user_type:formData.get('user_type'),
        shop_id:shop_id ?? null
    }

    // console.log(rawFormData);
    const newUser = await supabase.from('user').upsert(rawFormData)

    // console.log(formData, rawFormData, newShop);


    if(newUser.status == 201) {
        revalidateTag('users') 
        if(shop_id) {
            revalidateTag(`shop-${shop_id}-users`)
        }
        return {status:"ok", data:newUser}
    }

    return {status:"error"}

}