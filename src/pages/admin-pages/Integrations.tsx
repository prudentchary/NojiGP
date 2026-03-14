import React, { useState } from 'react';
import { Plus, Slack, Github, Cloud, Mail, Zap, MessageSquare, Search, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/cn';

const Integrations: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const integrations = [
        { icon: Slack, name: "Slack", category: "Communication", description: "Receive real-time alerts and incident reports directly in your Slack channels.", connected: true },
        { icon: Github, name: "GitHub", category: "Development", description: "Automate PR scanning and source code vulnerability tracking for your repositories.", connected: true },
        { icon: Cloud, name: "AWS S3", category: "Cloud Storage", description: "Backup security logs and historical incident data to encrypted S3 buckets.", connected: true },
        { icon: Mail, name: "SendGrid", category: "Email", description: "Configure automated email reports and security notifications.", connected: false },
        { icon: Zap, name: "Webhook", category: "Utility", description: "Custom outgoing webhooks to trigger external CI/CD or security pipelines.", connected: false },
        { icon: MessageSquare, name: "Intercom", category: "CRM", description: "Sync security status and risk profiles with your customer support platform.", connected: false },
    ];

    return (
        <div className="flex flex-col w-full gap-8 animate-in fade-in duration-500 pb-12">
            
            {/* Page Header */}
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-[22px] font-bold text-slate-800 dark:text-white tracking-tight">Integrations</h1>
                        <p className="text-[14px] text-slate-400 font-medium">Connect and manage your security ecosystem toolchain.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-[#14B8A6] text-white px-5 py-2.5 rounded-xl text-[14px] font-bold hover:bg-[#0D9488] transition-all shadow-sm">
                        <Plus className="size-4" />
                        Add New
                    </button>
                </div>

                {/* Sub-header / Filter */}
                <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-300" />
                        <input 
                            type="text" 
                            placeholder="Filter integrations..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 h-12 bg-white border border-slate-50 rounded-xl text-[14px] outline-none placeholder:text-slate-400 dark:bg-slate-900 dark:border-slate-800 shadow-sm"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        {['All', 'Active', 'Storage', 'Alerts'].map((tab) => (
                            <button key={tab} className={cn(
                                "px-4 py-2 rounded-lg text-[13px] font-bold transition-all",
                                tab === 'All' ? "bg-slate-900 text-white" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                            )}>
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Integrations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {integrations.map((item, i) => (
                    <IntegrationCard key={i} {...item} />
                ))}
            </div>
        </div>
    );
};

const IntegrationCard = ({ icon: Icon, name, category, description, connected }: any) => (
    <div className="bg-white border border-slate-50 rounded-[28px] p-8 shadow-sm dark:bg-slate-900 dark:border-slate-800 group transition-all hover:-translate-y-1 hover:shadow-xl relative overflow-hidden">
        {/* Subtle Background Accent */}
        <div className={cn(
            "absolute top-0 right-0 size-24 blur-3xl opacity-5 transition-opacity group-hover:opacity-10 pointer-events-none",
            connected ? "bg-emerald-500" : "bg-slate-500"
        )} />

        <div className="flex items-start justify-between mb-8">
            <div className={cn(
                "p-4 rounded-2xl transition-all",
                connected ? "bg-slate-900 text-white shadow-lg" : "bg-slate-50 text-slate-300 dark:bg-slate-800"
            )}>
                <Icon className="size-6" />
            </div>
            {connected ? (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full">
                    <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-black uppercase tracking-wider">Active</span>
                </div>
            ) : (
                <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[11px] font-black uppercase tracking-wider dark:bg-slate-800">Inactive</span>
            )}
        </div>

        <div className="space-y-3 mb-10">
            <div className="flex items-center gap-2">
                <h3 className="text-[18px] font-black text-slate-800 dark:text-white">{name}</h3>
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest leading-none mt-0.5 opacity-60">• {category}</span>
            </div>
            <p className="text-[14px] leading-relaxed text-slate-400 font-medium">{description}</p>
        </div>

        <div className="flex items-center gap-3">
            <button className={cn(
                "flex-1 h-12 rounded-xl text-[14px] font-black transition-all",
                connected 
                    ? "bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300" 
                    : "bg-slate-900 text-white hover:bg-slate-800"
            )}>
                {connected ? 'Manage Settings' : 'Setup Integration'}
            </button>
            <button className="size-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all dark:bg-slate-800">
                <ArrowUpRight className="size-5" />
            </button>
        </div>
    </div>
);

export default Integrations;
