import React from "react";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/cn";

type StatCardVariant = "emerald" | "amber" | "rose" | "slate" | "default";

interface StatCardProps {
    label: string;
    value: string | number;
    percentage?: string;
    variant?: StatCardVariant;
    className?: string;
}

const variantStyles: Record<StatCardVariant, string> = {
    emerald: "bg-[#EEFBF9] border-transparent",
    amber: "bg-[#FFFAF2] border-transparent",
    rose: "bg-[#FFF5F6] border-transparent",
    slate: "bg-[#F8F9FA] border-transparent",
    default: "bg-white border-slate-100",
};

export const StatCard: React.FC<StatCardProps> = ({
    label,
    value,
    percentage,
    variant = "default",
    className
}) => {
    return (
        <div className={cn(
            "p-6 rounded-[14px] border flex flex-col justify-between h-[110px] transition-all duration-300 hover:shadow-md",
            variantStyles[variant],
            className
        )}>
            <div className="flex justify-between items-start">
                <span className="text-[14px] font-semibold text-slate-800 tracking-tight leading-none">
                    {label}
                </span>
            </div>

            <div className="flex items-end justify-between">
                <div className="flex flex-col gap-1">
                    <span className="text-3xl font-bold text-slate-900 leading-none">{value}</span>
                </div>

                <div className="flex flex-col items-end gap-2">
                    {percentage && (
                        <div className="flex items-center gap-1 text-slate-500 mb-1">
                            <span className="text-[12px] font-semibold">{percentage}</span>
                            <TrendingUp className="size-3.5 text-slate-800" strokeWidth={2.5} />
                        </div>
                    )}

            
                </div>
            </div>
        </div>
    );
};
