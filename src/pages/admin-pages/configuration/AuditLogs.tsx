import React, { useState } from 'react';
import { MonitoringSection } from '@/components/common/MonitoringSection';
import { TimeCell } from '@/components/common/TimeCell';
import { UserCell } from '@/components/common/UserCell';
import { MonitoringBadge } from '@/components/common/MonitoringBadge';
import { Search, Filter, Download } from 'lucide-react';

const AuditLogs: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const logs = [
        { time: '12 Jan 2023, 09:30am', user: 'Admin User', role: 'Superadmin', action: 'Modified Policy', resource: 'DLP-Global-01', status: 'Success', severity: 'Info' },
        { time: '12 Jan 2023, 10:15am', user: 'Kate Huntington', role: 'Manager', action: 'Failed Login', resource: 'AUTH-SERVER', status: 'Failed', severity: 'Warning' },
        { time: '12 Jan 2023, 11:00am', user: 'System', role: 'Daemon', action: 'Backup Completed', resource: 'AWS-S3-PROD', status: 'Success', severity: 'Info' },
        { time: '12 Jan 2023, 11:45am', user: 'Admin User', role: 'Superadmin', action: 'Deleted User', resource: 'USR-9842', status: 'Success', severity: 'Warning' },
        { time: '12 Jan 2023, 12:30pm', user: 'John Doe', role: 'Analyst', action: 'Exported Report', resource: 'Threat-Intel-Q1', status: 'Success', severity: 'Info' },
        { time: '12 Jan 2023, 01:20pm', user: 'System', role: 'IDS', action: 'Threshold Reached', resource: 'FIREWALL-HQ', status: 'Alert', severity: 'Critical' },
    ];

    return (
        <div className="flex flex-col w-full gap-8 animate-in fade-in duration-500 pb-12">
            
            {/* Search & Filter Header */}
            <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-50 dark:bg-slate-900 dark:border-slate-800 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-300" />
                    <input 
                        type="text" 
                        placeholder="Search audit logs by user, action or resource..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 h-11 bg-slate-50 border-none rounded-xl text-[14px] outline-none placeholder:text-slate-400 dark:bg-slate-800"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 h-11 bg-white border border-slate-100 rounded-xl text-[13px] font-bold text-slate-500 hover:bg-slate-50 transition-all dark:bg-slate-800 dark:border-slate-700">
                        <Filter className="size-4" />
                        Filters
                    </button>
                    <button className="flex items-center gap-2 px-4 h-11 bg-slate-900 rounded-xl text-[13px] font-bold text-white hover:bg-slate-800 transition-all shadow-sm">
                        <Download className="size-4" />
                        Export CSV
                    </button>
                </div>
            </div>

            <MonitoringSection title="System Audit Events" showToday={true}>
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-slate-400 text-[13px] font-bold uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                                <th className="py-4 px-2">Timestamp</th>
                                <th className="py-4 px-2">Actor</th>
                                <th className="py-4 px-2">Action / Resource</th>
                                <th className="py-4 px-2">Severity</th>
                                <th className="py-4 px-2 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {logs.map((log, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-all group">
                                    <td className="py-5 px-2">
                                        <TimeCell value={log.time} />
                                    </td>
                                    <td className="py-5 px-2">
                                        <UserCell name={log.user} role={log.role} avatar={`https://i.pravatar.cc/150?u=${log.user}`} grayscale />
                                    </td>
                                    <td className="py-5 px-2">
                                        <div className="flex flex-col">
                                            <span className="text-[14px] font-bold text-slate-800 dark:text-slate-200">{log.action}</span>
                                            <span className="text-[12px] text-slate-400 font-medium italic">{log.resource}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-2">
                                        <span className={cn(
                                            "text-[12px] font-bold uppercase tracking-wider",
                                            log.severity === 'Critical' ? "text-rose-500" : 
                                            log.severity === 'Warning' ? "text-amber-500" : "text-slate-400"
                                        )}>
                                            {log.severity}
                                        </span>
                                    </td>
                                    <td className="py-5 px-2 text-center">
                                        <MonitoringBadge 
                                            variant={log.status === 'Success' ? 'allow' : log.status === 'Alert' ? 'blocked' : 'alert'} 
                                            value={log.status} 
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Simple pagination footer */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-50 dark:border-slate-800">
                    <span className="text-[13px] font-bold text-slate-400">Showing 1 to 10 of 1,245 results</span>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 text-[13px] font-bold text-slate-400 hover:text-slate-900 border border-slate-100 rounded-lg">Previous</button>
                        <button className="px-4 py-2 text-[13px] font-bold text-white bg-slate-900 rounded-lg">Next</button>
                    </div>
                </div>
            </MonitoringSection>
        </div>
    );
};

export default AuditLogs;
