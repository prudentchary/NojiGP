import React, { useState } from 'react';
import { cn } from '@/lib/cn';

const PolicyConfigs: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Identity & Auth');

    const tabs = [
        'Identity & Auth',
        'Device security',
        'Network security',
        'Peripheral & media',
        'Data PHI',
        'Data PHI'
    ];

    return (
        <div className="flex flex-col w-full gap-8 animate-in fade-in duration-500">
            {/* Header / Tabs */}
            <div className="flex gap-10 border-b border-slate-50 dark:border-slate-800">
                {tabs.map((tab, idx) => (
                    <button
                        key={`${tab}-${idx}`}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "pb-4 text-[15px] font-bold transition-all relative whitespace-nowrap",
                            activeTab === tab 
                                ? "text-[#14B8A6]" 
                                : "text-slate-300 hover:text-slate-500"
                        )}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#14B8A6] rounded-t-full" />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="bg-[#F9FAFB]/50 border border-slate-50 rounded-[24px] p-10 dark:bg-slate-900/40 dark:border-slate-800">
                <div className="flex flex-col gap-10">
                    <h3 className="text-[17px] font-bold text-slate-700 dark:text-slate-200 tracking-tight">Incident Details</h3>
                    
                    <div className="flex flex-col gap-6 max-w-full">
                        <DetailRow label="Incident ID:" value="INC-2024-0123" />
                        <DetailRow label="Severity:" value="Critical" />
                        <DetailRow label="Time:" value="11:30 AM (2 hours ago)" />
                        <DetailRow label="Status:" value="Under Investigation" />
                        <DetailRow label="Assigned:" value="-" />
                        <DetailRow label="Correlation score" value="Finance" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailRow = ({ label, value }: { label: string, value: string }) => (
    <div className="flex items-center justify-between w-full border-b border-slate-50/50 pb-2 dark:border-slate-800/50">
        <span className="text-[14px] font-bold text-slate-400">{label}</span>
        <span className="text-[14px] font-black text-slate-700 dark:text-slate-200">{value}</span>
    </div>
);

export default PolicyConfigs;
