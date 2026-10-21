import React, { useState, useEffect } from 'react';
import { MonitoringSection } from '@/components/common/MonitoringSection';
import { MonitoringSummaryCard } from '@/components/common/MonitoringSummaryCard';
import { DonutChart } from '@/components/common/DonutChart';
import { MonitoringBadge } from '@/components/common/MonitoringBadge';
import { TimeCell } from '@/components/common/TimeCell';
import { UserCell } from '@/components/common/UserCell';
import { TimeFilterDropdown } from '@/components/common/TimeFilterDropdown';
import { ChevronLeft, ChevronRight, ChevronDown, Loader2, MoreHorizontal } from 'lucide-react';
import api from '@/lib/api';

// Local Section wrapper matching our isolated time-filter layout
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

const EndpointDevices: React.FC = () => {
  // Section-isolated time range states
  const [devicesRange, setDevicesRange] = useState<string>("24h");
  const [agentsRange, setAgentsRange] = useState<string>("24h");
  const [processRange, setProcessRange] = useState<string>("24h");
  const [usbRange, setUsbRange] = useState<string>("24h");

  // API Data State
  const [endpointData, setEndpointData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchEndpoints = async () => {
      setLoading(true);
      try {
        const response = await api.get("/dashboard/endpoints", {
          params: { timeRange: devicesRange },
        });
        console.log("🔥 [Endpoints Response]:", response.data);
        setEndpointData(response.data);
      } catch (error) {
        console.error("❌ [Endpoints Fetch Error]:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEndpoints();
  }, [devicesRange]);

  if (loading && !endpointData) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="size-8 animate-spin text-slate-400" />
      </div>
    );
  }

  // Extract live metrics with clean fallbacks
  const totalDevices = endpointData?.total ?? 456;
  const healthyCount = endpointData?.healthy ?? 389;
  const warningCount = endpointData?.warning ?? 45;
  const criticalCount = endpointData?.critical ?? 22;

  // OS Distribution mapping for Donut Chart
  const osMap = endpointData?.os_distribution ?? {
    "Windows 11": 160,
    "Windows 10": 205,
    "macOS": 55,
    "Linux": 23,
    "iOS": 13,
  };

  const totalOsCount = Object.values(osMap).reduce((a: any, b: any) => a + b, 0) as number;
  const colorPalette = ['#111827', '#3B82F6', '#93C5FD', '#10B981', '#A7F3D0'];
  
  const donutData = Object.entries(osMap).map(([name, count], idx) => ({
    name,
    value: Number(((Number(count) / totalOsCount) * 100).toFixed(1)),
    color: colorPalette[idx % colorPalette.length],
  }));

  // Agents list from backend or mock fallback
  const liveAgents = endpointData?.agents ?? [];

  return (
    <div className="flex flex-col w-full gap-12 animate-in fade-in duration-500 pb-12">
      
      {/* 1. Summary Cards Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MonitoringSummaryCard label="Total Devices" value={String(totalDevices)} />
        <MonitoringSummaryCard label="Healthy Status" value={String(healthyCount)} />
        <MonitoringSummaryCard label="Warning Status" value={String(warningCount)} />
        <MonitoringSummaryCard label="Critical Status" value={String(criticalCount)} />
      </div>

      {/* 2. Devices & Health Status Table */}
      <Section
        title="Devices & health status"
        timeRange={devicesRange}
        onSelectTime={setDevicesRange}
      >
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
                <th className="py-4 px-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {liveAgents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-sm text-slate-400">
                    No active device records found.
                  </td>
                </tr>
              ) : (
                liveAgents.map((agent: any, i: number) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-all group">
                    <td className="py-5 px-2 text-[14px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-tight">
                      {agent.device_id}
                    </td>
                    <td className="py-5 px-2 text-[14px] text-slate-400 font-medium">
                      {agent.type ?? "mock Laptop"} {/* Mocked field logged in bugsheet */}
                    </td>
                    <td className="py-5 px-2 text-[14px] text-slate-400 font-medium">
                      {agent.os ?? " mockWindows 11"} {/* Mocked field logged in bugsheet */}
                    </td>
                    <td className="py-5 px-2">
                      <MonitoringBadge type="health" value={i < 2 ? 98 : i < 5 ? 85 : 94} /> {/* confused, but i used mocked health value for demonstration */}
                    </td>
                    <td className="py-5 px-2">
                      <TimeCell value={agent.last_seen} />
                    </td>
                    <td className="py-5 px-2 text-[14px] text-slate-400 font-bold">
                      {agent.agent_version}
                    </td>
                    <td className="py-5 px-2">
                      <div className="flex items-center -space-x-2">
                        <img src="https://i.pravatar.cc/150?u=1" alt="" className="size-8 rounded-full border-2 border-white grayscale" />
                        <img src="https://i.pravatar.cc/150?u=2" alt="" className="size-8 rounded-full border-2 border-white grayscale" />
                        <div className="size-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400">
                          +2
                        </div>
                      </div>
                    </td>
                     <td className="py-5 px-2">
                      <TimeCell value={agent.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Simplified Pagination */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-50 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-bold text-slate-400 uppercase tracking-widest">Page:</span>
            <div className="px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded border border-slate-100 dark:border-slate-700 text-[14px] font-black text-slate-800 dark:text-white">
              1/200
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <span className="text-[14px] font-bold text-slate-400 uppercase tracking-widest">Rows per page:</span>
              <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded border border-slate-100 dark:border-slate-700 text-[14px] font-black text-slate-800 dark:text-white cursor-pointer">
                10
                <ChevronDown className="size-4" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-300 hover:text-slate-600">
                <ChevronLeft className="size-5" />
              </button>
              <button className="p-2 text-slate-600 hover:text-slate-900 dark:hover:text-white">
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. Agent & Versions and OS Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Section
          title="Agent & versions"
          timeRange={agentsRange}
          onSelectTime={setAgentsRange}
        >
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
              {/* {['v2.1.4', 'v2.0.0', 'v1.9.2'].map((v, i) => ( */}
                <tr  className="hover:bg-slate-50/50 transition-all group">
                  <td className="py-4 px-2 text-[14px] font-bold text-slate-700 dark:text-slate-200">mock Version</td>
                  <td className="py-4 px-2 text-[14px] font-bold text-slate-500">mock Count</td>
                  <td className="py-4 px-2 text-[14px] font-bold text-slate-500">mock Percentage</td>
                  <td className="py-4 px-2 text-center">
                    <MonitoringBadge variant="generic" value='active' />
                  </td>
                </tr>
              {/* ))} */}
            </tbody>
          </table>
        </Section>

        <Section
          title="OS By distribution"
          timeRange={agentsRange}
          onSelectTime={setAgentsRange}
        >
          <div className="flex items-center justify-center py-4">
            <DonutChart data={donutData} />
          </div>
        </Section>
      </div>

      {/* 4. Malicious Process Detection Table (Mocked / Bugsheet logged) */}
      <Section
        title="Malicious process detection: all mocks"
        timeRange={processRange}
        onSelectTime={setProcessRange}
      >
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
                  <td className="py-5 px-2 text-[14px] font-black text-slate-700 dark:text-slate-200 uppercase">LAPTOP-SALES-002</td>
                  <td className="py-5 px-2 text-[14px] font-medium text-slate-400">powershell.exe</td>
                  <td className="py-5 px-2 text-[14px] font-bold text-slate-500">Suspicious script run</td>
                  <td className="py-5 px-2 text-[14px] font-bold text-slate-800 dark:text-slate-200 opacity-60">85%</td>
                  <td className="py-5 px-2 text-center">
                    <MonitoringBadge variant={i === 1 ? 'resolved' : 'alert'} value={i === 1 ? 'Resolved' : 'Pending'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 5. USB/Device Control Violations Table (Mocked / Bugsheet logged) */}
      <Section
        title="USB/device control violations"
        timeRange={usbRange}
        onSelectTime={setUsbRange}
      >
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
                  <td className="py-5 px-2 text-[14px] font-black text-slate-700 dark:text-slate-200 uppercase">LAPTOP-SALES-002</td>
                  <td className="py-5 px-2 text-[14px] font-medium text-slate-400">Laptop</td>
                  <td className="py-5 px-2 text-center">
                    <MonitoringBadge 
                      variant={i === 2 ? 'allow' : i === 3 ? 'blocked' : 'alert'} 
                      value={i === 2 ? 'Allow' : i === 3 ? 'Blocked' : 'Alert'} 
                    />
                  </td>
                  <td className="py-5 px-2 text-center">
                    <button className="text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                      <MoreHorizontal className="size-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

    </div>
  );
};

export default EndpointDevices;