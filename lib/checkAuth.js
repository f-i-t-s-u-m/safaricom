'use server'
import {cookies} from "next/headers"

 export default async function checkAuth() {
    const getCookies = cookies()
    const auth = getCookies.get('auth')?.value ?? false
    return {isAM: auth == "area_manager", account: auth }
  }


