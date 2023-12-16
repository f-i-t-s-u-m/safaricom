import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function GET(request, {params}) {
    const {id} = params
    const {data} =  await supabase.from('shop').select().eq('id', id)
    
    return  NextResponse.json(data[0], {status:200})
}