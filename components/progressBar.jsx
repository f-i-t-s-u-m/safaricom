"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"

export function LProgressBar({percentage, label, target, sales}) {
  const [progress, setProgress] = React.useState(5)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage > 100 ? 100 : percentage), 500)
    return () => clearTimeout(timer)
  }, [percentage])


  return (
    <div className="flex flex-col gap-3 bg-sky-50 p-4 rounded-lg shadow">
     

    <span className="flex flex-row justify-between">
    <p>{label} ({target})</p>
    <div className="flex gap-x-10" >
      <p>{percentage} %</p>
    <p>{sales ?? 0}</p>
    </div>
    </span>

      <Progress value={progress} />
      </div>
      )
}
