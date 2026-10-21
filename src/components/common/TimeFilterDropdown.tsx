import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface TimeFilterDropdownProps {
    timeRange: string;
    onSelectTime: (value: string) => void;
}

const TIME_OPTIONS = [
    { label: '15m', value: '15m' },
    { label: '1h', value: '1h' },
    { label: '24h', value: '24h' },
    { label: '7ds', value: '7d' },
    { label: '30d', value: '30d' },
];

export const TimeFilterDropdown: React.FC<TimeFilterDropdownProps> = ({ timeRange, onSelectTime }) => {
    const [isOpen, setIsOpen] = useState(false);

    const currentLabel = TIME_OPTIONS.find(o => o.value === timeRange)?.label || 'Last 24 hours';

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-[13px] font-bold text-slate-500 hover:text-slate-800 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg transition-colors border border-slate-100 dark:border-slate-700"
            >
                {currentLabel}
                <ChevronDown className="size-4" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-lg z-50 py-2">
                    {TIME_OPTIONS.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => {
                                onSelectTime(opt.value);
                                setIsOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-[13px] font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};