import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function GET(request, {params}) {
    const {id} = params
    const {data, error} =  await supabase.from('user').select().eq('shop_id', id)
    if (error) {
        console.log("error");
        return  NextResponse.json([])
    }
    console.log("data", data, "error");
    return  NextResponse.json(data, {status:200})
}