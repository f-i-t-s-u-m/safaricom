import Link from "next/link"

import { cn } from "@/lib/utils"
import UserDropdown from "./user-action"

export default function MainNav({
  className,
  ...props
}) {
  return (
    <nav
      className={cn("flex items-center justify-between w-full ", className)}
      {...props}
    >
      <div className="space-x-4 lg:space-x-6">

      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>
      <Link
        href="/plan"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Plans
      </Link>
      <Link
        href="/goal"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
        Goals
      </Link>
      
        </div>

        <UserDropdown />
    </nav>
  )
}