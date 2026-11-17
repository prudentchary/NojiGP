import React, { useState } from 'react';
import { Search as SearchIcon, LayoutGrid, Star, Trash2, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { cn } from '@/lib/cn';
import { UserCell } from '@/components/common/UserCell';
import { MonitoringBadge } from '@/components/common/MonitoringBadge';
import { TimeCell } from '@/components/common/TimeCell';
import { sharedIncidents } from '@/data/threatMockData';

const Threats: React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    // Safely filter threats regardless of whether user is a string or object
    const filteredThreats = sharedIncidents.filter((threat) => {
        const item = threat as any;
        const userName = typeof item.user === 'object' ? item.user?.name || '' : String(item.user || '');
        const userEmail = typeof item.user === 'object' ? item.user?.email || '' : '';
        const description = String(item.description || '');

        return (
            userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="flex flex-col w-full gap-8 animate-in fade-in duration-500 pb-10">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between">
                <div className="relative w-full max-w-md">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-300" />
                    <input 
                        type="text"
                        placeholder="Search" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 h-12 bg-[#F9FAFB] border-none rounded-xl text-[15px] focus:ring-1 focus:ring-slate-200 outline-none placeholder:text-slate-400 dark:bg-slate-900/50"
                    />
                </div>
                
                <button 
                    onClick={() => navigate('/alerts')}
                    className="flex items-center gap-2 px-4 py-2 text-[#14B8A6] font-bold text-[14px] hover:bg-slate-50 rounded-lg transition-all dark:hover:bg-slate-800 cursor-pointer"
                >
                    <LayoutGrid className="size-5" />
                    Bubble view
                </button>
            </div>

            {/* Table Container */}
            <div className="w-full bg-white rounded-2xl dark:bg-slate-900 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-50 dark:border-slate-800">
                            <th className="px-6 py-5 text-[14px] font-bold text-slate-800 dark:text-slate-200">Time</th>
                            <th className="px-6 py-5 text-[14px] font-bold text-slate-800 dark:text-slate-200">Severity</th>
                            <th className="px-6 py-5 text-[14px] font-bold text-slate-800 dark:text-slate-200">User</th>
                            <th className="px-6 py-5 text-[14px] font-bold text-slate-800 dark:text-slate-200">Description</th>
                            <th className="px-6 py-5 text-[14px] font-bold text-slate-800 dark:text-slate-200 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                        {filteredThreats.map((threat) => {
                            const item = threat as any;
                            const name = typeof item.user === 'object' ? item.user?.name : String(item.user || 'Kate Huntington');
                            const email = typeof item.user === 'object' ? item.user?.email : `${name.toLowerCase().replace(/\s+/g, '.')}@gmail.com`;
                            const avatar = typeof item.user === 'object' ? item.user?.avatar : `https://i.pravatar.cc/150?u=${item.id}`;

                            return (
                                <tr 
                                    key={item.id} 
                                    onClick={() => navigate(`/threats/${item.id}`)}
                                    className="hover:bg-slate-50/50 transition-all cursor-pointer group"
                                >
                                    <td className="px-6 py-5">
                                        <TimeCell value={item.time || item.timeSlot} />
                                    </td>
                                    <td className="px-6 py-5">
                                        <MonitoringBadge 
                                            variant="generic" 
                                            value={item.severity} 
                                            className="bg-slate-50 text-slate-400 border-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300" 
                                        />
                                    </td>
                                    <td className="px-6 py-5">
                                        <UserCell 
                                            name={name} 
                                            role={email} 
                                            avatar={avatar} 
                                            grayscale 
                                        />
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-[14px] font-bold text-slate-500 dark:text-slate-400">
                                            {item.description || item.title}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center justify-end gap-3" onClick={(e) => e.stopPropagation()}>
                                            <button className="p-1 text-[#14B8A6] hover:scale-110 transition-transform cursor-pointer">
                                                <Star className="size-5 fill-[#14B8A6] opacity-20" />
                                            </button>
                                            <button className="p-1 text-rose-400 hover:scale-110 transition-transform cursor-pointer">
                                                <Trash2 className="size-5 opacity-40" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination UI */}
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-4">
                    <span className="text-[14px] font-bold text-slate-400 uppercase tracking-widest">Page:</span>
                    <div className="px-4 py-2 bg-[#F9FAFB] rounded-lg border border-slate-50 text-[14px] font-black text-slate-400 dark:bg-slate-900/50 dark:border-slate-800">
                        1/200
                    </div>
                </div>

                <div className="flex items-center gap-12">
                    <div className="flex items-center gap-4">
                        <span className="text-[14px] font-bold text-slate-400 uppercase tracking-widest">Rows per page:</span>
                        <div className="flex items-center gap-2 px-3 py-2 bg-[#F9FAFB] rounded-lg border border-slate-50 text-[14px] font-black text-slate-400 cursor-pointer dark:bg-slate-900/50 dark:border-slate-800">
                            10
                            <ChevronDown className="size-4" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors cursor-pointer">
                            <ChevronLeft className="size-6" />
                        </button>
                        <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">
                            <ChevronRight className="size-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Threats;