import { listShopUsers } from '@/app/_actions/shop-actions'
import { NewUser } from '@/app/_forms/new_user'
import UserCard from '@/components/user-card'
import checkAuth from '@/lib/checkAuth'

export default async function page({params}) {
  const {isAM} = await checkAuth()

    const {id} = params
  const shopUsers = await listShopUsers(id)

  return (
    <div className='py-6 px-10'>
        <div className='flex justify-between'>

        <h1 className="text-3xl font-bold tracking-tight pb-10">Shop Users</h1>
        <NewUser shop_id={id} />
        </div>
        <div className=' gap-5 flex flex-col  md:grid md:grid-cols-2 lg:grid-cols-3 w-full '>

        {shopUsers?.map(e => (
            <UserCard key={e} user={e} isAM={isAM} />
            ))}
            </div>
    </div>
  )
}
