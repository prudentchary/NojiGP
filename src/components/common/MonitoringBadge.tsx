import React from 'react';
import { cn } from '@/lib/cn';

type BadgeType = 'status' | 'health' | 'event';

interface MonitoringBadgeProps {
    type?: BadgeType;
    value: string | number;
    className?: string;
    variant?: 'open' | 'blocked' | 'allow' | 'review' | 'pending' | 'resolved' | 'alert' | 'generic';
}

export const MonitoringBadge: React.FC<MonitoringBadgeProps> = ({ 
    type = 'status', 
    value, 
    className,
    variant = 'generic'
}) => {
    // Determine style based on variant for status badges
    const statusStyles: Record<string, string> = {
        'open': "bg-white border-rose-200 text-rose-400 bg-rose-50/20",
        'blocked': "bg-rose-50/50 border-rose-100 text-rose-500",
        'allow': "bg-emerald-50/50 border-emerald-100 text-emerald-500",
        'review': "bg-amber-50/50 border-amber-100 text-amber-500",
        'pending': "bg-slate-50 border-slate-200 text-slate-400",
        'resolved': "bg-emerald-50 text-emerald-600 border-emerald-100",
        'alert': "bg-amber-50 border-amber-200 text-amber-500",
        'generic': "bg-slate-50 border-slate-100 text-slate-400"
    };

    if (type === 'health') {
        const val = typeof value === 'string' ? parseInt(value) : value;
        const colorClass = val >= 95 ? "text-emerald-500" : val >= 80 ? "text-amber-500" : "text-rose-500";
        return (
            <div className={cn("px-2.5 py-1 bg-emerald-50 rounded-full border border-emerald-100/50 inline-flex items-center dark:bg-emerald-950/20", className)}>
                <span className={cn("text-[13px] font-black", colorClass)}>{value}%</span>
            </div>
        );
    }

    return (
        <span className={cn(
            "px-3 py-1 text-[11px] font-bold rounded-md border min-w-[70px] text-center shadow-sm dark:bg-slate-800 transition-all",
            statusStyles[variant] || statusStyles.generic,
            className
        )}>
            {value}
        </span>
    );
};
