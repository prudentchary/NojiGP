import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

interface MonitoringSectionProps {
    title: string;
    children: React.ReactNode;
    className?: string;
    rightElement?: React.ReactNode;
    showToday?: boolean;
}

export const MonitoringSection: React.FC<MonitoringSectionProps> = ({ 
    title, 
    children, 
    className, 
    rightElement, 
    showToday = true 
}) => {
    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <div className="flex items-center justify-between">
                <h3 className="text-[18px] font-bold text-slate-800 dark:text-white tracking-tight">{title}</h3>
                <div className="flex items-center gap-4">
                    {rightElement}
                    {showToday && (
                        <button className="flex items-center gap-2 text-[13px] font-bold text-slate-400 hover:text-slate-600 transition-colors">
                            Today
                            <ChevronDown className="size-4 opacity-70" />
                        </button>
                    )}
                </div>
            </div>
            <div className="bg-white border border-slate-50 rounded-[24px] p-8 shadow-sm dark:bg-slate-900 dark:border-slate-800 overflow-hidden">
                {children}
            </div>
        </div>
    );
};
