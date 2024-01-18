import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { NewSales } from '@/app/_forms/new_sales'

export default function UserCard({user}) {
  return (
    <div >
          
          <div className="flex border p-4 rounded-lg items-center">
          <Avatar className="h-12 w-12">
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <Link href={`/user/${user.id}`} >
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none capitalize">{user.name}</p>
            <p className="text-sm text-muted-foreground">
              {user.user_type}
            </p>
            <p className="text-sm text-muted-foreground">
              {user.user_id}
            </p>
          </div>
          </Link>
          <div className="ml-auto font-medium"><NewSales user={user} /></div>
        </div>
            </div>
  )
}
