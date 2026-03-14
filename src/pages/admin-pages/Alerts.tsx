import React, { useState, useEffect } from 'react';
import { ChevronDown, ListFilter } from 'lucide-react';
import { IncidentsTimeline } from '@/components/common/IncidentsTimeline';
import { IncidentsByStatus, IncidentsByTimeChart } from '@/components/common/AlertCharts';
import { PolicyViolationModal } from '@/components/common/PolicyViolationModal';
import { cn } from '@/lib/cn';

const Alerts: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsModalOpen(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col w-full gap-8 animate-in fade-in duration-700">
            {/* Page Header placeholder (Already in layout but adding local context if needed) */}
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-[22px] font-bold text-slate-800 dark:text-white tracking-tight">Incidents Timeline</h2>
                <button className="flex items-center gap-2 text-[13px] font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">
                    Today <ChevronDown className="size-4" />
                </button>
            </div>

            {/* Top Section: Timeline */}
            <IncidentsTimeline />

            {/* Bottom Section: Grid of Charts */}
            <div className="flex items-center justify-end mb-[-10px]">
                 <button className="flex items-center gap-2 text-[14px] font-bold text-[#14B8A6] hover:text-[#0D9488] transition-colors">
                    <ListFilter className="size-4" />
                    Timeline view
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
                {/* Incidents by status card */}
                <div className="lg:col-span-2 bg-white border border-slate-50 rounded-[24px] p-8 shadow-sm dark:bg-slate-900 dark:border-slate-800">
                    <h3 className="text-[18px] font-bold text-slate-900 dark:text-white tracking-tight mb-8">Incidents by status</h3>
                    <IncidentsByStatus />
                </div>

                {/* Incidents by time card */}
                <div className="lg:col-span-3 bg-white border border-slate-50 rounded-[24px] p-8 shadow-sm dark:bg-slate-900 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-6">
                            <h3 className="text-[18px] font-bold text-slate-900 dark:text-white tracking-tight">Incidents by time</h3>
                            <div className="h-6 w-[1px] bg-slate-100 dark:bg-slate-800" />
                            <div className="flex items-center gap-6">
                                <LegendItem color="#1E293B" label="Critical" />
                                <LegendItem color="#89B3FF" label="High" />
                                <LegendItem color="#BFDBFE" label="Low" />
                            </div>
                        </div>
                    </div>
                    <div className="h-[280px] w-full">
                        <IncidentsByTimeChart />
                    </div>
                </div>
            </div>

            {/* Reusable Alert Modal */}
            <PolicyViolationModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
    );
};

const LegendItem = ({ color, label }: { color: string, label: string }) => (
    <div className="flex items-center gap-2.5">
        <span className="size-2 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-[14px] font-bold text-slate-400">{label}</span>
    </div>
);

export default Alerts;
