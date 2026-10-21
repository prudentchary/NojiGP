import React, { useState, useEffect } from "react";
import { MonitoringSummaryCard } from "@/components/common/MonitoringSummaryCard";
import { TimeCell } from "@/components/common/TimeCell";
import { TimeFilterDropdown } from "@/components/common/TimeFilterDropdown";
import { Loader2 } from "lucide-react";
import api from "@/lib/api";

// Local Section wrapper for clean header layout
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

const CompliancePolicy: React.FC = () => {
  // Independent section timeframe states
  const [overviewRange, setOverviewRange] = useState<string>("24h");
  const [violationsRange, setViolationsRange] = useState<string>("24h");
  const [configDriftRange, setConfigDriftRange] = useState<string>("24h");
  const [controlsRange, setControlsRange] = useState<string>("24h");
  const [auditLogsRange, setAuditLogsRange] = useState<string>("24h");

  // Data states per section
  const [complianceData, setComplianceData] = useState<any>(null);
  const [violationsData, setViolationsData] = useState<any>(null);
  const [configDriftsData, setConfigDriftsData] = useState<any[]>([]);
  const [controlsData, setControlsData] = useState<any[]>([]);
  const [auditLogsData, setAuditLogsData] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  // 1. Fetch Overview Data
  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await api.get("/dashboard/compliance", {
          params: { timeRange: overviewRange },
        });
        setComplianceData(res.data);
      } catch (err) {
        console.error("Error fetching compliance overview:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOverview();
  }, [overviewRange]);

  // 2. Fetch Violations Data
  useEffect(() => {
    const fetchViolations = async () => {
      try {
        const res = await api.get("/dashboard/compliance", {
          params: { timeRange: violationsRange },
        });
        setViolationsData(res.data?.violations_by_category ?? {});
      } catch (err) {
        console.error("Error fetching violations:", err);
      }
    };
    fetchViolations();
  }, [violationsRange]);

  // 3. Fetch Config Drift Data
  useEffect(() => {
    const fetchConfigDrifts = async () => {
      try {
        const res = await api.get("/dashboard/compliance", {
          params: { timeRange: configDriftRange },
        });
        setConfigDriftsData(res.data?.config_drift ?? []);
      } catch (err) {
        console.error("Error fetching config drifts:", err);
      }
    };
    fetchConfigDrifts();
  }, [configDriftRange]);

  // 4. Fetch Control Status Data
  useEffect(() => {
    const fetchControls = async () => {
      try {
        const res = await api.get("/dashboard/compliance", {
          params: { timeRange: controlsRange },
        });
        setControlsData(res.data?.controls ?? []);
      } catch (err) {
        console.error("Error fetching controls:", err);
      }
    };
    fetchControls();
  }, [controlsRange]);

  // 5. Fetch Audit Logs Data
  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        const res = await api.get("/dashboard/compliance", {
          params: { timeRange: auditLogsRange },
        });
        setAuditLogsData(res.data?.audit_logs ?? []);
      } catch (err) {
        console.error("Error fetching audit logs:", err);
      }
    };
    fetchAuditLogs();
  }, [auditLogsRange]);

  if (loading && !complianceData) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="size-8 animate-spin text-slate-400" />
      </div>
    );
  }

  // Safe data extraction with fallbacks
  const zeroTrustScore = complianceData?.zero_trust_score;
  const violationsMap: Record<string, number> =
    violationsData || complianceData?.violations_by_category || {};
  const totalViolations = Object.values(violationsMap).reduce(
    (acc, val) => acc + val,
    0
  );

  const configDrifts =
    configDriftsData.length > 0
      ? configDriftsData
      : complianceData?.config_drift ?? [];
  const controls =
    controlsData.length > 0 ? controlsData : complianceData?.controls ?? [];
  const auditLogs =
    auditLogsData.length > 0
      ? auditLogsData
      : complianceData?.audit_logs ?? [];

  return (
    <div className="flex flex-col w-full gap-12 animate-in fade-in duration-500 pb-12">
      {/* 1. Overview */}
      <Section
        title="Overview"
        timeRange={overviewRange}
        onSelectTime={setOverviewRange}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MonitoringSummaryCard
            label="Zero Trust Score"
            value={`${zeroTrustScore}%`}
          />
          <MonitoringSummaryCard
            label="Total Violations"
            value={String(totalViolations)}
          />
          <MonitoringSummaryCard
            label="Config Drifts"
            value={String(configDrifts.length)}
          />
          <MonitoringSummaryCard
            label="Active Controls"
            value={String(controls.length)}
          />
        </div>
      </Section>

      {/* 2. Violations by Category */}
      <Section
        title="Violations by Category"
        timeRange={violationsRange}
        onSelectTime={setViolationsRange}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.keys(violationsMap).length === 0 ? (
            <p className="text-sm text-slate-400 col-span-3">
              No category violations recorded.
            </p>
          ) : (
            Object.entries(violationsMap).map(([category, count], idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-[20px] shadow-sm flex flex-col justify-between"
              >
                <span className="text-[13px] font-bold text-slate-400 uppercase tracking-widest">
                  {category.replace(/_/g, " ")}
                </span>
                <span className="text-[32px] font-extrabold text-slate-900 dark:text-white mt-4">
                  {String(count)}
                </span>
              </div>
            ))
          )}
        </div>
      </Section>

      {/* 3. Configuration Drift Table */}
      <Section
        title="Configuration Drift"
        timeRange={configDriftRange}
        onSelectTime={setConfigDriftRange}
      >
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[13px] font-bold uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                <th className="py-4 px-2">Device</th>
                <th className="py-4 px-2">Expected OS/Build</th>
                <th className="py-4 px-2">Actual OS/Build</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {configDrifts.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="py-6 text-center text-sm text-slate-400"
                  >
                    No configuration drift detected.
                  </td>
                </tr>
              ) : (
                configDrifts.map((drift: any, i: number) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all"
                  >
                    <td className="py-5 px-2 text-[14px] font-bold text-slate-800 dark:text-slate-200">
                      {drift.device}
                    </td>
                    <td className="py-5 px-2 text-[14px] font-semibold text-slate-600 dark:text-slate-400">
                      {drift.expected}
                    </td>
                    <td className="py-5 px-2 text-[14px] font-bold text-rose-500">
                      {drift.actual}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 4. Control Status Table */}
      <Section
        title="Control Status"
        timeRange={controlsRange}
        onSelectTime={setControlsRange}
      >
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[13px] font-bold uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                <th className="py-4 px-2">Control Name</th>
                <th className="py-4 px-2">Status</th>
                <th className="py-4 px-2">Compliance / Verified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {controls.map((control: any, i: number) => (
                <tr
                  key={i}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all"
                >
                  <td className="py-5 px-2 text-[14px] font-bold text-slate-800 dark:text-slate-200">
                    {control.name}
                  </td>
                  <td className="py-5 px-2">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase ${
                        control.status === "enabled"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : "bg-amber-50 text-amber-600 border border-amber-200"
                      }`}
                    >
                      {control.status}
                    </span>
                  </td>
                  <td className="py-5 px-2 text-[13px] font-semibold text-slate-500">
                    {control.compliance_percent ? (
                      `Compliance: ${control.compliance_percent}%`
                    ) : (
                      <TimeCell value={control.last_verified} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 5. Audit Logs Table */}
      <Section
        title="Audit Logs"
        timeRange={auditLogsRange}
        onSelectTime={setAuditLogsRange}
      >
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[13px] font-bold uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                <th className="py-4 px-2">Timestamp</th>
                <th className="py-4 px-2">Actor</th>
                <th className="py-4 px-2">Action</th>
                <th className="py-4 px-2">Resource</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {auditLogs.map((log: any, i: number) => (
                <tr
                  key={i}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all"
                >
                  <td className="py-5 px-2">
                    <TimeCell value={log.timestamp} />
                  </td>
                  <td className="py-5 px-2 text-[14px] font-bold text-slate-800 dark:text-slate-200">
                    {log.actor}
                  </td>
                  <td className="py-5 px-2 text-[14px] font-semibold text-slate-600 dark:text-slate-400">
                    {log.action}
                  </td>
                  <td className="py-5 px-2 text-[14px] font-bold text-teal-600 dark:text-teal-400">
                    {log.resource}
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

export default CompliancePolicy;