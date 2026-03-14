import React from 'react';
import { cn } from '@/lib/cn';

interface TimeCellProps {
    value: string;
    className?: string;
}

export const TimeCell: React.FC<TimeCellProps> = ({ value, className }) => {
    return (
        <span className={cn("text-[14px] font-black text-slate-700 dark:text-slate-300 tracking-tight", className)}>
            {value}
        </span>
    );
};
