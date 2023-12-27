import CalendarDateRangePicker from '@/components/calendar-date-range-picker'
import TabNav from '@/components/tab-nav'
import Image from 'next/image'

const urlList = [
  {label: 'overview', url:"/"},
  {label: 'shops', url:"/shops"},
  {label: 'sales', url:"/sales"},
  {label: 'users', url:"/users"},
  {label: 'products', url:"/products"},
]

export default function layout({dashCards, children}) {

  
  return (
    <div className="flex-1 space-y-16 p-16 pt-6">
          <div className="flex items-center justify-between space-y-2">
            {/* <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2> */}
            <div className="flex flex-col justify-between space-y-2">
            <div className='relative ml-0 w-56 h-24'>
            <Image src="/logo.svg" fill alt='logo' />
        </div>
          
              
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your report!
            </p>
          </div>

            </div>
            <div className="flex items-center space-x-2">
               <CalendarDateRangePicker />
            </div>
          </div>

              {dashCards}
              <TabNav urlList={urlList} active={'overview'} urlPath={1} />
        
        {children}
        
        </div>

)}
