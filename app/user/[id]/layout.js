import { getUser } from '@/app/_actions/user-action'
import CalendarDateRangePicker from '@/components/calendar-date-range-picker'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

export default async function page({children, params}) {
    const {id} = params
    const user = await getUser(id)

  return (
    <div className='my-10 px-16'>
      <div className='border-b pb flex justify-between items-center pb-5'>

      <div className='flex  items-center text-black gap-y-1 '>
      <Avatar className="h-24 w-24 shadow ">
            <AvatarFallback className="text-3xl">OM</AvatarFallback>
          </Avatar>
          <div className='pl-5 text-gray-700'>

            <div className='font-bold text-lg tracking-wider'>{user.name} </div>
            <div  className='pl-2 py-1'> {user.phone}</div>
            <div className='pl-2 capitalize'> {user.shop?.name} | <span className=' uppercase'>{user.user_type}</span> </div>
          </div>
      </div>

      <div>
      <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button>Download</Button>
            </div>
          </div>

      <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Sales
              </TabsTrigger>
             
            </TabsList>
            </Tabs>
      </div>
      </div>
    </div>

    {children}
    </div>
  )
}
