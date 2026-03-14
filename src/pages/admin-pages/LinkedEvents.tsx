import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';

const LinkedEvents: React.FC = () => {
    const navigate = useNavigate();

    const events = [
        { time: '12 Jan 2023, 12:40am', source: 'Noji Agent', type: 'Login', correlation: '90%' },
        { time: '12 Jan 2023, 12:40am', source: 'Network', type: 'VPN disconnect', correlation: '90%' },
        { time: '12 Jan 2023, 12:40am', source: 'Noji Agent', type: 'Behavioral Anomaly', correlation: '90%' },
        { time: '12 Jan 2023, 12:40am', source: 'Noji Agent', type: 'Behavioral Anomaly', correlation: '90%' },
        { time: '12 Jan 2023, 12:40am', source: 'Noji Agent', type: 'Behavioral Anomaly', correlation: '90%' },
    ];

    return (
        <div className="flex flex-col w-full gap-8 animate-in slide-in-from-bottom-10 duration-500">
            {/* Header */}
            <div className="flex items-center gap-6">
                <button 
                    onClick={() => navigate(-1)}
                    className="size-11 rounded-full bg-slate-900 flex items-center justify-center text-white hover:bg-slate-800 transition-all shadow-md group"
                >
                    <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
                </button>
                <h1 className="text-[22px] font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-3">
                    Linked Events - Behavioral Anomaly <span className="text-slate-200">|</span> <span className="font-medium text-slate-400">Kate Huntington</span>
                </h1>
            </div>

            {/* Table Section */}
            <div className="space-y-6">
                <h3 className="text-[14px] font-bold text-slate-800 dark:text-white tracking-tight">Linked Events</h3>
                <div className="bg-white border border-slate-50 rounded-[20px] overflow-hidden shadow-sm dark:bg-slate-900 dark:border-slate-800">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#F9FAFB] dark:bg-slate-800/50">
                            <tr>
                                <th className="px-8 py-5 text-[13px] font-bold text-slate-400 uppercase tracking-widest">Time</th>
                                <th className="px-8 py-5 text-[13px] font-bold text-slate-400 uppercase tracking-widest">Source</th>
                                <th className="px-8 py-5 text-[13px] font-bold text-slate-400 uppercase tracking-widest">Event Type</th>
                                <th className="px-8 py-5 text-[13px] font-bold text-slate-400 uppercase tracking-widest">Correlation</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {events.map((event, i) => (
                                <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all">
                                    <td className="px-8 py-5 text-[14px] font-black text-slate-700 dark:text-slate-300">{event.time}</td>
                                    <td className="px-8 py-5 text-[14px] font-medium text-slate-400">{event.source}</td>
                                    <td className="px-8 py-5 text-[14px] font-bold text-slate-500">{event.type}</td>
                                    <td className="px-8 py-5">
                                        <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 font-bold text-[12px] rounded-full dark:bg-emerald-950/20">
                                            {event.correlation}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LinkedEvents;
