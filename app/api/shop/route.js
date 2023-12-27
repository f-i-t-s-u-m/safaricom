import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function GET(request) {
    const {data, error} =  await supabase.from('shop').select()
    // console.log("api  data", data.length, "error", error);
    if (error) {
        console.log("error");
        return  NextResponse.json([])
    }
    return  NextResponse.json(data, {status:200})
}