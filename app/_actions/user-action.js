'use server'

import supabase from "@/lib/supabase"
import { revalidatePath, revalidateTag } from "next/cache"
import { cookies } from "next/headers"


export async function getUser(id) {
    try {

        const res = await fetch(`${process.env.BASE_URL}/api/user/${id}`, {
            next:{
                tags:[`user-${id}`]
            }
        })

        return res.json()
    } catch {
        console.log("error");
        return []
    }

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



export async function userSales(id, filterBy = {}, stat = false,) {

    const filterQuery = `?from=${filterBy?.from}&to=${filterBy?.to}`
    const url = `${process.env.BASE_URL}/api/user/${id}/sales${!!filterBy?.from ? filterQuery : ''}`

    try {

        const res = await fetch(url, {
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




export async function createUser(currentState, bindData, formData) {

    if(cookies().get('auth') != "area_manager") {return }

    const rawFormData = {
        id:formData?.get('id') ?? currentState?.id,
        name:formData.get('name'),
        phone:formData.get('phone'),
        user_id:formData.get('user_id'),
        start_date:formData.get('start_date'),
        user_type:formData.get('user_type'),
        shop_id:currentState?.shop_id ?? undefined
    }

    // console.log(rawFormData);
    const newUser = await supabase.from('user').upsert(rawFormData).select()

    // console.log(formData, rawFormData, newShop);


    if(newUser.status == 201) {
        revalidateTag('users') 
        revalidatePath(`/shop/${currentState?.shop_id}/users`)
        if(currentState.shop_id) {
            revalidateTag(`shop-${currentState.shop_id}-users`)
        }
        return newUser
    }

    return {status:"error"}

}