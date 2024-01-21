import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function GET(request) {
    const {data, error} =  await supabase.from('sale_revenue').select('*, user(*)').order('date')

    if (error) {
        console.log(error)
        return NextResponse.json({status:"error", data:"error"})
      }
      
      if (!data.length) {
        // console.log('No data found')
        return  NextResponse.json([])
      }
    // console.log("api  data",  "error", error);
    return  NextResponse.json(data, {status:200})
}