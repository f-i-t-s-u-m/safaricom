import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";
import { subDays } from "date-fns";

export async function GET(request, {params}) {
    const {id} = params

    const currentDate = new Date()
  const dayStart = subDays(new Date(), 7)
  const from = request.nextUrl.searchParams.get('from')  ?? dayStart.toISOString().slice(0,10)
  const to = request.nextUrl.searchParams.get('to') ?? currentDate.toISOString().slice(0,10)


    const {data, error} =  await supabase.from('sale_revenue')
    .select('*')
    .eq('user_id', id)
    .gt("date", from)
    .lt("date", to)

    if (error) {
        console.log(error)
        return NextResponse.json({status:"error", data:"error"})
      }
      
      if (!data.length) {
        console.log('No data found')
        return  NextResponse.json([])
      }
    // console.log("api  data",  "error", error);
    return  NextResponse.json(data, {status:200})
}