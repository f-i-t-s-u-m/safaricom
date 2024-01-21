import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function GET(request, {params}) {
    const {id} = params
    const {data, error} =  await supabase.from('shop').select().eq('id', id)


    if(error) {
        console.log(error);
        return NextResponse([])
    }

    else if (!data.length) {
        // console.log('No data found')
        return  NextResponse.json([])
      }
    
    return  NextResponse.json(data[0], {status:200})
}