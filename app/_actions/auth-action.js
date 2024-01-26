'use server'

import { encryptDate } from "@/lib/encryption"
import { redirect } from "next/navigation"

import { cookies } from 'next/headers'

const auth = [
    {
        account: "area_manager",
        password: "am29630",
    },
    {
        account: "guest",
        password: "guest3652",
    },
    
]

export async function login(initState, formData) {
    const account = formData.get('account')
    const password = formData.get('password')
    const user = auth.find(e => e.account == account)
    
    if(user) {
        if(user.password === password) {
            // console.log("welcome user");
            const expires = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days
  
            const sessionData = {"date":expires.toISOString(), account}
            const encryptedDate = encryptDate(JSON.stringify(sessionData))


            cookies().set("session", encryptedDate, {expires, httpOnly:true})
            cookies().set("auth", account)
          
            redirect('/')
            // return {status:201, message:"success"}

        }
       
    }
    // console.log(user);

    return {status: 402, message:"passworld error"}
 
}


export async function logout() {
    cookies().delete("auth")
    cookies().delete("session")

    redirect('login')
}
