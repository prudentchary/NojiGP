import React from 'react';
import { MonitoringSection } from '@/components/common/MonitoringSection';
import { MonitoringSummaryCard } from '@/components/common/MonitoringSummaryCard';
import { TimeCell } from '@/components/common/TimeCell';
import { MonitoringBadge } from '@/components/common/MonitoringBadge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';
import worldMap from '@/assets/world_map_dots.png'; // I'll assume this exists or I'll provide a placeholder

const chartData = [
    { name: '00', val1: 20, val2: 40 },
    { name: '02', val1: 35, val2: 50 },
    { name: '04', val1: 25, val2: 45 },
    { name: '06', val1: 45, val2: 60 },
    { name: '08', val1: 40, val2: 55 },
    { name: '10', val1: 41, val2: 65 }, // Point of focus
    { name: '12', val1: 55, val2: 75 },
    { name: '14', val1: 45, val2: 60 },
    { name: '16', val1: 50, val2: 70 },
    { name: '18', val1: 40, val2: 60 },
    { name: '20', val1: 45, val2: 65 },
    { name: '22', val1: 35, val2: 55 },
];

const NetworkActivity: React.FC = () => {
    return (
        <div className="flex flex-col w-full gap-12 animate-in fade-in duration-500 pb-12">
            
            {/* Overview Section */}
            <MonitoringSection title="Overview">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <MonitoringSummaryCard label="Total traffic" value="1.2 TB" />
                    <MonitoringSummaryCard label="Unique IP's" value="1.245" />
                    <MonitoringSummaryCard label="Active connections" value="342" />
                    <MonitoringSummaryCard label="Anomalies" value="7" trendValue="11.01%" />
                </div>
            </MonitoringSection>

            {/* Top IP's & GEO-IP Map */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <MonitoringSection title="Top Source/Destination IP's">
                    <div className="w-full">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em] border-b border-slate-50 dark:border-slate-800">
                                    <th className="py-6">S/No</th>
                                    <th className="py-6">Source</th>
                                    <th className="py-6">Destination</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <tr key={i} className="group hover:bg-slate-50/50 transition-all">
                                        <td className="py-6 text-[14px] font-bold text-slate-300">{i}</td>
                                        <td className="py-6">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[14px] font-bold text-slate-500">192.168.1.100</span>
                                                <span className="text-[13px] font-black text-slate-900 dark:text-white mt-0.5">(2.3 GB)</span>
                                            </div>
                                        </td>
                                        <td className="py-6">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[14px] font-bold text-slate-500">10.0.0.50</span>
                                                <span className="text-[13px] font-black text-slate-900 dark:text-white mt-0.5">(1.8 GB)</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </MonitoringSection>
                <MonitoringSection title="GEO-IP world map">
                    <div className="h-full flex items-center justify-center min-h-[200px] relative bg-[#F9FAFB] dark:bg-slate-900/50">
                        <img 
                            src={worldMap} 
                            alt="Geo IP Map" 
                            className="w-full h-auto object-contain opacity-90 dark:invert transition-opacity hover:opacity-100" 
                        />
                    </div>
                </MonitoringSection>
            </div>

            {/* VPN usage & Bandwidth usage */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <UsageChart title="VPN usage" />
                <UsageChart title="Bandwidth usage" />
            </div>

            {/* Traffic Anomalies Table */}
            <MonitoringSection title="Traffic Anomalies">
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-slate-400 text-[13px] font-bold uppercase tracking-widest border-b border-slate-50">
                                <th className="py-4 px-2">Time</th>
                                <th className="py-4 px-2">Type</th>
                                <th className="py-4 px-2">Source IP</th>
                                <th className="py-4 px-2">Target</th>
                                <th className="py-4 px-2">Severity</th>
                                <th className="py-4 px-2 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {[
                                { type: 'DDoS', severity: 'Critical', color: 'text-rose-500', status: 'open' },
                                { type: 'DDoS', severity: 'Medium', color: 'text-amber-500', status: 'review' },
                                { type: 'DDoS', severity: 'Low', color: 'text-slate-400', status: 'open' },
                                { type: 'DDoS', severity: 'Critical', color: 'text-rose-500', status: 'blocked' },
                                { type: 'DDoS', severity: 'Critical', color: 'text-rose-500', status: 'open' },
                            ].map((row, i) => (
                                <tr key={i} className="group">
                                    <td className="py-5 px-2">
                                        <TimeCell value="12 Jan 2023, 12:40am" />
                                    </td>
                                    <td className="py-5 px-2 text-[14px] font-bold text-slate-500">{row.type}</td>
                                    <td className="py-5 px-2 text-[14px] font-bold text-slate-500">Multiple</td>
                                    <td className="py-5 px-2 text-[14px] font-bold text-slate-500">Web-Server-01</td>
                                    <td className={`py-5 px-2 text-[12px] font-bold uppercase tracking-widest ${row.color}`}>{row.severity}</td>
                                    <td className="py-5 px-2 text-center">
                                        <MonitoringBadge variant={row.status as any} value={row.status.charAt(0).toUpperCase() + row.status.slice(1)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </MonitoringSection>

            {/* Firewall rule hits Table */}
            <MonitoringSection title="Firewall rule hits">
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-slate-400 text-[13px] font-bold uppercase tracking-widest border-b border-slate-50">
                                <th className="py-4 px-2">Rule Name</th>
                                <th className="py-4 px-2">Action</th>
                                <th className="py-4 px-2">Source</th>
                                <th className="py-4 px-2">Destination</th>
                                <th className="py-4 px-2">Hit Count</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="group">
                                    <td className="py-5 px-2 text-[14px] font-bold text-slate-800">Block-RDP-External</td>
                                    <td className="py-5 px-2 text-[14px] font-bold text-slate-500">Block</td>
                                    <td className="py-5 px-2 text-[14px] font-bold text-slate-500">0.0.0.0/0</td>
                                    <td className="py-5 px-2 text-[14px] font-bold text-slate-500">Internal</td>
                                    <td className="py-5 px-2 text-[14px] font-black text-slate-800">1.245</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </MonitoringSection>

        </div>
    );
};

const UsageChart = ({ title }: { title: string }) => (
    <MonitoringSection title={title}>
        <div className="h-[280px] w-full relative">
            {/* Center Legend matching screenshot */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[20%] flex flex-col items-center">
                <span className="text-[32px] font-black text-slate-900 dark:text-white">41 Mbps</span>
            </div>
            {/* Legend Toggles */}
            <div className="absolute top-0 right-0 flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-slate-900" />
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Upload</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-blue-300" />
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Download</span>
                </div>
            </div>
            
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#E2E8F0" stopOpacity={0.5}/>
                            <stop offset="95%" stopColor="#E2E8F0" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="0" vertical={false} stroke="#F8FAFC" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#CBD5E1', fontSize: 10}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#CBD5E1', fontSize: 10}} />
                    <Tooltip content={<> </>} />
                    <Area type="monotone" dataKey="val2" stroke="#BFDBFE" strokeWidth={1} strokeDasharray="3 3" fill="none" />
                    <Area type="monotone" dataKey="val1" stroke="#1E293B" strokeWidth={2} fill="url(#colorVal)" />
                    {/* Highlight Point */}
                    <ReferenceDot x="10" y={41} r={4} fill="#1E293B" stroke="white" strokeWidth={2} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </MonitoringSection>
);

export default NetworkActivity;
