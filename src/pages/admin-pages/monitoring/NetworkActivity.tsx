import React, { useState, useEffect } from 'react';

import { MonitoringSection } from '@/components/common/MonitoringSection';
import { MonitoringSummaryCard } from '@/components/common/MonitoringSummaryCard';
import { TimeCell } from '@/components/common/TimeCell';
import { MonitoringBadge } from '@/components/common/MonitoringBadge';
import { TimeFilterDropdown } from '@/components/common/TimeFilterDropdown';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';
import { Loader2 } from 'lucide-react';
import worldMap from '@/assets/world_map_dots.png';
import api from '@/lib/api';

// Local Section wrapper for isolated time filtering
interface SectionProps {
  title: string;
  timeRange: string;
  onSelectTime: (val: string) => void;
  children: React.ReactNode;
}

const Section = ({ title, timeRange, onSelectTime, children }: SectionProps) => (
  <div className="flex flex-col gap-6 w-full">
    <div className="flex items-center justify-between">
      <h3 className="text-[18px] font-bold text-slate-800 dark:text-white tracking-tight">
        {title}
      </h3>
      <TimeFilterDropdown timeRange={timeRange} onSelectTime={onSelectTime} />
    </div>
    <div className="bg-white border border-slate-50 rounded-[24px] p-8 shadow-sm dark:bg-slate-900 dark:border-slate-800">
      {children}
    </div>
  </div>
);

const chartData = [
    { name: '00', val1: 20, val2: 40 },
    { name: '02', val1: 35, val2: 50 },
    { name: '04', val1: 25, val2: 45 },
    { name: '06', val1: 45, val2: 60 },
    { name: '08', val1: 40, val2: 55 },
    { name: '10', val1: 41, val2: 65 },
    { name: '12', val1: 55, val2: 75 },
    { name: '14', val1: 45, val2: 60 },
    { name: '16', val1: 50, val2: 70 },
    { name: '18', val1: 40, val2: 60 },
    { name: '20', val1: 45, val2: 65 },
    { name: '22', val1: 35, val2: 55 },
];

