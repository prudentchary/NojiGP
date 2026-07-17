import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  LabelList,
} from "recharts";

// Custom Y-axis label
const CustomYAxisTick = ({ x, y, payload }: any) => (
  <text
    x={x}
    y={y}
    dy={4}
    textAnchor="end"
    fill="#CBD5E1"
    fontSize={12}
    fontWeight={400}
  >
    {payload.value}
  </text>
);

export interface ScoreDriver {
  name: string;
  value: number;
}

interface ScoreDriversBarChartProps {
  data: ScoreDriver[];
}

export const ScoreDriversBarChart: React.FC<
  ScoreDriversBarChartProps
> = ({ data }) => {
  return (
    <div className="w-full h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data} 
          layout="vertical"
          margin={{
            top: 5,
            right: 35,
            left: 10,
            bottom: 5,
          }}
          barCategoryGap={8}
        >
          <defs>
            <linearGradient
              id="scoreDriverGradient"
              x1="0"
              y1="0"
              x2="1" // 💡 Adjusting to make gradient flow left-to-right (horizontal)
              y2="0"
            >
              <stop offset="0%" stopColor="#27D3D6" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>

          {/* 4 Vertical Grid Lines */}
          <CartesianGrid
            horizontal={false}
            vertical
            stroke="#8A8F94"
            strokeOpacity={0.35}
          />

          <XAxis
            type="number"
            domain={[0, 200]}
            ticks={[0, 50, 100, 150, 200]}
            interval={0}
            axisLine={false}
            tickLine={false}
            tick={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            axisLine={false}
            tickLine={false}
            width={95}
            tick={<CustomYAxisTick />}
          />

          <Bar
            dataKey="value"
            radius={[4, 4, 4, 4]}
            fill="url(#scoreDriverGradient)"
            barSize={16}
          >
            <LabelList
              dataKey="value"
              position="right"
              fill="#E2E8F0"
              fontSize={13}
              fontWeight={500}
            />

            {/* 🚀 FIX 2: Map over 'data' instead of 'scoreDriversData' */}
            {data.map((_, index) => (
              <Cell key={index} fill="url(#scoreDriverGradient)" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreDriversBarChart;