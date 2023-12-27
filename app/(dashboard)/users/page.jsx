import { allUsers } from '@/app/_actions/user-action'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import UserCard from '@/components/user-card'
import Link from 'next/link'

export default async function page() {

  const shopUsers = await allUsers()
  return (
    <div className=' mb-5'>
      <div className='mb-10'>
     <h2 className="text-3xl mb-0 pb-1 font-bold tracking-tight">Users</h2>
     <p className="text-gray-600">Your org. users</p>
    </div>
      <div className=' gap-5  grid grid-cols-3 w-full '>

        {shopUsers?.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}
