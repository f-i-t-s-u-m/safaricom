import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";
import { eachWeekOfInterval, subDays } from "date-fns";

export async function GET(request, {params}) {
    const {id} = params
    const currentDate = new Date()
    const dayStart = subDays(new Date(), 7)
    const from = request.nextUrl.searchParams.get('from')  ?? dayStart.toISOString().slice(0,10)
    const to = request.nextUrl.searchParams.get('to') ?? currentDate.toISOString().slice(0,10)

      const { data, error } = await supabase
          .from('sale_revenue')
          .select(`
            *, user(*)
          `)
          .eq('shop_id', id)
          .gt("date", from)
          .lt("date", to )
          
          //   .gte('date', startDate)
        //   .group('date')
          //   .lte('date', endDate)
      

        if (error) {
          console.log(error)
          return
        }
        
        if (!data.length) {
          console.log('No data found')
          return  NextResponse.json([])
        }

        
      
        // Generate graph using data
        // e.g. with Chart.js
      
    // const {data} =  await supabase.from('sales').select('*, product(*), user(name, user_id)').eq('shop_id', id)
    // console.log("data", data, "error");
    return  NextResponse.json(data, {status:200})
}

