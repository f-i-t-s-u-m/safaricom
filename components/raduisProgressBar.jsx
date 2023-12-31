import React from 'react'

export default function RProgressBar({percentage}) {
  return (
    
<div className="relative w-40 h-40">
  <svg className="w-full h-full " viewBox="0 0 100 100">

    <circle
      className="text-gray-200 stroke-current"
      strokeWidth="10"
      
      cx="50"
      cy="50"
      r="40"
      fill="transparent"
    ></circle>
    <circle
      className="text-indigo-500  progress-ring__circle stroke-current origin-center -rotate-90"
      strokeWidth="10"
      strokeLinecap="round"
      cx="50"
      cy="50"
      r="40"
      rotate="180"
      fill="transparent"
      strokeDasharray={[400, 400]}
      strokeDashoffset={`calc(400 - (400 * ${percentage}) / 161)`}
    ></circle>
    
    <text className="" x="50" y="50" fontFamily="Verdana" fontSize="12" textAnchor="middle" alignmentBaseline="middle">{percentage}%</text>

  </svg>
</div>
  )
}
