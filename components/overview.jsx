"use client"

import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"


export default function Overview({data}) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />

          <Tooltip />
        {/* <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} /> */}
        <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" />
      
      </AreaChart>
    </ResponsiveContainer>
  )
}