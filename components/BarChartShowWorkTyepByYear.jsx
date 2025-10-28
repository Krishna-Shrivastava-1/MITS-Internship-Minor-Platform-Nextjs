"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A stacked bar chart with a legend"



export function BarChartShowWorkTyepByYear({countOfIntersnhipDataWorkType}) {
    // console.log(countOfIntersnhipDataWorkType)
const chartData = countOfIntersnhipDataWorkType.map(item => {
  const obj = { year: item.year }; 
  item.workTypeCounts.forEach(wt => {
    if (wt.workType === "Remote") obj.Remote = wt.count;
    else if (wt.workType === "Onsite") obj.Onsite = wt.count;
    else if (wt.workType === "Hybrid") obj.Hybrid = wt.count;
  });
  return obj;
});


// console.log(chartData);


const chartConfig = {
  remote: {
    label: "Remote",
    color: "var(--chart-1)",
  },
  onsite: {
    label: "Onsite",
    color: "var(--chart-2)",
  },
  hybrid: {
    label: "Hybrid",
    color: "var(--chart-3)",
  },
}

  return (
    <Card className='w-[90%] m-2'>
      <CardHeader>
        <CardTitle>Student Data as per Work-Type</CardTitle>
      <CardDescription>
  {chartData.length > 0
    ? `${chartData[0].year} - ${chartData[chartData.length - 1].year}`
    : "No data available"}
</CardDescription>

      </CardHeader>
      {/* <CardContent>
        <ChartContainer config={chartConfig}>
       <BarChart accessibilityLayer data={chartData}>
  <CartesianGrid vertical={false} />
  <XAxis dataKey="year" tickLine={false} axisLine={false} />
<ChartTooltip
  content={
    <ChartTooltipContent
      hideLabel
      formatter={(value, name) => `${name.charAt(0).toUpperCase() + name.slice(1)}: ${value} internships`}
    />
  }
/>

  <ChartLegend content={<ChartLegendContent />} />
  <Bar dataKey="remote" stackId="a" fill="var(--chart-1)" radius={[0,0,4,4]} />
  <Bar dataKey="onsite" stackId="a" fill="var(--chart-2)" radius={[0,0,4,4]} />
  <Bar dataKey="hybrid" stackId="a" fill="var(--chart-3)" radius={[0,0,4,4]} />
</BarChart>

        </ChartContainer>
      </CardContent> */}
    <CardContent>
  <ChartContainer config={chartConfig} className="h-[250px] w-full">
    <AreaChart
      accessibilityLayer
      data={chartData}
      margin={{ left: 12, right: 12 }}
    >
      <CartesianGrid vertical={false} />
      <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
      <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

      {/* 🌈 Modern gradient fills */}
      <defs>
        <linearGradient id="fillRemote" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
        </linearGradient>
        <linearGradient id="fillOnsite" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#22C55E" stopOpacity={0.1} />
        </linearGradient>
        <linearGradient id="fillHybrid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#A855F7" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#A855F7" stopOpacity={0.1} />
        </linearGradient>
      </defs>

      {/* 🌟 Smooth gradient areas */}
      <Area
        type="monotone"
        dataKey="Remote"
        stroke="#3B82F6"
        fill="url(#fillRemote)"
        strokeWidth={2.5}
        dot
      />
      <Area
        type="monotone"
        dataKey="Onsite"
        stroke="#22C55E"
        fill="url(#fillOnsite)"
        strokeWidth={2.5}
        dot
      />
      <Area
        type="monotone"
        dataKey="Hybrid"
        stroke="#A855F7"
        fill="url(#fillHybrid)"
        strokeWidth={2.5}
        dot
      />
    </AreaChart>
  </ChartContainer>
</CardContent>


  
    </Card>
  )
}
