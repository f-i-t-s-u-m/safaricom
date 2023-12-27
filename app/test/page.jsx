import React from 'react'
import { DataTableDemo } from './data-table'
import { allSales } from '../_actions/sales-actions'

export default async function page() {
  const data = await allSales()
  
  return (
    <div>
      <DataTableDemo data={data} />
    </div>
  )
}
