"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"

export function LProgressBar({label, target, sale}) {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col gap-3 bg-sky-50 p-4 rounded-lg shadow">
     

    <span className="flex flex-row justify-between">
    <p>{label}</p>
    <p>{target}</p>
    </span>

      <Progress value={progress} />
      </div>
      )
}
