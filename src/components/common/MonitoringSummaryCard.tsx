import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/cn';

interface MonitoringSummaryCardProps {
    label: string;
    value: string;
    trendValue?: string;
    trendDirection?: 'up' | 'down';
    className?: string;
}

export const MonitoringSummaryCard: React.FC<MonitoringSummaryCardProps> = ({
    label,
    value,
    trendValue,
    trendDirection = 'up',
    className
}) => {
    return (
        <div className={cn(
            "p-8 bg-slate-50/50 rounded-[20px] dark:bg-slate-800/30 flex-1 flex flex-col justify-between group hover:bg-slate-50 transition-all cursor-default",
            className
        )}>
            <div className="flex flex-col gap-2">
                <span className="text-[13px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
                <span className="text-[28px] font-black text-slate-800 dark:text-white leading-tight">
                    {value}
                </span>
            </div>
            {trendValue && (
                <div className="flex items-center gap-1.5 self-end text-[11px] font-bold">
                    <span className={cn(
                        trendDirection === 'up' ? "text-emerald-500" : "text-rose-500"
                    )}>
                        {trendDirection === 'up' ? '+' : '-'}{trendValue}
                    </span>
                    {trendDirection === 'up' ? (
                        <TrendingUp className="size-3.5 text-slate-900 dark:text-white" />
                    ) : (
                        <TrendingDown className="size-3.5 text-slate-900 dark:text-white" />
                    )}
                </div>
            )}
        </div>
    );
};
