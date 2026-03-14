import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";

// Mock Data for the Line Chart
const lineData = [
    { name: 'Jan', critical: 20, high: 22, low: 25 },
    { name: 'Feb', critical: 15, high: 18, low: 28 },
    { name: 'Mar', critical: 25, high: 28, low: 22 },
    { name: 'Apr', critical: 22, high: 32, low: 20 },
    { name: 'May', critical: 40, high: 45, low: 18 },
    { name: 'Jun', critical: 38, high: 42, low: 25 },
    { name: 'Jul', critical: 35, high: 38, low: 40 },
    { name: 'Aug', critical: 45, high: 50, low: 35 },
    { name: 'Sep', critical: 42, high: 45, low: 45 },
    { name: 'Oct', critical: 48, high: 52, low: 30 },
    { name: 'Nov', critical: 52, high: 55, low: 25 },
    { name: 'Dec', critical: 50, high: 53, low: 28 },
];

export const AlertTrendsChart: React.FC = () => {
    return (
        <div className="w-full h-full min-h-[150px] relative">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="0" vertical={false} stroke="#F1F5F9" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#94A3B8', fontSize: 13, fontWeight: 500 }}
                        dy={15}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#94A3B8', fontSize: 13, fontWeight: 500 }}
                        dx={-10}
                        ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80]}
                        tickFormatter={(value) => {
                            if (value === 0) return "0";
                            // if (value <= 30) return `${value}K`;
                            // return "Text";
                            return `${value}K`;
                        }}
                    />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="critical"
                        stroke="#1E293B"
                        strokeWidth={1.5}
                        dot={false}
                    />
                    <Line
                        type="monotone"
                        dataKey="high"
                        stroke="#89B3FF"
                        strokeWidth={1.5}
                        strokeDasharray="4 4"
                        dot={false}
                    />
                    <Line
                        type="monotone"
                        dataKey="low"
                        stroke="#FBBF24"
                        strokeWidth={1.5}
                        strokeDasharray="2 2"
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

// Data for Health status (Small card)
const healthData = [
    { name: 'Completed', value: 60, color: '#2DD4BF' },
    { name: 'Remaining', value: 40, color: '#E2E8F0' },
];

export const DonutChartSmall: React.FC = () => (
    <div className="w-[140px] h-[140px]">
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={[
                        { name: 'Remaining', value: 40, color: '#F1F5F9' },
                        { name: 'Completed', value: 60, color: '#14B8A6' },
                    ]}
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={0}
                    dataKey="value"
                    stroke="none"
                    startAngle={220}
                    endAngle={-140}
                >
                    <Cell fill="#F1F5F9" />
                    <Cell fill="#14B8A6" />
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    </div>
);

// Updated System Health Data to match screenshot EXACTLY
const systemHealthData = [
    { name: 'Healthy', value: 52.1, color: '#3A3A3A' },
    { name: 'Warning', value: 22.8, color: '#93BFF8' },
    { name: 'Critical', value: 13.9, color: '#95E4B4' },
];

export const SystemHealthChart: React.FC = () => (
    <div className="flex items-center gap-12 w-full h-[160px]">
        <div className="w-[140px] h-[140px] relative">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={systemHealthData}
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={0}
                        dataKey="value"
                        stroke="#ffffff"
                        strokeWidth={4}
                    >
                        {systemHealthData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-4">
            {systemHealthData.map((item) => (
                <div key={item.name} className="flex items-center group cursor-pointer transition-all duration-200 hover:translate-x-1">
                    <div className="flex items-center gap-3 w-28">
                        <div className="size-[8px] rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[14px] font-medium text-slate-800">{item.name}</span>
                    </div>
                    <span className="text-[14px] font-medium text-slate-800 tabular-nums transition-colors">{item.value.toFixed(1)}%</span>
                </div>
            ))}
        </div>
    </div>
);
