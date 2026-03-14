import React from 'react';
import { Activity, Server, Database, Globe, Cpu, MemoryStick as Memory, ChevronDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
    { name: '00:00', cpu: 30, memory: 45, network: 20 },
    { name: '04:00', cpu: 25, memory: 42, network: 18 },
    { name: '08:00', cpu: 55, memory: 60, network: 45 },
    { name: '12:00', cpu: 80, memory: 75, network: 70 },
    { name: '16:00', cpu: 65, memory: 68, network: 50 },
    { name: '20:00', cpu: 40, memory: 55, network: 30 },
];

const Monitoring: React.FC = () => {
    return (
        <div className="flex flex-col w-full gap-8 animate-in fade-in duration-700">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-[22px] font-bold text-slate-800 dark:text-white tracking-tight">System Monitoring</h2>
                <button className="flex items-center gap-2 text-[13px] font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">
                    Last 24 Hours <ChevronDown className="size-4" />
                </button>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MonitoringCard icon={Cpu} label="CPU Usage" value="42%" status="Healthy" statusColor="text-emerald-500" />
                <MonitoringCard icon={Memory} label="Memory Usage" value="68%" status="Nominal" statusColor="text-emerald-500" />
                <MonitoringCard icon={Server} label="Active Servers" value="12/12" status="All Online" statusColor="text-emerald-500" />
                <MonitoringCard icon={Globe} label="API Latency" value="120ms" status="Average" statusColor="text-amber-500" />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white border border-slate-50 rounded-[24px] p-8 shadow-sm dark:bg-slate-900 dark:border-slate-800">
                    <h3 className="text-[17px] font-bold text-slate-800 dark:text-white mb-6">Resource Consumption</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={mockData}>
                                <defs>
                                    <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                                <Tooltip />
                                <Area type="monotone" dataKey="cpu" stroke="#2DD4BF" strokeWidth={2} fillOpacity={1} fill="url(#colorCpu)" />
                                <Area type="monotone" dataKey="memory" stroke="#89B3FF" strokeWidth={2} fill="none" strokeDasharray="5 5" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white border border-slate-50 rounded-[24px] p-8 shadow-sm dark:bg-slate-900 dark:border-slate-800">
                    <h3 className="text-[17px] font-bold text-slate-800 dark:text-white mb-6">Network Throughput</h3>
                    <div className="h-[300px] w-full">
                         <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={mockData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                                <Tooltip />
                                <Area type="monotone" dataKey="network" stroke="#94A3B8" strokeWidth={2} fill="#F1F5F9" fillOpacity={0.5} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MonitoringCard = ({ icon: Icon, label, value, status, statusColor }: any) => (
    <div className="bg-white border border-slate-50 rounded-[20px] p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-slate-50 rounded-lg dark:bg-slate-800">
                <Icon className="size-5 text-slate-400" />
            </div>
            <span className="text-[13px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
        </div>
        <div className="flex items-end justify-between">
            <span className="text-[28px] font-extrabold text-slate-900 dark:text-white leading-none">{value}</span>
            <span className={`text-[12px] font-bold ${statusColor}`}>{status}</span>
        </div>
    </div>
);

export default Monitoring;
