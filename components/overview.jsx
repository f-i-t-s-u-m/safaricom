"use client"

import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"
import { useState } from "react"


export default function Overview({data}) {

  const [dataKey, setDataKey] = useState("total")

  return (
    <Card className="col-span-4 ">

    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="hidden md:block">Overview</CardTitle>
      <Tabs defaultValue={dataKey} className="space-y-4">
<TabsList >
<TabsTrigger value="total" onClick={() => setDataKey('total')}>Total</TabsTrigger>
<TabsTrigger value="air_time" onClick={() => setDataKey('air_time')}>
  Airtime
</TabsTrigger>
<TabsTrigger value="sim_card" onClick={() => setDataKey('sim_card')}>
  Sim Card
</TabsTrigger>
<TabsTrigger value="device" onClick={() => setDataKey('device')}>
  Device
</TabsTrigger>
</TabsList>
</Tabs>
    </CardHeader>
    <CardContent className="pl-2 flex items-center h-full">
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
        <Area type="monotone" dataKey={dataKey} stroke="#8884d8" fill="#8884d8" />
      
      </AreaChart>
    </ResponsiveContainer>

    </CardContent>
    </Card>
  )
}