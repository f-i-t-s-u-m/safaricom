import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function GET(request) {
    const {data, error} =  await supabase.from('product').select()

    if (error) {
        console.log("error");
        return  NextResponse.json([])
    }
    console.log("api  data", data.length, "error", error);
    return  NextResponse.json(data, {status:200})
}