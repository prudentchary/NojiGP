import React from 'react';
import { useParams } from 'react-router';
import { ChevronDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Badge } from '@/components/ui';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const UserDetails: React.FC = () => {
    const { staffId } = useParams();

    return (
        <div className="flex flex-col w-full gap-8">
            {/* Header section with Stats */}
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-[22px] font-bold text-slate-900 tracking-tight">Kate Huntington's Overview</h2>
                <button className="flex items-center gap-2 text-[13px] font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">
                    Today <ChevronDown className="size-4" />
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* SCRS Radial Card */}
                <div className="bg-[#F8FBFF]/60 border border-slate-100 rounded-[20px] p-6 flex flex-col items-center justify-between dark:bg-slate-800/20 dark:border-slate-800">
                    <div className="w-full flex flex-col gap-1 mb-4">
                        <span className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">SCRS</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-[32px] font-bold text-slate-900 leading-none">40</span>
                            <span className="text-xl font-bold text-slate-300">%</span>
                        </div>
                    </div>
                    <div className="w-[120px] h-[120px] relative">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: 'Remaining', value: 60, color: '#F1F5F9' },
                                        { name: 'Completed', value: 40, color: '#2DD4BF' },
                                    ]}
                                    innerRadius={35}
                                    outerRadius={55}
                                    paddingAngle={0}
                                    dataKey="value"
                                    stroke="none"
                                    startAngle={220}
                                    endAngle={-140}
                                >
                                    <Cell fill="#E2E8F0" />
                                    <Cell fill="#2DD4BF" />
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Status Grid Cards */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatusCard label="Risk" value="Moderate" />
                    <StatusCard label="Agent status" value="On" />
                    <StatusCard label="Policy violations" value="7" percentage="+11.01%" />
                    <StatusCard label="Total Alerts" value="7" percentage="+11.01%" />
                    <StatusCard label="High severity incidents" value="7" percentage="+11.01%" />
                    <StatusCard label="Active threats" value="7" percentage="+11.01%" />
                </div>
            </div>

            {/* Middle Section: Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Incidents Table */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-[16px] font-bold text-slate-900 tracking-tight">Incidents</h3>
                    <div className="bg-white border border-slate-50 rounded-2xl overflow-hidden shadow-sm dark:bg-slate-900 dark:border-slate-800">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-50 dark:border-slate-800">
                                    <th className="px-6 py-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider">Time</th>
                                    <th className="px-6 py-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider">Severity</th>
                                    <th className="px-6 py-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i}>
                                        <td className="px-6 py-4 text-[13px] font-bold text-slate-700">12 Jan 2023, 12:90am</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-slate-100 rounded-full text-[11px] font-bold text-slate-500 dark:bg-slate-800">Label</span>
                                        </td>
                                        <td className="px-6 py-4 text-[13px] font-semibold text-slate-500">Behavioral Anomaly</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Activity Timeline Table */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-[16px] font-bold text-slate-900 tracking-tight">Activity timeline</h3>
                    <div className="bg-white border border-slate-50 rounded-2xl overflow-hidden shadow-sm dark:bg-slate-900 dark:border-slate-800">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-50 dark:border-slate-800">
                                    <th className="px-6 py-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider">Time</th>
                                    <th className="px-6 py-4 text-[13px] font-bold text-slate-400 uppercase tracking-wider">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                {[
                                    'Login - Corporate Wi-Fi',
                                    'Agent Check-in - Normal',
                                    'Alert - Behavioral Anomaly',
                                    'Login - Corporate Wi-Fi',
                                    'Login - Corporate Wi-Fi'
                                ].map((desc, i) => (
                                    <tr key={i}>
                                        <td className="px-6 py-4 text-[13px] font-bold text-slate-700">12 Jan 2023, 12:90am</td>
                                        <td className="px-6 py-4 text-[13px] font-semibold text-slate-500">{desc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Info Modules */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <InfoModule title="Personal Info" data={[
                    { label: 'First name:', value: 'Kate' },
                    { label: 'Last name:', value: 'Huntington' },
                    { label: 'Other name:', value: '-' },
                    { label: 'User ID:', value: '-' },
                    { label: 'Role:', value: 'Manager' },
                    { label: 'Department:', value: 'Finance' },
                ]} />
                
                <InfoModule title="Device Info" data={[
                    { label: 'Device Name:', value: "Kate's PC" },
                    { label: 'Device ID:', value: 'LAPTOP-IT-001' },
                    { label: 'Agent status:', value: 'On' },
                    { label: 'Last check-in:', value: '10 mins ago' },
                    { label: 'OS:', value: 'Windows 11 Pro' },
                    { label: 'Model version:', value: 'BMSCRS (v2.1.4)' },
                    { label: 'Current session:', value: '2 hours 15 minutes' },
                ]} />

                <InfoModule title="Network & Location" data={[
                    { label: 'Current IP:', value: '192.168.1.100 (Lagos, NG)' },
                    { label: 'Connection:', value: 'Corporate Wi-Fi' },
                    { label: 'VPN Status:', value: 'Not active', valueColor: 'text-rose-500' },
                ]}>
                    <div className="mt-6 pt-6 border-t border-slate-50 dark:border-slate-800">
                        <span className="text-[14px] font-bold text-slate-800 dark:text-slate-200">Last Locations:</span>
                        <ul className="mt-3 space-y-2">
                             <li className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
                                <span className="size-1 bg-slate-400 rounded-full" /> Today 09:15 - Lagos, NG
                             </li>
                             <li className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
                                <span className="size-1 bg-slate-400 rounded-full" /> Yesterday 22:15 - Unknown
                             </li>
                        </ul>
                    </div>
                </InfoModule>
            </div>
        </div>
    );
};

const StatusCard = ({ label, value, percentage }: { label: string, value: string, percentage?: string }) => (
    <div className="bg-white border border-slate-50 rounded-[20px] p-6 shadow-sm flex flex-col justify-between dark:bg-slate-900 dark:border-slate-800">
        <span className="text-[13px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
        <div className="mt-4 flex flex-col gap-1">
            <span className="text-[28px] font-extrabold text-slate-900 tracking-tight leading-none dark:text-white">{value}</span>
            {percentage && (
                <div className="flex items-center gap-1.5 mt-2">
                    <span className="text-[13px] font-bold text-slate-400">{percentage}</span>
                    <TrendingUp className="size-3.5 text-slate-400" />
                </div>
            )}
        </div>
    </div>
);

const InfoModule = ({ title, data, children }: { title: string, data: { label: string, value: string, valueColor?: string }[], children?: React.ReactNode }) => (
    <div className="bg-[#F9FAFB] rounded-[24px] p-8 border border-white shadow-sm dark:bg-slate-950 dark:border-slate-800">
        <h3 className="text-[17px] font-bold text-slate-800 mb-8 dark:text-slate-200">{title}</h3>
        <div className="space-y-4">
            {data.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between group">
                    <span className="text-[14px] font-medium text-slate-500">{item.label}</span>
                    <span className={cn("text-[14px] font-bold text-slate-800 dark:text-slate-300", item.valueColor)}>
                        {item.value}
                    </span>
                </div>
            ))}
        </div>
        {children}
    </div>
);

export default UserDetails;
