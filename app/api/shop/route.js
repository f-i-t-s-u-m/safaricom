import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function GET(request) {
    const {data} =  await supabase.from('shop').select()
    console.log("data", data, "error");
    return  NextResponse.json(data, {status:200})
}