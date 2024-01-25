
import Image from "next/image"

// import { columns } from "@/components/columns"
// import { DataTable } from "@/components/data-table"
import { allSales } from "@/app/_actions/sales-actions"
import { DataTable } from "@/components/data-table"




export default async function Sales() {
  const sales = await allSales()

  return (
    <>
      <div>
     <h2 className="text-3xl mb-0 pb-1 font-bold tracking-tight">Sales</h2>
     <p className="text-gray-600">Your sales report</p>
    </div>
      <div className=" h-full flex-1 flex-col  md:flex">
        <DataTable data={sales}  />
      </div>
    </>
  )
}