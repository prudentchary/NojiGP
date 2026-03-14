import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from '@/lib/cn';

interface DonutData {
    name: string;
    value: number;
    color: string;
}

interface DonutChartProps {
    data: DonutData[];
    title?: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({ data, title }) => {
    const total = data.reduce((acc, item) => acc + item.value, 0);

    return (
        <div className="flex flex-col h-full gap-6">
            {title && <h4 className="text-[14px] font-bold text-slate-700 dark:text-slate-300 mb-2">{title}</h4>}
            <div className="flex items-center gap-12 flex-1">
                <div className="flex-1 h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                
                <div className="flex flex-col gap-6 min-w-[140px]">
                    {data.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-[13px] font-bold">
                            <div className="flex items-center gap-3">
                                <div className="size-2 rounded-sm" style={{ backgroundColor: item.color }} />
                                <span className="text-slate-400 font-medium">{item.name}</span>
                            </div>
                            <span className="text-slate-800 dark:text-white">
                                {((item.value / total) * 100).toFixed(1)}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
