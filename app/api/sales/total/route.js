import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";
import { TotalSales, thisMonthSales } from "@/lib/sales-lib";
import { eachWeekOfInterval, subDays } from "date-fns";

export async function GET(request) {
  const currentDate = new Date()
  const dayStart = subDays(new Date(), 7)
  const from = request.nextUrl.searchParams.get('from')  ?? dayStart.toISOString().slice(0,10)
  const to = request.nextUrl.searchParams.get('to') ?? currentDate.toISOString().slice(0,10)

    console.log("we got ", to, from);
    //  const {id} = params
     

      const { data: sales, error } = await supabase
      .from('sale_revenue')
      .select()
      .order('date')
      .gte("date", from)
      .lte("date", to)

     
      if (error) {
        console.log(error)
        return NextResponse.json([])
      }
      
      if (!sales.length) {
        console.log('No data found')
        return  NextResponse.json([])
      }
    

    // console.log("api  data",  "error", error);
    const newData = thisMonthSales(sales)
// console.log("new data", newData);
    return  NextResponse.json( newData, {status:200})
}