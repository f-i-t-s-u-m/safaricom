import Link from "next/link"

import { cn } from "@/lib/utils"

export default function MainNav({
  className,
  ...props
}) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>
      <Link
        href="/plans"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Plans
      </Link>
      <Link
        href="/goals"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Goals
      </Link>
      
    </nav>
  )
}