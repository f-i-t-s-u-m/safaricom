import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createProduct } from "../_actions/product-actions"


export function NewProduct() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <form action={createProduct}>

        <div className="grid gap-4 py-4">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" name="name" className="col-span-3" />
          </div>
          <div className="space-y-3">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input id="price" name="price" className="col-span-3" />
          </div>

          

          

          <div className="space-y-3">
            <Label htmlFor="username" className="text-right">
              Type
            </Label>
            <Select name="product_type" >
               
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user type" />
                  </SelectTrigger>
                
                <SelectContent>
                  <SelectItem value="air_time">Air Time</SelectItem>
                  <SelectItem value="sim_card">Sim Card</SelectItem>
                  <SelectItem value="device">Device</SelectItem>
                </SelectContent>
              </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="icon_url" className="text-right">
              Icon User
            </Label>
            <Input id="icon_url" name="icon_url" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
