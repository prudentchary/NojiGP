import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ChevronDown, Lock, ShieldAlert, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Badge } from '@/components/ui/Badge';

const Investigation: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Incident');

    const tabs = ['Incident', 'User details', 'Investigation Log'];

    return (
        <div className="flex flex-col w-full gap-8 animate-in slide-in-from-right-10 duration-500">
            {/* Page Title & Lock Action */}
            <div className="flex items-center justify-between">
                <h1 className="text-[22px] font-bold text-slate-800 dark:text-white tracking-tight">
                    Behavioral Anomaly - Kate Huntington
                </h1>
                <button className="flex items-center gap-2 bg-[#0F172A] text-white px-5 py-2.5 rounded-lg text-[14px] font-bold hover:bg-slate-800 transition-all shadow-sm">
                    <Lock className="size-4" />
                    Lock session
                    <ChevronDown className="size-4 opacity-50 ml-1" />
                </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-12 border-b border-slate-100 dark:border-slate-800">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "pb-4 text-[15px] font-bold transition-all relative",
                            activeTab === tab 
                                ? "text-[#14B8A6]" 
                                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                        )}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#14B8A6] rounded-t-full" />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="flex flex-col gap-10">
                {activeTab === 'Incident' && (
                    <div className="flex flex-col gap-10">
                        {/* Incident Details Section */}
                        <div className="bg-[#F9FAFB]/60 border border-slate-100 rounded-[20px] p-8 dark:bg-slate-900/40 dark:border-slate-800 shadow-sm">
                            <h3 className="text-[14px] font-bold text-slate-400 uppercase tracking-widest mb-10">Incident Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
                                <LabelValue label="Incident ID:" value="INC-2024-0123" />
                                <LabelValue label="Severity:" value="Critical" />
                                <LabelValue label="Time:" value="11:30 AM (2 hours ago)" />
                                <LabelValue label="Status:" value="Under Investigation" />
                                <LabelValue label="Assigned:" value="-" />
                                <LabelValue label="Correlation score:" value="90%" onClick={() => navigate(`/threats/linked-events`)} />
                                <LabelValue label="Department:" value="Finance" />
                            </div>
                        </div>

                        {/* MITRE ATT&CK Mapping */}
                        <div className="space-y-6">
                             <h3 className="text-[17px] font-bold text-slate-800 dark:text-white tracking-tight">MITRE ATT&CK Mapping</h3>
                             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <TacticCard 
                                    type="PRIMARY TACTIC" 
                                    id="TA0004" 
                                    label="Privilege Escalation"
                                    technique="T1078 - Valid Accounts"
                                    subTechnique="T1078.002 - Domain Accounts"
                                    confidence="Medium"
                                    confidenceColor="text-amber-500"
                                />
                                <TacticCard 
                                    type="SECONDARY TACTIC" 
                                    id="TA0001" 
                                    label="Initial Access"
                                    technique="T1078 - Valid Accounts"
                                    confidence="Low"
                                    confidenceColor="text-rose-400"
                                />
                             </div>
                        </div>

                        {/* Timeline of events */}
                        <div className="space-y-6">
                            <h3 className="text-[17px] font-bold text-slate-800 dark:text-white tracking-tight">Timeline of events</h3>
                            <div className="bg-white border border-slate-50 rounded-[20px] overflow-hidden shadow-sm dark:bg-slate-900 dark:border-slate-800">
                                <table className="w-full text-left">
                                    <thead className="bg-[#F9FAFB] dark:bg-slate-800/50">
                                        <tr className="border-b border-slate-50 dark:border-slate-800">
                                            <th className="px-8 py-5 text-[13px] font-bold text-slate-400 uppercase tracking-widest">Time</th>
                                            <th className="px-8 py-5 text-[13px] font-bold text-slate-400 uppercase tracking-widest">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all">
                                                <td className="px-8 py-4.5 text-[14px] font-black text-slate-700 dark:text-slate-300">12 Jan 2023, 12:40am</td>
                                                <td className="px-8 py-4.5 text-[14px] font-bold text-slate-500 dark:text-slate-400">Login - Corporate Wi-Fi</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'User details' && (
                    <div className="flex flex-col gap-8">
                         {/* Affected User */}
                         <div className="bg-white border border-slate-50 rounded-[24px] p-8 shadow-sm dark:bg-slate-900 dark:border-slate-800">
                            <h3 className="text-[14px] font-bold text-slate-400 uppercase tracking-widest mb-10">Affected user</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
                                <LabelValue label="First name:" value="Kate" />
                                <LabelValue label="Last name:" value="Huntington" />
                                <LabelValue label="Other name:" value="-" />
                                <LabelValue label="User ID:" value="-" />
                                <LabelValue label="Role:" value="Manager" />
                                <LabelValue label="Department:" value="Finance" />
                                <LabelValue label="SCRS:" value="Low 30" />
                            </div>
                         </div>

                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white border border-slate-50 rounded-[24px] p-8 shadow-sm dark:bg-slate-900 dark:border-slate-800">
                                <h3 className="text-[14px] font-bold text-slate-400 uppercase tracking-widest mb-10">Device Info</h3>
                                <div className="space-y-4">
                                    <LabelValue label="Device Name:" value="Kate's PC" horizontal />
                                    <LabelValue label="Device ID:" value="LAPTOP-IT-001" horizontal />
                                    <LabelValue label="Agent status:" value="On" horizontal />
                                    <LabelValue label="Last check-in:" value="10 mins ago" horizontal />
                                    <LabelValue label="OS:" value="Windows 11 Pro" horizontal />
                                    <LabelValue label="Model version:" value="BMSCRS (v2.1.4)" horizontal />
                                    <LabelValue label="Current session:" value="2 hours 15 minutes" horizontal />
                                </div>
                            </div>
                            <div className="bg-white border border-slate-50 rounded-[24px] p-8 shadow-sm dark:bg-slate-900 dark:border-slate-800">
                                <h3 className="text-[14px] font-bold text-slate-400 uppercase tracking-widest mb-10">Network & Location</h3>
                                <div className="space-y-4">
                                    <LabelValue label="Current IP:" value="192.168.1.100 (Lagos, NG)" horizontal />
                                    <LabelValue label="Connection:" value="Corporate Wi-Fi" horizontal />
                                    <LabelValue label="VPN Status:" value="Not active" horizontal valueColor="text-rose-400" />
                                    <div className="pt-4 mt-4 border-t border-slate-50 dark:border-slate-800">
                                        <h4 className="text-[13px] font-bold text-slate-800 mb-4">Last Locations:</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-[13px] font-bold text-slate-400">
                                                <div className="size-1 bg-[#14B8A6] rounded-full" />
                                                Today 09:15 - Lagos, NG
                                            </div>
                                            <div className="flex items-center gap-2 text-[13px] font-bold text-slate-400">
                                                <div className="size-1 bg-[#14B8A6] rounded-full" />
                                                Yesterday 22:15 - Unknown
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                         </div>
                    </div>
                )}
                {activeTab === 'Investigation Log' && (
                    <div className="bg-white border border-slate-50 rounded-[24px] p-8 shadow-sm dark:bg-slate-900 dark:border-slate-800">
                        <h3 className="text-[14px] font-bold text-slate-400 uppercase tracking-widest mb-10">Investigation Activity</h3>
                        <div className="relative pl-8 border-l-2 border-slate-50 dark:border-slate-800 space-y-12">
                            {[
                                { time: '12 Jan 2023, 11:30am', action: 'Incident Detected', desc: 'Automated IDS system flagged unusual login patterns.' },
                                { time: '12 Jan 2023, 11:45am', action: 'Status Updated', desc: 'Incident status changed from New to Under Investigation.' },
                                { time: '12 Jan 2023, 12:15pm', action: 'User Profile Reviewed', desc: 'Administrator viewed Kate Huntington\'s SCRS history.' },
                                { time: '12 Jan 2023, 01:05pm', action: 'Session Locked', desc: 'Remote workstation session was forcibly terminated for safety.' },
                            ].map((log, i) => (
                                <div key={i} className="relative">
                                    <div className="absolute -left-[41px] top-1 size-4 rounded-full bg-white border-4 border-slate-900 dark:bg-slate-900 dark:border-slate-50" />
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[14px] font-black text-slate-800 dark:text-white">{log.action}</span>
                                            <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">{log.time}</span>
                                        </div>
                                        <p className="text-[14px] text-slate-500 font-medium max-w-2xl">{log.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const LabelValue = ({ label, value, onClick, horizontal, valueColor }: any) => (
    <div className={cn(
        "flex flex-col gap-1 min-w-0",
        horizontal ? "flex-row justify-between items-center" : ""
    )}>
        <span className="text-[13px] font-medium text-slate-400">{label}</span>
        <span 
            onClick={onClick}
            className={cn(
                "text-[14px] font-bold text-slate-800 dark:text-slate-200 truncate",
                onClick ? "text-[#14B8A6] cursor-pointer hover:underline" : "",
                valueColor || ""
            )}
        >
            {value}
        </span>
    </div>
);

const TacticCard = ({ type, id, label, technique, subTechnique, confidence, confidenceColor }: any) => (
    <div className="bg-white border border-slate-50 rounded-[24px] p-8 shadow-sm dark:bg-slate-900 dark:border-slate-800 relative group transition-all hover:-translate-y-1 hover:shadow-md">
        <h3 className="text-[14px] font-bold text-slate-400 uppercase tracking-widest mb-6">
            {type}: {id} - {label}
        </h3>
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-slate-400">Technique:</span>
                <span className="text-[13px] font-bold text-slate-700 dark:text-white">{technique}</span>
            </div>
            {subTechnique && (
                <div className="flex items-center justify-between">
                    <span className="text-[13px] font-medium text-slate-400">Sub-technique:</span>
                    <span className="text-[13px] font-bold text-slate-700 dark:text-white">{subTechnique}</span>
                </div>
            )}
            <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-slate-400">Confidence:</span>
                <span className={cn("text-[13px] font-bold", confidenceColor)}>{confidence}</span>
            </div>
        </div>
    </div>
);

export default Investigation;
