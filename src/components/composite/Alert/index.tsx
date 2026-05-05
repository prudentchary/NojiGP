import React from 'react';
import { CheckCircle2, X, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/cn';

interface AlertProps {
    title: string;
    description: string;
    onClose: () => void;
    variant?: 'success' | 'failed';
    className?: string;
}

export const CustomAlert: React.FC<AlertProps> = ({ title, description, onClose, variant = 'success', className }) => {
    const isSuccess = variant === 'success';
    
    return (
        <div className={cn(
            "flex items-start gap-4 p-4 rounded-xl animate-in fade-in slide-in-from-top-4 duration-300",
            isSuccess 
                ? "bg-[#F0FDF4] border border-[#DCFCE7]" 
                : "bg-[#FEF2F2] border border-[#FEE2E2]",
            className
        )}>
            <div className="mt-0.5">
                {isSuccess ? (
                    <CheckCircle2 className="size-5 text-[#22C55E]" />
                ) : (
                    <AlertCircle className="size-5 text-[#EF4444]" />
                )}
            </div>
            <div className="flex-1">
                <h3 className={cn(
                    "text-[14px] font-bold leading-tight",
                    isSuccess ? "text-[#14532D]" : "text-[#991B1B]"
                )}>{title}</h3>
                <p className={cn(
                    "text-[13px] mt-1 font-medium",
                    isSuccess ? "text-[#166534]" : "text-[#B91C1C]"
                )}>{description}</p>
            </div>
            <button 
                onClick={onClose}
                className={cn(
                    "p-1 rounded-lg transition-colors",
                    isSuccess ? "hover:bg-[#DCFCE7] text-[#166534]" : "hover:bg-[#FEE2E2] text-[#991B1B]"
                )}
            >
                <X className="size-4" />
            </button>
        </div>
    );
};
