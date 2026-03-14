import React from 'react';
import { MonitoringSection } from '@/components/common/MonitoringSection';
import { MonitoringSummaryCard } from '@/components/common/MonitoringSummaryCard';
import { HorizontalBarChart } from '@/components/common/HorizontalBarChart';
import { DonutChart } from '@/components/common/DonutChart';
import { UserCell } from '@/components/common/UserCell';
import { MonitoringBadge } from '@/components/common/MonitoringBadge';
import { TimeCell } from '@/components/common/TimeCell';

const barData = [
    { label: 'Title', value: 54, colorStart: '#a855f7', colorEnd: '#3b82f6' },
    { label: 'Title', value: 185, colorStart: '#a855f7', colorEnd: '#3b82f6' },
    { label: 'Title', value: 134, colorStart: '#a855f7', colorEnd: '#3b82f6' },
    { label: 'Title', value: 123, colorStart: '#a855f7', colorEnd: '#3b82f6' },
    { label: 'Title', value: 148, colorStart: '#a855f7', colorEnd: '#3b82f6' },
    { label: 'Title', value: 145, colorStart: '#a855f7', colorEnd: '#3b82f6' },
    { label: 'Title', value: 165, colorStart: '#a855f7', colorEnd: '#3b82f6' },
    { label: 'Title', value: 234, colorStart: '#a855f7', colorEnd: '#3b82f6' },
    { label: 'Title', value: 234, colorStart: '#a855f7', colorEnd: '#3b82f6' },
    { label: 'Title', value: 162, colorStart: '#a855f7', colorEnd: '#3b82f6' },
];

const donutData = [
    { name: 'Windows', value: 52.1, color: '#111827' },
    { name: 'Mac', value: 22.8, color: '#93C5FD' },
    { name: 'Linux', value: 13.9, color: '#A7F3D0' },
];

const CompliancePolicy: React.FC = () => {
    return (
        <div className="flex flex-col w-full gap-12 animate-in fade-in duration-500 pb-12">
            
            {/* Overview Section */}
            <MonitoringSection title="Overview" showToday={true}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <MonitoringSummaryCard label="Total traffic" value="1.2 TB" />
                    <MonitoringSummaryCard label="Unique IP's" value="1.245" />
                    <MonitoringSummaryCard label="Active connections" value="342" />
                    <MonitoringSummaryCard label="Anomalies" value="7" trendValue="11.01%" />
                </div>
            </MonitoringSection>

            {/* Policy violations and categories & Top violations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <MonitoringSection title="Policy violations and categories">
                    <HorizontalBarChart data={barData} max={250} />
                </MonitoringSection>
                <MonitoringSection title="Top violations">
                    <DonutChart data={donutData} />
                </MonitoringSection>
            </div>

            {/* Zero trust compliance score Table */}
            <MonitoringSection title="Zero trust compliance score">
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-slate-400 text-[13px] font-bold uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                                <th className="py-4 px-2">Time</th>
                                <th className="py-4 px-2">Staff</th>
                                <th className="py-4 px-2">From</th>
                                <th className="py-4 px-2">To</th>
                                <th className="py-4 px-2">Time Diff</th>
                                <th className="py-4 px-2 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-all group">
                                    <td className="py-5 px-2">
                                        <TimeCell value="12 Jan 2023, 12:40am" />
                                    </td>
                                    <td className="py-5 px-2">
                                        <UserCell name="Kate Huntington" role="Financial officer" avatar="https://i.pravatar.cc/150?u=kate" grayscale />
                                    </td>
                                    <td className="py-5 px-2 text-[14px] font-bold text-slate-500">Lagos, NG</td>
                                    <td className="py-5 px-2 text-[14px] font-bold text-slate-500">Paris, FR</td>
                                    <td className="py-5 px-2 text-[14px] font-bold text-slate-500">1hr</td>
                                    <td className="py-5 px-2 text-center">
                                        <MonitoringBadge variant="open" value="Open" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </MonitoringSection>

            {/* Control status Table */}
            <MonitoringSection title="Control status">
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-slate-400 text-[13px] font-bold uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                                <th className="py-4 px-2">Time</th>
                                <th className="py-4 px-2">Staff</th>
                                <th className="py-4 px-2">From role</th>
                                <th className="py-4 px-2">To role</th>
                                <th className="py-4 px-2 text-center">Status</th>
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
                                    <td className="py-5 px-2 text-[14px] font-bold text-slate-500">Finance officer</td>
                                    <td className="py-5 px-2 text-[14px] font-bold text-slate-500">Manager</td>
                                    <td className="py-5 px-2 text-center">
                                        <MonitoringBadge variant="open" value="Open" />
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

export default CompliancePolicy;
