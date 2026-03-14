import React, { useState } from 'react';
import { MonitoringSection } from '@/components/common/MonitoringSection';
import { DonutChart } from '@/components/common/DonutChart';
import { MonitoringBadge } from '@/components/common/MonitoringBadge';
import { TimeCell } from '@/components/common/TimeCell';
import { UserCell } from '@/components/common/UserCell';
import { ChevronLeft, ChevronRight, MoreHorizontal, ChevronDown } from 'lucide-react';

const donutData = [
    { name: 'Windows', value: 52.1, color: '#111827' },
    { name: 'Mac', value: 22.8, color: '#93C5FD' },
    { name: 'Linux', value: 13.9, color: '#A7F3D0' },
];

const EndpointDevices: React.FC = () => {
    const [page, setPage] = useState(1);

    return (
        <div className="flex flex-col w-full gap-12 animate-in fade-in duration-500 pb-12">
            
            {/* Devices & health status */}
            <MonitoringSection title="Devices & health status">
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-slate-400 text-[13px] font-bold uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                                <th className="py-4 px-2">Device ID</th>
                                <th className="py-4 px-2">Type</th>
                                <th className="py-4 px-2">OS</th>
                                <th className="py-4 px-2">Health</th>
                                <th className="py-4 px-2">Last seen</th>
                                <th className="py-4 px-2">Agent versions</th>
                                <th className="py-4 px-2">Users</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {Array.from({ length: 10 }).map((_, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-all group">
                                    <td className="py-5 px-2 text-[14px] font-bold text-slate-500 uppercase tracking-tight">LAPTOP-SALES-002</td>
                                    <td className="py-5 px-2 text-[14px] text-slate-400 font-medium">Laptop</td>
                                    <td className="py-5 px-2 text-[14px] text-slate-400 font-medium">Windows 11</td>
                                    <td className="py-5 px-2">
                                        <MonitoringBadge type="health" value={i < 2 ? 98 : i < 5 ? 85 : 94} />
                                    </td>
                                    <td className="py-5 px-2">
                                        <TimeCell value="12 Jan 2023, 12:40am" />
                                    </td>
                                    <td className="py-5 px-2 text-[14px] text-slate-400 font-bold">v2.1.4</td>
                                    <td className="py-5 px-2">
                                        <div className="flex items-center -space-x-2">
                                            <img src="https://i.pravatar.cc/150?u=1" alt="" className="size-8 rounded-full border-2 border-white grayscale" />
                                            <img src="https://i.pravatar.cc/150?u=2" alt="" className="size-8 rounded-full border-2 border-white grayscale" />
                                            <div className="size-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400">
                                                +2
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Simplified Pagination matching screenshot */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                        <span className="text-[14px] font-bold text-slate-400 uppercase tracking-widest">Page:</span>
                        <div className="px-3 py-1 bg-slate-50 rounded border border-slate-100 text-[14px] font-black text-slate-800">
                            1/200
                        </div>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4">
                            <span className="text-[14px] font-bold text-slate-400 uppercase tracking-widest">Rows per page:</span>
                            <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded border border-slate-100 text-[14px] font-black text-slate-800 cursor-pointer">
                                10
                                <ChevronDown className="size-4" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 text-slate-300 hover:text-slate-600">
                                <ChevronLeft className="size-5" />
                            </button>
                            <button className="p-2 text-slate-600 hover:text-slate-900">
                                <ChevronRight className="size-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </MonitoringSection>

            {/* Agent & versions & OS distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <MonitoringSection title="Agent & versions">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-slate-400 text-[13px] font-bold uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                                <th className="py-4 px-2">Version</th>
                                <th className="py-4 px-2">Count</th>
                                <th className="py-4 px-2">Percentage</th>
                                <th className="py-4 px-2 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {['v2.0.0', 'v2.0.0', '-', '-', '-'].map((v, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-all group">
                                    <td className="py-4 px-2 text-[14px] font-bold text-slate-700">{v}</td>
                                    <td className="py-4 px-2 text-[14px] font-bold text-slate-500">{v === '-' ? '-' : '15'}</td>
                                    <td className="py-4 px-2 text-[14px] font-bold text-slate-500">{v === '-' ? '-' : '70%'}</td>
                                    <td className="py-4 px-2 text-center">
                                        {v !== '-' && <MonitoringBadge variant="generic" value="Label" />}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </MonitoringSection>
                <MonitoringSection title="OS By distribution">
                    <DonutChart data={donutData} />
                </MonitoringSection>
            </div>

            {/* Malicious process detection Table */}
            <MonitoringSection title="Malicious process detection">
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-slate-400 text-[13px] font-bold uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                                <th className="py-4 px-2">Time</th>
                                <th className="py-4 px-2">Device</th>
                                <th className="py-4 px-2">Process</th>
                                <th className="py-4 px-2">Threat type</th>
                                <th className="py-4 px-2">Confidence</th>
                                <th className="py-4 px-2 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-all group">
                                    <td className="py-5 px-2">
                                        <TimeCell value="12 Jan 2023, 12:40am" />
                                    </td>
                                    <td className="py-5 px-2 text-[14px] font-black text-slate-700 uppercase">LAPTOP-SALES-002</td>
                                    <td className="py-5 px-2 text-[14px] font-medium text-slate-400">powershell.exe</td>
                                    <td className="py-5 px-2 text-[14px] font-bold text-slate-500">Suspicious script run</td>
                                    <td className="py-5 px-2 text-[14px] font-bold text-slate-800 opacity-60">85%</td>
                                    <td className="py-5 px-2 text-center">
                                        <MonitoringBadge variant={i === 1 ? 'resolved' : 'alert'} value={i === 1 ? 'Resolved' : 'Pending'} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </MonitoringSection>

            {/* USB/device control violations Table */}
            <MonitoringSection title="USB/device control violations">
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-slate-400 text-[13px] font-bold uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                                <th className="py-4 px-2">Time</th>
                                <th className="py-4 px-2">User</th>
                                <th className="py-4 px-2">Device</th>
                                <th className="py-4 px-2">Device type</th>
                                <th className="py-4 px-2 text-center">Status</th>
                                <th className="py-4 px-2 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-all group">
                                    <td className="py-5 px-2">
                                        <TimeCell value="12 Jan 2023, 12:40am" />
                                    </td>
                                    <td className="py-5 px-2">
                                        <UserCell name="Kate Huntington" role="Manager" avatar="https://i.pravatar.cc/150?u=kate" grayscale />
                                    </td>
                                    <td className="py-5 px-2 text-[14px] font-black text-slate-700 uppercase">LAPTOP-SALES-002</td>
                                    <td className="py-5 px-2 text-[14px] font-medium text-slate-400">Laptop</td>
                                    <td className="py-5 px-2 text-center">
                                        <MonitoringBadge 
                                            variant={i === 2 ? 'allow' : i === 3 ? 'blocked' : 'alert'} 
                                            value={i === 2 ? 'Allow' : i === 3 ? 'Blocked' : 'Alert'} 
                                        />
                                    </td>
                                    <td className="py-5 px-2 text-center">
                                        <button className="text-slate-300 hover:text-slate-900 transition-colors">
                                            <MoreHorizontal className="size-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </MonitoringSection>

        </div>
    );
};

export default EndpointDevices;
