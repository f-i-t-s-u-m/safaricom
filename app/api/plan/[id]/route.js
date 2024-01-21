import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function GET(request, { params }) {
  const { id } = params;
  const { data, error } = await supabase.from("plan").select().eq("shop_id", id);

  if (error) {
    console.log(error);
    return NextResponse.json({ status: "error", data: "error" });
  }

  if (!data.length) {
    // console.log("No data found");
    return NextResponse.json([]);
  }
 

  return NextResponse.json(data, { status: 200 });
}
