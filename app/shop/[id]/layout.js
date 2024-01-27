import { getShop } from '@/app/_actions/shop-actions'
import ActionDropdown from '@/components/action-dropdown'
import CalendarDateRangePicker from '@/components/calendar-date-range-picker'

import TabNav from '@/components/tab-nav'
import checkAuth from '@/lib/checkAuth'
// import { cookies } from 'next/headers'


export default async function layout({children, params}) {
  const {id} = params
  const shop = await getShop(id)

  // const getCookies = cookies()
  // const auth = getCookies.get('auth')?.value ?? ""
  // const isAM =  auth == "area_manager"
  const {isAM} = await checkAuth()
  
  const urlList = [
    {label: 'overview', url:`/shop/${id}`},
    {label: 'sales', url:`/shop/${id}/sales`},
    {label: 'users', url:`/shop/${id}/users`},
   
  ]
  return (
    <div>

<div className="flex flex-col md:flex-row border-gray-900 shadow mb-5 items-center justify-between space-y-4  md:px-16 pt-10">
            <div className="mt-4">
              <div className='flex'>

                <div>
            <h2 className="text-3xl font-bold tracking-tight capitalize">{shop.name}</h2>
            <span className="text-gray-600 ">{shop.location}</span>
              </div>
              {isAM &&
              <ActionDropdown data={shop} />
              }
              
                </div>
            <div className='py-5'>

              <TabNav active="overview" urlList={urlList} urlPath={3}  />
            </div>
            </div>
            <div className="flex items-center space-x-2 pb-5">
              <CalendarDateRangePicker />
            </div>
          </div>
        
        {children}
        
    </div>
  )
}