const NetworkActivity: React.FC = () => {
  // Section-isolated timeframe states
  const [overviewRange, setOverviewRange] = useState<string>("24h");
  const [ipsRange, setIpsRange] = useState<string>("24h");
  const [vpnRange, setVpnRange] = useState<string>("24h");
  const [bandwidthRange, setBandwidthRange] = useState<string>("24h");
  const [anomaliesRange, setAnomaliesRange] = useState<string>("24h");
  const [lateralRange, setLateralRange] = useState<string>("24h");
  const [firewallRange, setFirewallRange] = useState<string>("24h");

  // API Data State
  const [networkData, setNetworkData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNetworkActivity = async () => {
      setLoading(true);
      try {
        const response = await api.get("/dashboard/network", {
          params: { timeRange: overviewRange },
        });

        console.log("🌐 Network API Response:", response.data);
        setNetworkData(response.data);
      } catch (error) {
        console.error("Error fetching network activity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNetworkActivity();
  }, [overviewRange]);

  if (loading && !networkData) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="size-8 animate-spin text-slate-400" />
      </div>
    );
  }

  // Extract live metrics with clean fallbacks
  const topSourceIps = networkData?.top_source_ips ?? [];
  const topDestIps = networkData?.top_dest_ips ?? [];
  const anomaliesList = networkData?.anomalies ?? [];
  const firewallHitsList = networkData?.firewall_hits ?? [];
  const vpnActiveCount = networkData?.vpn_active_connections ?? 78;
  const lateralMovement = networkData?.lateral_movement;

  return (
    <div className="flex flex-col w-full gap-12 animate-in fade-in duration-500 pb-12">

        {/* 1. Overview Section */}
        <Section
          title="Overview"
          timeRange={overviewRange}
          onSelectTime={setOverviewRange}
        >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6"> 
                <MonitoringSummaryCard label="Total traffic" value="1.2 TB" />
                <MonitoringSummaryCard label="Unique IP's" value="1,245" />
                <MonitoringSummaryCard label="Active connections" value={String(vpnActiveCount)} />
                <MonitoringSummaryCard label="Anomalies" value={String(anomaliesList.length)} />
            </div>
        </Section>

        {/* 2. Top IP's & GEO-IP Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Section
              title="Top Source/Destination IP's"
              timeRange={ipsRange}
              onSelectTime={setIpsRange}
            >
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em] border-b border-slate-50 dark:border-slate-800">
                                <th className="py-6">S/No</th>
                                <th className="py-6">Source</th>
                                <th className="py-6">Destination</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {[0, 1].map((i) => {
                                const src = topSourceIps[i];
                                const dest = topDestIps[i];
                                if (!src && !dest) return null;
                                return (
                                    <tr key={i} className="group hover:bg-slate-50/50 transition-all">
                                        <td className="py-6 text-[14px] font-bold text-slate-300">{i + 1}</td>
                                        <td className="py-6">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[14px] font-bold text-slate-500 dark:text-slate-300">
                                                    {src ? src.ip : ""}
                                                </span>
                                                <span className="text-[13px] font-black text-slate-900 dark:text-white mt-0.5">
                                                    ({src ? `${(src.bytes / 1000000).toFixed(1)} MB` : ""})
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-6">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[14px] font-bold text-slate-500 dark:text-slate-300">
                                                    {dest ? dest.ip : ""}
                                                </span>
                                                <span className="text-[13px] font-black text-slate-900 dark:text-white mt-0.5">
                                                    ({dest ? `${(dest.bytes / 1000000).toFixed(1)} MB` : ""})
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Section>

            <MonitoringSection title="GEO-IP world map">
                <div className="h-full flex items-center justify-center min-h-[200px] relative bg-[#F9FAFB] dark:bg-slate-900/50 rounded-2xl overflow-hidden">
                    <img 
                        src={worldMap} 
                        alt="Geo IP Map" 
                        className="w-full h-auto object-contain opacity-90 dark:invert transition-opacity hover:opacity-100" 
                    />
                </div>
            </MonitoringSection>
        </div>

        {/* 3. VPN usage & Bandwidth usage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <UsageChart title="VPN usage" timeRange={vpnRange} onSelectTime={setVpnRange} />
            <UsageChart title="Bandwidth usage" timeRange={bandwidthRange} onSelectTime={setBandwidthRange} />
        </div>

        {/* 4. Traffic Anomalies Table */}
        <Section
          title="Traffic Anomalies"
          timeRange={anomaliesRange}
          onSelectTime={setAnomaliesRange}
        >
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-slate-400 text-[13px] font-bold uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                            <th className="py-4 px-2">Time</th>
                            <th className="py-4 px-2">Type</th>
                            <th className="py-4 px-2">Source IP</th>
                            <th className="py-4 px-2">Target</th>
                            <th className="py-4 px-2">Severity</th>
                            <th className="py-4 px-2 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                        {anomaliesList.map((anomaly: any, i: number) => (
                            <tr key={i} className="group hover:bg-slate-50/50 transition-all">
                                <td className="py-5 px-2">
                                    <TimeCell value="mock:12 Jan 2023, 12:40am" />
                                </td>
                                <td className="py-5 px-2 text-[14px] font-bold text-slate-500 uppercase">{anomaly.type}</td>
                                <td className="py-5 px-2 text-[14px] font-bold text-slate-600 dark:text-slate-300">{anomaly.source_ip}</td>
                                <td className="py-5 px-2 text-[14px] font-bold text-slate-500">mock unknown</td>
                                <td className="py-5 px-2 text-[12px] font-bold uppercase tracking-widest text-rose-500">mock Critical</td>
                                <td className="py-5 px-2 text-center">
                                    <MonitoringBadge variant="alert" value="mockOpen" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Section>

        {/* 5. Lateral Movement Detection Table */}
        <Section
          title="Lateral Movement Detection"
          timeRange={lateralRange}
          onSelectTime={setLateralRange}
        >
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-slate-400 text-[13px] font-bold uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                            <th className="py-4 px-2">Source Host</th>
                            <th className="py-4 px-2">Destination Host</th>
                            <th className="py-4 px-2">Transfer Count</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                        {lateralMovement ? (
                            <tr className="group hover:bg-slate-50/50 transition-all">
                                <td className="py-5 px-2 text-[14px] font-bold text-slate-700 dark:text-slate-200 uppercase">
                                    {lateralMovement.source}
                                </td>
                                <td className="py-5 px-2 text-[14px] font-bold text-slate-700 dark:text-slate-200 uppercase">
                                    {lateralMovement.destination}
                                </td>
                                <td className="py-5 px-2 text-[14px] font-bold text-slate-500">
                                    {lateralMovement.count}
                                </td>
                            </tr>
                        ) : (
                            <tr>
                                <td colSpan={3} className="py-6 text-center text-sm text-slate-400">
                                    No lateral movement records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Section>

        {/* 6. Firewall rule hits Table */}
        <Section
          title="Firewall rule hits"
          timeRange={firewallRange}
          onSelectTime={setFirewallRange}
        >
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-slate-400 text-[13px] font-bold uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                            <th className="py-4 px-2">Rule Name</th>
                            <th className="py-4 px-2">Action</th>
                            <th className="py-4 px-2">Source</th>
                            <th className="py-4 px-2">Destination</th>
                            <th className="py-4 px-2">Hit Count</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                        {firewallHitsList.map((fw: any, i: number) => (
                            <tr key={i} className="group hover:bg-slate-50/50 transition-all">
                                <td className="py-5 px-2 text-[14px] font-bold text-slate-700 dark:text-slate-200">{fw.rule}</td>
                                <td className="py-5 px-2 text-[14px] font-bold text-slate-500">Block</td>
                                <td className="py-5 px-2 text-[14px] font-bold text-slate-500">0.0.0.0/0</td>
                                <td className="py-5 px-2 text-[14px] font-bold text-slate-500">Internal</td>
                                <td className="py-5 px-2 text-[14px] font-black text-slate-900 dark:text-white">{fw.hits}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Section>

    </div>
  );
};

interface UsageChartProps {
  title: string;
  timeRange: string;
  onSelectTime: (val: string) => void;
}

const UsageChart = ({ title, timeRange, onSelectTime }: UsageChartProps) => (
    <Section title={title} timeRange={timeRange} onSelectTime={onSelectTime}>
        <div className="h-[280px] w-full relative">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[20%] flex flex-col items-center">
                <span className="text-[32px] font-black text-slate-900 dark:text-white">41 Mbps</span>
            </div>
            <div className="absolute top-0 right-0 flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-slate-900 dark:bg-white" />
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
                    <Tooltip content={() => null} />
                    <Area type="monotone" dataKey="val2" stroke="#BFDBFE" strokeWidth={1} strokeDasharray="3 3" fill="none" />
                    <Area type="monotone" dataKey="val1" stroke="#1E293B" strokeWidth={2} fill="url(#colorVal)" />
                    <ReferenceDot x="10" y={41} r={4} fill="#1E293B" stroke="white" strokeWidth={2} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </Section>
);

export default NetworkActivity;