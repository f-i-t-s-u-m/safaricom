import { allUsers } from '@/app/_actions/user-action'
import UserCard from '@/components/user-card'
import checkAuth from '@/lib/checkAuth'

export default async function page() {

  const {isAM} = await checkAuth()
  const shopUsers = await allUsers()

  return (
    <div className=' mb-5'>
      <div className='mb-10'>
     <h2 className="text-3xl mb-0 pb-1 font-bold tracking-tight">Users</h2>
     <p className="text-gray-600">Your org. users</p>
    </div>
      <div className=' gap-5 flex flex-col  md:grid md:grid-cols-2 lg:grid-cols-3 w-full '>

        {shopUsers?.map(user => (
          <UserCard key={user.id} user={user} isAM={isAM} />
        ))}
      </div>
    </div>
  )
}
