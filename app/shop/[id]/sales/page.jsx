import { shopSale } from "@/app/_actions/sales-actions"
import CsvUpload from "@/app/_forms/csv_upload"
import { DataTable } from "@/components/data-table"

import checkAuth  from "@/lib/checkAuth"
  
  
  export default async function Page({params, searchParams}) {

    const {id} = params

    const {isAM} = await checkAuth()

    const {from, to} = searchParams

    const getSales = await shopSale(id, {from, to}, false)

    return (
      <div className="px-5 md:px-16">
<div className="flex justify-between items-center">
<h1 className="text-3xl font-bold tracking-tight py-10">Sales</h1>

{isAM && <CsvUpload shop_id={id} /> }

</div>
      {/* {JSON.stringify(getSales)} */}

      
      <DataTable data={getSales} />

      
      </div>
    )
  }
  