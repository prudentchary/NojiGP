import React from 'react';
import { Settings, Shield, Bell, Lock, Globe, Database, ChevronRight, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const Configuration: React.FC = () => {
    return (
        <div className="flex flex-col w-full gap-8 animate-in fade-in duration-700">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-[22px] font-bold text-slate-800 dark:text-white tracking-tight">System Configuration</h2>
                <Button className="bg-[#0F172A] hover:bg-slate-800 text-white gap-2 h-11 px-6 rounded-xl font-bold transition-all">
                    <Save className="size-4" />
                    Save Changes
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Categories */}
                <div className="lg:col-span-1 space-y-3">
                    <ConfigCategory icon={Shield} label="Security & Privacy" active />
                    <ConfigCategory icon={Bell} label="Notifications" />
                    <ConfigCategory icon={Lock} label="Access Control" />
                    <ConfigCategory icon={Globe} label="Network Settings" />
                    <ConfigCategory icon={Database} label="Data Management" />
                </div>

                {/* Right: Settings List */}
                <div className="lg:col-span-2 bg-white border border-slate-50 rounded-[24px] p-8 shadow-sm dark:bg-slate-900 dark:border-slate-800">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-[17px] font-bold text-slate-800 dark:text-white mb-6">General Security</h3>
                            <div className="space-y-6">
                                <SettingItem 
                                    title="Two-Factor Authentication" 
                                    description="Require a second verification step for all administrative logins."
                                    enabled
                                />
                                <SettingItem 
                                    title="Automatic Session Timeout" 
                                    description="Automatically log out users after 30 minutes of inactivity."
                                    enabled
                                />
                                <SettingItem 
                                    title="Encryption at Rest" 
                                    description="Encrypt all sensitive data stored in the primary database clusters."
                                    enabled
                                />
                            </div>
                        </div>

                        <div className="pt-8 border-t border-slate-50 dark:border-slate-800">
                            <h3 className="text-[17px] font-bold text-slate-800 dark:text-white mb-6">Threat Detection</h3>
                            <div className="space-y-6">
                                <SettingItem 
                                    title="Real-time Anomaly Scanning" 
                                    description="Use machine learning models to detect behavior patterns in real-time."
                                    enabled
                                />
                                <SettingItem 
                                    title="Automated Threat Containment" 
                                    description="Automatically isolate suspicious entities when critical threats are detected."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ConfigCategory = ({ icon: Icon, label, active }: any) => (
    <div className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${active ? 'bg-[#F1F5F9] text-slate-900' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}>
        <div className="flex items-center gap-4">
            <Icon className={`size-5 ${active ? 'text-slate-900' : 'text-slate-400'}`} />
            <span className="text-[14.5px] font-bold">{label}</span>
        </div>
        {active && <ChevronRight className="size-4" />}
    </div>
);

const SettingItem = ({ title, description, enabled }: any) => (
    <div className="flex items-start justify-between group">
        <div className="space-y-1">
            <h4 className="text-[15px] font-bold text-slate-800 dark:text-slate-200">{title}</h4>
            <p className="text-[13px] text-slate-400 max-w-[480px]">{description}</p>
        </div>
        <div className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${enabled ? 'bg-[#14B8A6]' : 'bg-slate-200'}`}>
            <div className={`size-4 bg-white rounded-full absolute top-1 transition-all ${enabled ? 'left-7' : 'left-1'}`} />
        </div>
    </div>
);

export default Configuration;
