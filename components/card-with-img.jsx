import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { ArrowRightIcon, Crosshair2Icon } from '@radix-ui/react-icons'

export default function CardWithImg({name, location, id}) {
  return (
    
<Link href={`/shop/${id}`} className='relative'>
<div className="max-w-sm bg-white border shadow-sm   border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700">
        <div className='relative w-full h-44'>
        <Image className="rounded-t-lg" fill src="/bg/images.jpg" alt="" />
        </div>
  
    <div className="p-5">
      
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">{name}</h5>
       
        <p className="mb-3 text-sm text-gray-700 dark:text-gray-400 flex items-center gap-x-2 ">  <Crosshair2Icon /> {location}  </p>
        <Button  className="gap-x-5" >Go <ArrowRightIcon /> </Button>
    </div>
</div>
</Link>

  )
}
