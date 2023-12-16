import { listShopUsers } from "@/app/_actions/shop-actions"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
  export default async function RecentSales({id}) {
    const users = await listShopUsers(id)
    return (
      <div className="space-y-8">
        {users.map(e => (

          <div key={e.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none capitalize">{e.name}</p>
            <p className="text-sm text-muted-foreground">
              {e.phone}
            </p>
          </div>
          <div className="ml-auto font-medium">+$1,999.00</div>
        </div>
        ))}
        </div>
    )
  }