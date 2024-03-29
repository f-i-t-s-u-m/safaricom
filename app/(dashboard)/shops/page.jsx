
import CardWithImg from "@/components/card-with-img"
import { listShop } from "@/app/_actions/shop-actions"
import { NewShop } from "@/app/_forms/new_shop"
import  checkAuth from "@/lib/checkAuth"

export default async function DashboardPage() {
  const shops = await listShop()
  const {isAM} = await checkAuth()
  return (
    <>
    <div className="flex justify-between">
    <div>
     <h2 className="text-3xl mb-0 pb-1 font-bold tracking-tight">Shops</h2>
     <p className="text-gray-600">List of active shops</p>
    </div>

    {isAM && 
      <NewShop /> 
    }
    </div>
    <div className=" mx-auto max-w-sm md:max-w-full pb-10  md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {shops?.map(e => (

            
            <CardWithImg key={e.id} {...e} />
          ))}

    
      
    </div>
    </>
  )
}