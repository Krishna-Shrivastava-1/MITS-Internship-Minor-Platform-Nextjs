"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A linear line chart"


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#007bff", // Bootstrap blue
  },
};


export function CountOfInternshipAsPerYear({countOfIntersnhipData}) {
      const chartData = countOfIntersnhipData.map(obj => {
  const year = Object.keys(obj)[0];   // "2023"
  const count = obj[year];            // 2
  return { year: Number(year), count }; // { year: 2023, count: 2 }
});

  return (
  <Card className="w-[90%] m-2 h-[370px] flex flex-col">
  <CardHeader className="pb-2">
    <CardTitle>Total Internship as per Year</CardTitle>
    <CardDescription>
      {chartData.length > 0
        ? `${chartData[0].year} - ${chartData[chartData.length - 1].year}`
        : "No data available"}
    </CardDescription>
  </CardHeader>

  <CardContent className="flex-1 relative overflow-hidden">
    <ChartContainer config={chartConfig} className="h-full w-full">
      <LineChart
        data={chartData}
        margin={{ top: 20, right: 20, left: 12, bottom: 10 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="year"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              formatter={(value, name, props) =>
                `Year: ${props.payload.year}, Internship Count: ${value}`
              }
            />
          }
        />
        <Line
          dataKey="count"
          type="monotone"
          stroke="#3B82F6"  // Use a beautiful consistent color
          strokeWidth={2.5}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ChartContainer>
  </CardContent>
</Card>

  )
}


// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";



// export default function CountOfInternshipAsPerYear({countOfIntersnhipData}) {
//   const chartData = countOfIntersnhipData.map(obj => {
//   const year = Object.keys(obj)[0];   // "2023"
//   const count = obj[year];            // 2
//   return { year: Number(year), count }; // { year: 2023, count: 2 }
// });

// // console.log(chartData);

//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <LineChart data={chartData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="year" />
//         {/* <YAxis /> */}
//        <Tooltip formatter={(value) => [`${value} internships`]} />
//         {/* <Legend /> */}
//         <Line type="linear"   strokeWidth={2} dataKey="count" stroke="#027cf5" />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// }
