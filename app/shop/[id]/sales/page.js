import { shopSale } from "@/app/_actions/sales-actions"
import { NewSales } from "@/app/_forms/new_sales"
import { DataTable } from "@/components/data-table"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  
  export default async function page({params, searchParams}) {

    const {id} = params

    // console.log(searchParams);
    const {from, to} = searchParams

    const getSales = await shopSale(id, {from, to}, false)

    return (
      <div className="px-16">
<div className="flex justify-between items-center">
<h1 className="text-3xl font-bold tracking-tight py-10">Sales</h1>
{/* <NewSales user={} /> */}
{/* {filterBy} */}
</div>
      {/* {JSON.stringify(getSales)} */}

      
      <DataTable data={getSales} />

      
      </div>
    )
  }
  