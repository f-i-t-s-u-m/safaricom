'use client'
import React from 'react'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'



export default function TabNav({urlList, active, urlPath = 1}) {

    const [activeTab, setActiveTab] = React.useState(active)

    const path = usePathname()

    React.useEffect(() => {
      const currentPath = path.split('/')[urlPath] ?? 'overview'
    //   console.log("cpath", currentPath);
      setActiveTab(currentPath != '' ? currentPath : 'overview')
    }, [path, urlPath, ])

  return (

    <Tabs value={activeTab} className="space-y-4">
            <TabsList>
                {urlList?.map((item, index) => (

                    <TabsTrigger key={index} asChild value={item.label}>
                <Link href={item.url} className=' capitalize'>
                  {item.label}
                </Link>
              </TabsTrigger>
              
              ))}
            </TabsList>
            </Tabs>
  )
}
