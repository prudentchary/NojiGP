import React from 'react';
import { ChevronDown, Info } from 'lucide-react';
import { cn } from '@/lib/cn';

const UserBehaviour: React.FC = () => {
    return (
        <div className="flex flex-col w-full gap-12 animate-in fade-in duration-500 pb-12">
            {/* Top 5 Risky Users */}
            <Section 
                title="TOP 5 Most risky users" 
                content={
                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-slate-400 text-[13px] font-bold uppercase tracking-widest">
                                    <th className="py-2">Staff</th>
                                    <th className="py-2">Department</th>
                                    <th className="py-2">Risk score</th>
                                    <th className="py-2">SCRS</th>
                                    <th className="py-2">Incidents</th>
                                    <th className="py-2">Key Anomaly</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="group">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <img src="https://i.pravatar.cc/150?u=kate" alt="" className="size-9 rounded-full object-cover grayscale" />
                                                <div className="flex flex-col">
                                                    <span className="text-[14.5px] font-bold text-slate-800 dark:text-slate-200">Kate Huntington</span>
                                                    <span className="text-[12px] text-slate-400 font-medium italic">Financial officer</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 text-[14px] text-slate-500 font-medium">Finance</td>
                                        <td className="py-4">
                                            <span className="px-2 py-0.5 bg-rose-50 text-rose-500 text-[11px] font-bold rounded border border-rose-100/50">High</span>
                                        </td>
                                        <td className="py-4 text-[14px] font-bold text-slate-600">89</td>
                                        <td className="py-4 text-[14px] font-bold text-slate-600">3</td>
                                        <td className="py-4 text-[14px] text-slate-500 font-medium">VPN violation</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            />

            {/* Abnormal login patterns */}
            <Section 
                title="Abnormal login patterns" 
                content={
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Heatmap Grid */}
                        <div className="flex-1 flex flex-col gap-6">
                            <div className="flex flex-col gap-4">
                                {/* Time Labels */}
                                <div className="flex ml-10 text-[11px] font-bold text-slate-400 gap-[9px]">
                                    {Array.from({ length: 25 }).map((_, i) => (
                                        <span key={i} className="w-[14px]">{i === 19 ? '20' : i === 21 ? '00' : i.toString().padStart(2, '0')}</span>
                                    ))}
                                </div>
                                <div className="flex flex-col gap-[6px]">
                                    {['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'].map((day) => (
                                        <div key={day} className="flex items-center gap-4">
                                            <span className="w-6 text-[11px] font-bold text-slate-400">{day}</span>
                                            <div className="flex gap-[6px] flex-1">
                                                {Array.from({ length: 24 }).map((_, i) => {
                                                    // Mock intensity
                                                    const intensity = Math.random();
                                                    return (
                                                        <div 
                                                            key={i} 
                                                            className={cn(
                                                                "h-[18px] flex-1 rounded-sm",
                                                                intensity > 0.8 ? "bg-[#059669]" :
                                                                intensity > 0.5 ? "bg-[#10B981]" :
                                                                intensity > 0.2 ? "bg-[#D1FAE5]" : "bg-[#F9FAFB]"
                                                                , "dark:bg-slate-800"
                                                            )}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Legend */}
                            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-2 border-t border-slate-50 pt-6">
                                <div className="flex items-center gap-2">
                                    <Info className="size-4" />
                                    Learn how we count contributions
                                </div>
                                <div className="flex items-center gap-3">
                                    <span>Less</span>
                                    <div className="flex gap-1.5">
                                        <div className="size-3.5 bg-slate-50 rounded-sm dark:bg-slate-800" />
                                        <div className="size-3.5 bg-[#D1FAE5] rounded-sm" />
                                        <div className="size-3.5 bg-[#10B981] rounded-sm" />
                                        <div className="size-3.5 bg-[#059669] rounded-sm" />
                                    </div>
                                    <span>More</span>
                                </div>
                            </div>
                        </div>

                        {/* Top Abnormal Logins Panel */}
                        <div className="w-full lg:w-[280px] bg-[#F9FAFB] rounded-[24px] p-8 dark:bg-slate-900/50">
                            <h4 className="text-[14px] font-bold text-slate-700 dark:text-slate-200 mb-8">Top abnormal logins</h4>
                            <div className="flex flex-col gap-6">
                                <AbnormalUser color="bg-slate-800" name="Kate Huntington" value="9" />
                                <AbnormalUser color="bg-blue-400" name="John Doe" value="2" />
                                <AbnormalUser color="bg-emerald-400" name="Mike Barret" value="1" />
                                <AbnormalUser color="bg-emerald-100" name="Others" value="12" />
                            </div>
                        </div>
                    </div>
                }
            />

            {/* Impossible travel alerts */}
            <Section 
                title="Impossible travel alerts" 
                content={
                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-slate-400 text-[13px] font-bold uppercase tracking-widest">
                                    <th className="py-4">Time</th>
                                    <th className="py-4">Staff</th>
                                    <th className="py-4">From</th>
                                    <th className="py-4">To</th>
                                    <th className="py-4">Time Diff</th>
                                    <th className="py-4 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="group">
                                        <td className="py-5 text-[14px] font-black text-slate-700 dark:text-slate-300">12 Jan 2023, 12:40am</td>
                                        <td className="py-5">
                                            <div className="flex items-center gap-3">
                                                <img src="https://i.pravatar.cc/150?u=kate" alt="" className="size-9 rounded-full object-cover grayscale" />
                                                <div className="flex flex-col">
                                                    <span className="text-[14.5px] font-bold text-slate-800 dark:text-slate-200">Kate Huntington</span>
                                                    <span className="text-[12px] text-slate-400 font-medium italic">Financial officer</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-5 text-[14px] text-slate-500 font-bold">Lagos, NG</td>
                                        <td className="py-5 text-[14px] text-slate-500 font-bold">Paris, FR</td>
                                        <td className="py-5 text-[14px] text-slate-500 font-bold">1hr</td>
                                        <td className="py-5 text-center">
                                            <span className="px-3 py-1 bg-white border border-rose-200 text-rose-400 text-[11px] font-bold rounded-md shadow-sm">Open</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            />

            {/* Privilege escalation events */}
            <Section 
                title="Privilege escalation events" 
                content={
                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-slate-400 text-[13px] font-bold uppercase tracking-widest">
                                    <th className="py-4">Time</th>
                                    <th className="py-4">Staff</th>
                                    <th className="py-4">From role</th>
                                    <th className="py-4">To role</th>
                                    <th className="py-4 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="group">
                                        <td className="py-6 text-[14px] font-black text-slate-700 dark:text-slate-300">12 Jan 2023, 12:40am</td>
                                        <td className="py-6">
                                            <div className="flex items-center gap-3">
                                                <img src="https://i.pravatar.cc/150?u=kate" alt="" className="size-9 rounded-full object-cover grayscale" />
                                                <div className="flex flex-col">
                                                    <span className="text-[14.5px] font-bold text-slate-800 dark:text-slate-200">Kate Huntington</span>
                                                    <span className="text-[12px] text-slate-400 font-medium italic">Manager</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 text-[14px] text-slate-500 font-bold">Finance officer</td>
                                        <td className="py-6 text-[14px] text-slate-500 font-bold">Manager</td>
                                        <td className="py-6 text-center">
                                            <span className="px-3 py-1 bg-white border border-rose-200 text-rose-400 text-[11px] font-bold rounded-md shadow-sm">Open</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            />
        </div>
    );
};

const Section = ({ title, content }: { title: string, content: React.ReactNode }) => (
    <div className="flex flex-col gap-8 w-full">
        <div className="flex items-center justify-between">
            <h3 className="text-[18px] font-bold text-slate-800 dark:text-white tracking-tight">{title}</h3>
            <button className="flex items-center gap-2 text-[13px] font-bold text-slate-400 hover:text-slate-600 transition-colors">
                Today
                <ChevronDown className="size-4" />
            </button>
        </div>
        <div className="bg-white border border-slate-50 rounded-[24px] p-8 shadow-sm dark:bg-slate-900 dark:border-slate-800">
            {content}
        </div>
    </div>
);

const AbnormalUser = ({ color, name, value }: any) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className={cn("size-2 rounded-full", color)} />
            <span className="text-[13px] font-bold text-slate-500 dark:text-slate-400">{name}</span>
        </div>
        <span className="text-[13px] font-black text-slate-800 dark:text-white">{value}</span>
    </div>
);

export default UserBehaviour;
