import React from "react";
import { Activity, ShieldAlert, Users, FileText, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface SummaryCardProps {
    icon: React.ElementType;
    label: string;
    value: string | number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ icon: Icon, label, value }) => (
    <div className="bg-white border border-slate-50 rounded-[12px] p-4 flex flex-col gap-2 shadow-sm transition-all hover:shadow-md dark:bg-slate-900 dark:border-slate-800">
        <div className="flex items-center gap-2">
            <Icon className="size-4 text-slate-400" />
            <span className="text-[15px] font-bold text-slate-900 dark:text-white leading-none tracking-tight">{value}</span>
        </div>
        <span className="text-[12px] font-medium text-slate-400 tracking-tight leading-none">{label}</span>
    </div>
);

const timelineData = [
    { time: '00:00', count: 30 },
    { time: '00:01', count: 5 },
    { time: '00:02', count: 17 },
    { time: '00:03', count: 13 },
    { time: '00:04', count: 21 },
    { time: '00:05', count: 44 },
    { time: '00:06', count: 2 },
    { time: '00:07', count: 7 },
    { time: '00:08', count: 0 },
    { time: '00:09', count: 5 },
    { time: '00:10', count: 9 },
    { time: '00:11', count: 11 },
];

const BubbleCloud: React.FC = () => (
    <div className="relative w-16 h-[140px] mt-4">
        {/* Row 1: Top Small Dots + Glowy Cyan */}
        <div className="absolute top-0 left-0 size-[6px] rounded-full bg-[#14B8A6]/90" />
        <div className="absolute top-0 left-[12px] size-[6px] rounded-full bg-[#14B8A6]/90" />
        <div className="absolute top-0 left-[24px] size-[6px] rounded-full bg-[#14B8A6]/90" />
        <div className="absolute top-[-4px] left-[36px] size-[18px] rounded-full bg-[#A5F3FC]/60 blur-[1px] border border-cyan-100/50" />
        
        {/* Row 2: Smaller dots and Grey accent */}
        <div className="absolute top-[18px] left-[4px] size-[7px] rounded-full bg-[#14B8A6]/80" />
        <div className="absolute top-[20px] left-[18px] size-[7px] rounded-full bg-[#14B8A6]/80" />
        <div className="absolute top-[28px] left-[26px] size-[8px] rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="absolute top-[28px] left-[42px] size-[7px] rounded-full bg-[#14B8A6]/80" />
        <div className="absolute top-[28px] left-[54px] size-[7px] rounded-full bg-[#14B8A6]/80" />
        
        {/* LARGE Teal Bubbles on the left */}
        <div className="absolute top-[40px] left-0 size-[28px] rounded-full bg-gradient-to-br from-[#14B8A6] to-[#0D9488] shadow-sm" />
        <div className="absolute top-[75px] left-[2px] size-[26px] rounded-full bg-gradient-to-br from-[#14B8A6] to-[#0D9488] shadow-sm" />
        
        {/* Mid area tiny dots */}
        <div className="absolute top-[52px] left-[30px] size-[6px] rounded-full bg-[#14B8A6]/70 transition-all hover:scale-150" />
        <div className="absolute top-[68px] left-[32px] size-[6px] rounded-full bg-[#14B8A6]/70" />
        <div className="absolute top-[55px] left-[40px] size-[6px] rounded-full bg-[#14B8A6]/70" />
        <div className="absolute top-[55px] left-[52px] size-[6px] rounded-full bg-[#14B8A6]/70" />
        <div className="absolute top-[81px] left-[30px] size-[8px] rounded-full bg-[#14B8A6]/70" />

        {/* Medium Grey Accent */}
        <div className="absolute top-[102px] left-[26px] size-[8px] rounded-full bg-slate-200 dark:bg-slate-700" />

        {/* LARGE Teal Bubble on the right */}
        <div className="absolute top-[92px] left-[40px] size-[28px] rounded-full bg-gradient-to-br from-[#14B8A6] to-[#0D9488] shadow-sm" />

        {/* Bottom clusters */}
        <div className="absolute bottom-[24px] left-[2px] size-[8px] rounded-full bg-[#14B8A6]/90" />
        <div className="absolute bottom-[24px] left-[16px] size-[8px] rounded-full bg-[#14B8A6]/90" />
        <div className="absolute bottom-[6px] left-[8px] size-[6px] rounded-full bg-[#14B8A6]/90" />
        <div className="absolute bottom-[4px] left-[34px] size-[6px] rounded-full bg-[#14B8A6]/90" />
    </div>
);

export const IncidentsTimeline: React.FC = () => {
    return (
        <div className="bg-[#F9FBFF]/60 border border-slate-100 rounded-[24px] p-8 shadow-sm dark:bg-slate-900/40 dark:border-slate-800">
            <div className="flex gap-4">
                {/* Left side summary cards */}
                <div className="w-[180px] flex flex-col gap-3">
                    <SummaryCard icon={Activity} label="Total events" value="75" />
                    <SummaryCard icon={ShieldAlert} label="Behavior anomaly" value="75" />
                    <SummaryCard icon={FileText} label="Policy violations" value="75" />
                    <SummaryCard icon={Users} label="Affected users" value="75" />
                </div>

                {/* Vertical Divider */}
                <div className="w-[1px] bg-slate-100 dark:bg-slate-800 self-stretch my-2" />

                {/* Right side bubble chart */}
                <div className="flex-1 w-full overflow-hidden">
                    <div className="flex justify-between items-start w-full">
                        {timelineData.map((item, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center group relative min-w-0">
                                <span className="text-[11px] font-bold text-slate-400 mb-6">{item.time}</span>
                                <span className="text-[16px] font-black text-slate-900 dark:text-white leading-none z-10 translate-y-[-4px]">
                                    {item.count}
                                </span>
                                
                                <BubbleCloud />

                                {/* Vertical Divider between slots */}
                                {idx < timelineData.length - 1 && (
                                    <div className="absolute top-[10px] -right-[1px] w-[1px] h-[170px] bg-slate-200/80 dark:bg-slate-800 pointer-events-none" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
