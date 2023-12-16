import {Avatar, AvatarFallback} from "@/components/ui/avatar"
export default function user({name = "fitsum belay", phone="0785963325", }) {
  return (
    <div className="border p-3 rounded-lg space-x-5 flex  ">
        
            <Avatar className="p-12 border bg-gray-400 text-white">
                <AvatarFallback className="bg-black">{name}</AvatarFallback>
            </Avatar>

            <div className="my-auto">
            <p className=" capitalize font-bold text-xl ">{name}</p>
            <p>{phone}</p>
            </div>
        
    </div>
  )
}
