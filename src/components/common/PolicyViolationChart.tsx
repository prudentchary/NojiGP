import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

/* -------------------------------- Types -------------------------------- */

export interface PolicyViolationTrend {
  month: string;
  critical: number;
  high: number;
  low: number;
}

interface PolicyViolationChartProps {
  data: PolicyViolationTrend[];
}

/* ----------------------------- Line Colors ----------------------------- */

const COLORS = {
  critical: "#FFFFFF",
  high: "#8FA9D9",
  low: "#D4C400",
};

/* ---------------------------- Custom Tooltip --------------------------- */

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-slate-700 bg-[#1F262E] px-4 py-3 shadow-lg min-w-[140px]">
      <p className="text-sm text-slate-300 mb-3">{label}</p>

      {payload.map((item: any) => (
        <div
          key={item.dataKey}
          className="flex items-center justify-between gap-6 mb-1 last:mb-0"
        >
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-slate-300 capitalize">
              {item.dataKey}
            </span>
          </div>

          <span className="text-xs font-semibold text-white">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ------------------------------- Component ------------------------------ */

export const PolicyViolationChart: React.FC<
  PolicyViolationChartProps
> = ({ data }) => {
  return (
    <div className="w-full h-[300px]">

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: -25,
            bottom: 0,
          }}
        >
          <CartesianGrid
            vertical={false}
            horizontal={false}
          />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#94A3B8",
              fontSize: 12,
            }}
          />

          <YAxis
            domain={[0, 100]}
            ticks={[0,10,20,30,40,50,60,70,80,90,100]}
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#94A3B8",
              fontSize: 12,
            }}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#94A3B8",
              strokeOpacity: 0.35,
              strokeWidth: 1,
            }}
          />

          <Line
            type="monotone"
            dataKey="critical"
            stroke={COLORS.critical}
            strokeWidth={1.5}
            dot={false}
            activeDot={{
              r: 5,
              fill: COLORS.critical,
              stroke: "#FFFFFF",
              strokeWidth: 2,
            }}
          />

          <Line
            type="monotone"
            dataKey="high"
            stroke={COLORS.high}
            strokeWidth={1.5}
            strokeDasharray="4 4"
            dot={false}
            activeDot={{
              r: 5,
              fill: COLORS.high,
              stroke: "#FFFFFF",
              strokeWidth: 2,
            }}
          />

          <Line
            type="monotone"
            dataKey="low"
            stroke={COLORS.low}
            strokeWidth={1.5}
            strokeDasharray="2 3"
            dot={false}
            activeDot={{
              r: 5,
              fill: COLORS.low,
              stroke: "#FFFFFF",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default PolicyViolationChart;