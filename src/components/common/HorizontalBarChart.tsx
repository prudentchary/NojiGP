import React from 'react';
import { cn } from '@/lib/cn';

interface BarData {
    label: string;
    value: number;
    colorStart?: string;
    colorEnd?: string;
}

interface HorizontalBarChartProps {
    data: BarData[];
    max?: number;
}

export const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({ data, max = 300 }) => {
    return (
        <div className="flex flex-col gap-6 flex-1">
            {data.map((item, idx) => {
                const percentage = (item.value / max) * 100;
                return (
                    <div key={idx} className="flex items-center gap-6 group">
                        <span className="w-12 text-[12px] font-bold text-slate-300 uppercase tracking-widest">{item.label}</span>
                        <div className="flex-1 h-[22px] bg-slate-50/50 rounded-full dark:bg-slate-800/30 overflow-hidden relative">
                            <div 
                                className="h-full absolute left-0 top-0 transition-all duration-1000 ease-out flex items-center justify-end px-4"
                                style={{ 
                                    width: `${percentage}%`,
                                    background: `linear-gradient(90deg, ${item.colorStart || '#8B5CF6'} 0%, ${item.colorEnd || '#3B82F6'} 100%)`
                                }}
                            >
                                <span className="text-[11px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                    {item.value}
                                </span>
                            </div>
                        </div>
                        <span className="w-8 text-[12px] font-black text-slate-500 text-right">{item.value}</span>
                    </div>
                );
            })}
        </div>
    );
};
