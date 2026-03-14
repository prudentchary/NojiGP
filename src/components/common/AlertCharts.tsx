import React from "react";
import { 
    ResponsiveContainer, 
    PieChart, 
    Pie, 
    Cell, 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip,
    AreaChart,
    Area
} from "recharts";

const statusData = [
    { name: 'Unread', value: 52.1, color: '#334155' },
    { name: 'Investigating', value: 22.8, color: '#94A3B8' },
    { name: 'Treated', value: 13.9, color: '#2DD4BF' },
];

export const IncidentsByStatus: React.FC = () => (
    <div className="flex items-center gap-10 w-full h-[200px]">
        <div className="w-[160px] h-[160px] relative">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={statusData}
                        innerRadius={45}
                        outerRadius={75}
                        paddingAngle={0}
                        dataKey="value"
                        stroke="#ffffff"
                        strokeWidth={4}
                    >
                        {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-4">
            {statusData.map((item) => (
                <div key={item.name} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                        <div className="size-[8px] rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[14px] font-bold text-slate-800 dark:text-slate-200">{item.name}</span>
                    </div>
                    <span className="text-[14px] font-bold text-slate-400">{item.value}%</span>
                </div>
            ))}
        </div>
    </div>
);

const trendData = [
    { name: 'Jan', critical: 21, high: 5, low: 13 },
    { name: 'Feb', critical: 7, high: 14, low: 12 },
    { name: 'Mar', critical: 14, high: 21, low: 13 },
    { name: 'Apr', critical: 24, high: 7, low: 6 },
    { name: 'May', critical: 21, high: 15, low: 12 },
    { name: 'Jun', critical: 18, high: 26, low: 25 },
    { name: 'Jul', critical: 24, high: 32, low: 24 },
    { name: 'Aug', critical: 7, high: 14, low: 12 },
    { name: 'Sep', critical: 14, high: 21, low: 13 },
    { name: 'Oct', critical: 24, high: 7, low: 6 },
    { name: 'Nov', critical: 21, high: 15, low: 12 },
    { name: 'Dec', critical: 38, high: 26, low: 55 }, 
];

export const IncidentsByTimeChart: React.FC = () => (
    <div className="w-full h-full relative">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                <defs>
                    <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1E293B" stopOpacity={0.08}/>
                        <stop offset="95%" stopColor="#1E293B" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94A3B8', fontSize: 13, fontWeight: 500 }}
                    dy={10}
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94A3B8', fontSize: 13, fontWeight: 500 }}
                    dx={-10}
                    ticks={[0, 10, 20, 30]}
                    tickFormatter={(value) => value === 0 ? "0" : `${value}K`}
                />
                <Tooltip />
                <Area 
                    type="monotone" 
                    dataKey="critical" 
                    stroke="#1E293B" 
                    strokeWidth={1.5}
                    fillOpacity={1} 
                    fill="url(#colorCritical)" 
                />
                <Area 
                    type="monotone" 
                    dataKey="high" 
                    stroke="#89B3FF" 
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    fill="none" 
                />
                <Area 
                    type="monotone" 
                    dataKey="low" 
                    stroke="#BFDBFE" 
                    strokeWidth={1.5}
                    strokeDasharray="2 4"
                    fill="none" 
                />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);
