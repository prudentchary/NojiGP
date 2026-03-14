import React from 'react';
import { cn } from '@/lib/cn';

interface UserCellProps {
    name: string;
    role: string;
    avatar: string;
    className?: string;
    grayscale?: boolean;
}

export const UserCell: React.FC<UserCellProps> = ({ 
    name, 
    role, 
    avatar, 
    className,
    grayscale = true 
}) => {
    return (
        <div className={cn("flex items-center gap-3 min-w-0", className)}>
            <img 
                src={avatar} 
                alt={name} 
                className={cn("size-9 rounded-full object-cover shrink-0 border border-slate-100", grayscale && "grayscale hover:grayscale-0 transition-all")} 
            />
            <div className="flex flex-col min-w-0">
                <span className="text-[14.5px] font-bold text-slate-800 dark:text-slate-200 truncate leading-tight">
                    {name}
                </span>
                <span className="text-[12px] text-slate-400 font-medium italic truncate">
                    {role}
                </span>
            </div>
        </div>
    );
};
