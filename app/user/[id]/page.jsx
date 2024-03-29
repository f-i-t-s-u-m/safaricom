import { getUser, userSales } from '@/app/_actions/user-action'
import { NewUser } from '@/app/_forms/new_user'
import CalendarDateRangePicker from '@/components/calendar-date-range-picker'
import { DataTable } from '@/components/data-table'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import checkAuth from '@/lib/checkAuth'
import { Pencil1Icon } from '@radix-ui/react-icons'
import React from 'react'

export default async function page({children, params}) {
    const {id} = params
    const {isAM} = await checkAuth()
    const user = await getUser(id)
    const sales = await userSales(id)
  return (
    <div className='my-10 px-16'>
      <div className='border-b py-10 flex justify-between items-center'>

      <div className='flex  items-center text-black gap-y-1 '>
      <Avatar className="h-24 w-24 shadow ">
            <AvatarFallback className="text-3xl">OM</AvatarFallback>
          </Avatar>
          <div className='pl-5 text-gray-700'>

            <div className='font-bold text-lg tracking-wider'>{user[0].name}   {isAM && <NewUser label={<Pencil1Icon />} title='Update User' description='Update existing user info' user={user[0]} />}</div>
            <div  className='pl-2 py-1'> {user[0].phone} | {user[0]?.user_id}</div>
            <div className='pl-2 capitalize'> {user[0].shop?.name} | <span className=' uppercase'>{user[0].user_type}</span> </div>
          </div>
      </div>

      <div>
      <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
            </div>
          </div>

      
      </div>
      </div>
    </div>
        <h2 className='my-10 capitalize text-3xl font-bold text-gray-700 '>Sales History</h2>
      <div>
          <DataTable data={sales}  />
      </div>
    </div>
  )
}
