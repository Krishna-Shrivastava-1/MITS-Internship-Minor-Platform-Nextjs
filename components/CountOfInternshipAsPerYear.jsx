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
    <Card className='w-[90%] m-2'>
      <CardHeader>
        <CardTitle>Total Internship as per Year</CardTitle>
       <CardDescription>
  {chartData.length > 0
    ? `${chartData[0].year} - ${chartData[chartData.length - 1].year}`
    : "No data available"}
</CardDescription>

      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            //   tickFormatter={(value) => value.slice(0, 3)}
            />
             <ChartTooltip cursor={false} content={<ChartTooltipContent  formatter={(value, name, props) =>
        `Year: ${props.payload.year}, Internship Count: ${value}`
      }/>} />
      {/* <ChartTooltip
  content={
    <ChartTooltipContent
      hideLabel={false} // show label
      formatter={(value, name, props) =>
        `Year: ${props.payload.year}, Internship Count: ${value}`
      }
    />
  }
/> */}


            <Line
              dataKey="count"
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
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
