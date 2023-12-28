import { getShop } from '@/app/_actions/shop-actions'
import { NewSales } from '@/app/_forms/new_sales'
import { NewShop } from '@/app/_forms/new_shop'
import ActionDropdown from '@/components/action-dropdown'
import CalendarDateRangePicker from '@/components/calendar-date-range-picker'
import { DateFilter } from '@/components/date-filter'
import TabNav from '@/components/tab-nav'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DotsVerticalIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import React from 'react'


export default async function layout({children, params}) {
  const {id} = params
  const shop = await getShop(id)
  const urlList = [
    {label: 'overview', url:`/shop/${id}`},
    {label: 'sales', url:`/shop/${id}/sales`},
    {label: 'users', url:`/shop/${id}/users`},
   
  ]
  return (
    <div>

<div className="flex border-gray-900 shadow mb-5 items-center justify-between space-y-4 px-16 pt-10">
            <div className="my-4">
              <div className='flex'>

                <div>
            <h2 className="text-3xl font-bold tracking-tight capitalize">{shop.name}</h2>
            <span className="text-gray-600 ">{shop.location}</span>
              </div>

              <ActionDropdown data={shop} />
              
                </div>
            <div className='py-5'>

              <TabNav active="overview" urlList={urlList} urlPath={3}  />
            </div>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
            </div>
          </div>
        
        {children}
        
    </div>
  )
}
