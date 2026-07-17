import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

/* -------------------------------- Types -------------------------------- */

type Status = "Critical" | "Normal" | "High";

export interface SCRSTrendItem {
  month: string;
  score: number;
}

// Define the Props interface so it can receive data from Dashboard
interface SCRSTrendChartProps {
  data?: SCRSTrendItem[];
}

/* ------------------------------ Helpers -------------------------------- */

const STATUS_COLORS: Record<Status, string> = {
  Critical: "#FF365E",
  Normal: "#FBBF24",
  High: "#22C55E",
};

const getStatus = (score: number): Status => {
  if (score <= 39) return "Critical";
  if (score <= 70) return "Normal";
  return "High";
};

/* --------------------------- Custom Tooltip ---------------------------- */

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload as SCRSTrendItem;
  const status = getStatus(data.score);

  return (
    <div className="rounded-lg border border-slate-700 bg-[#1F262E] px-4 py-3 shadow-lg">
      <p className="text-sm text-slate-300">{data.month}</p>

      <p className="mt-2 text-lg font-semibold text-white">
        {data.score}
      </p>

      <div className="mt-2 flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: STATUS_COLORS[status] }}
        />

        <span className="text-xs text-slate-300">
          {status}
        </span>
      </div>
    </div>
  );
};

/* -------------------------- Custom Active Dot -------------------------- */

const CustomActiveDot = (props: any) => {
  const { cx, cy, payload } = props;

  const status = getStatus(payload.score);

  return (
    <circle
      cx={cx}
      cy={cy}
      r={5}
      fill={STATUS_COLORS[status]}
      stroke="#FFFFFF"
      strokeWidth={2}
    />
  );
};

/* -------------------------------- Chart -------------------------------- */

export const SCRSTrendChart: React.FC<SCRSTrendChartProps> = ({ data = [] }) => {
  return (
    <div className="w-full h-[340px]">
      {/* Legend */}

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data} // Using passed data prop
          margin={{
            top: 10,
            right: 20,
            left: -30,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="scrsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity={0.12} />
              <stop offset="100%" stopColor="#00E5FF" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical={false}
            horizontal={false}
            stroke="#1F293B"
            strokeOpacity={0.25}
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
            ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#94A3B8",
              fontSize: 13,
              fontWeight: 400,
            }}
          />

          <Tooltip
            cursor={{
              stroke: "#3B82F6",
              strokeOpacity: 0.35,
              strokeWidth: 1,
            }}
            content={<CustomTooltip />}
          />

          <Area
            type="linear"
            dataKey="score"
            stroke="#00E5FF"
            strokeWidth={3}
            fill="url(#scrsFill)"
            dot={false}
            activeDot={<CustomActiveDot />}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};