import React from "react";
import { cn } from "@/lib/cn";

interface BadgeProps {
    children: React.ReactNode;
    variant?: "success" | "warning" | "danger" | "default";
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = "default",
    className,
}) => {
    const variants = {
        success: "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30",
        warning: "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30",
        danger: "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30",
        default: "bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-800/50 dark:text-slate-400 dark:border-slate-700",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border transition-colors",
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    );
};
