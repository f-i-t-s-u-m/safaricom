import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CardWithImg({name, location, id}) {
  return (
    
<Link href={`/shop/${id}`}>
<div class="max-w-sm bg-white border shadow-sm  border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700">
        <div className='relative w-full h-44'>
        <Image class="rounded-t-lg" fill src="/bg/images.jpg" alt="" />
        </div>
  
    <div class="p-5">
      
            <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">{name}</h5>
       
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{location}</p>
        <span href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </span>
    </div>
</div>
</Link>

  )
}
