import React, { useEffect, useState } from "react";
import { Info, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";
import api from "@/lib/api";
import { TimeFilterDropdown } from "@/components/common/TimeFilterDropdown"; 

const UserBehaviour: React.FC = () => {
  // 1. Separate state for each of the 4 sections
  const [riskyUsersRange, setRiskyUsersRange] = useState<string>("24h");
  const [heatmapRange, setHeatmapRange] = useState<string>("24h");
  const [travelRange, setTravelRange] = useState<string>("24h");
  const [escalationRange, setEscalationRange] = useState<string>("24h");

  // Data states per section
  const [riskyUsersData, setRiskyUsersData] = useState<any[]>([]);
  const [heatmapData, setHeatmapData] = useState<any[]>([]);
  const [travelData, setTravelData] = useState<any[]>([]);
//   const [escalationData, setEscalationData] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  // 2. Fetch data independently when their respective time ranges change
  useEffect(() => {
    const fetchRiskyUsers = async () => {
      try {
        const res = await api.get("/dashboard/uba", { params: { timeRange: riskyUsersRange } });
        setRiskyUsersData(res.data?.top_risky_users ?? []);
      } catch (err) {
        console.error("Error fetching risky users:", err);
      }
    };
    fetchRiskyUsers();
  }, [riskyUsersRange]);

  useEffect(() => {
    const fetchHeatmap = async () => {
      try {
        const res = await api.get("/dashboard/uba", { params: { timeRange: heatmapRange } });
        setHeatmapData(res.data?.abnormal_login_heatmap ?? []);
      } catch (err) {
        console.error("Error fetching heatmap:", err);
      }
    };
    fetchHeatmap();
  }, [heatmapRange]);

  useEffect(() => {
    const fetchTravel = async () => {
      try {
        const res = await api.get("/dashboard/uba", { params: { timeRange: travelRange } });
        setTravelData(res.data?.impossible_travel_alerts ?? []);
      } catch (err) {
        console.error("Error fetching travel alerts:", err);
      }
    };
    fetchTravel();
  }, [travelRange]);

  useEffect(() => {
    const fetchEscalations = async () => {
      try {
        const res = await api.get("/dashboard/uba", { params: { timeRange: escalationRange } });
        // setEscalationData(res.data?.privilege_escalation_events ?? []);
      } catch (err) {
        console.error("Error fetching escalation events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEscalations();
  }, [escalationRange]);

  if (loading && !riskyUsersData.length && !heatmapData.length) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="size-8 animate-spin text-slate-400" />
      </div>
    );
  }

  const riskyUsers =
    Array.isArray(riskyUsersData) && riskyUsersData.length > 0
      ? riskyUsersData: []

  return (
    <div className="flex flex-col w-full gap-12 animate-in fade-in duration-500 pb-12">
      {/* 1. TOP 5 Most Risky Users */}
      <Section
        title="TOP 5 Most risky users"
        timeRange={riskyUsersRange}
        onSelectTime={setRiskyUsersRange}
        content={
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-slate-400 text-[13px] font-bold uppercase tracking-widest">
                  <th className="py-2">Staff</th>
                  <th className="py-2">Department</th>
                  <th className="py-2">Risk score</th>
                  <th className="py-2">SCRS</th>
                  <th className="py-2">Incidents</th>
                  <th className="py-2">Key Anomaly</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {riskyUsers.map((user: any, i: number) => {
                  const displayName =
                    user.user_id || user.name || user.user || "Unknown User";

                  return (
                    <tr key={i} className="group">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <span className="text-[14.5px] font-bold text-slate-800 dark:text-slate-200">
                              {displayName}
                            </span>
                            <span className="text-[12px] text-slate-400 font-medium italic">
                              {user.role || "Staff"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-[14px] text-slate-500 font-medium">
                        {user.department || "Security"}
                      </td>
                      <td className="py-4">
                        <span
                          className={cn(
                            "px-2 py-0.5 text-[11px] font-bold rounded border capitalize",
                            (user.risk_level || user.riskScore) === "high"
                              ? "bg-rose-50 text-rose-500 border-rose-100/50"
                              : "bg-amber-50 text-amber-600 border-amber-100/50"
                          )}
                        >
                          {user.risk_level || user.riskScore || "Medium"}
                        </span>
                      </td>
                      <td className="py-4 text-[14px] font-bold text-slate-600 dark:text-slate-300">
                        {user.scrs ?? "N/A"}
                      </td>
                      <td className="py-4 text-[14px] font-bold text-slate-600 dark:text-slate-300">
                        {user.incidents ?? 1}
                      </td>
                      <td className="py-4 text-[14px] text-slate-500 font-medium">
                        {user.key_anomaly ||
                          user.keyAnomaly ||
                          "Anomaly Detected"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        }
      />

      {/* 2. Abnormal Login Patterns */}
      <Section
        title="Abnormal login patterns"
        timeRange={heatmapRange}
        onSelectTime={setHeatmapRange}
        content={
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex ml-10 text-[11px] font-bold text-slate-400 gap-[9px]">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <span key={i} className="w-[14px] text-center">
                      {i.toString().padStart(2, "0")}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col gap-[6px]">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day) => {
                      const fullDayMap: Record<string, string> = {
                        Mon: "Monday",
                        Tue: "Tuesday",
                        Wed: "Wednesday",
                        Thu: "Thursday",
                        Fri: "Friday",
                        Sat: "Saturday",
                        Sun: "Sunday",
                      };
                      const fullDay = fullDayMap[day];

                      return (
                        <div key={day} className="flex items-center gap-4">
                          <span className="w-6 text-[11px] font-bold text-slate-400">
                            {day}
                          </span>
                          <div className="flex gap-[6px] flex-1">
                            {Array.from({ length: 24 }).map((_, hour) => {
                              const match = heatmapData.find(
                                (item: any) =>
                                  item.day === fullDay && item.hour === hour
                              );
                              const count = match ? match.count : 0;

                              return (
                                <div
                                  key={hour}
                                  title={
                                    match
                                      ? `${fullDay} @ ${hour}:00 - ${count} logins`
                                      : `${day} @ ${hour}:00`
                                  }
                                  className={cn(
                                    "h-[18px] flex-1 rounded-sm transition-all",
                                    count > 10
                                      ? "bg-[#059669]"
                                      : count > 5
                                      ? "bg-[#10B981]"
                                      : count > 0
                                      ? "bg-[#D1FAE5]"
                                      : "bg-[#F9FAFB] dark:bg-slate-800"
                                  )}
                                />
                              );
                            })}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-2 border-t border-slate-50 dark:border-slate-800 pt-6">
                <div className="flex items-center gap-2">
                  <Info className="size-4" />
                  Learn how we count contributions
                </div>
                <div className="flex items-center gap-3">
                  <span>Less</span>
                  <div className="flex gap-1.5">
                    <div className="size-3.5 bg-slate-50 rounded-sm dark:bg-slate-800" />
                    <div className="size-3.5 bg-[#D1FAE5] rounded-sm" />
                    <div className="size-3.5 bg-[#10B981] rounded-sm" />
                    <div className="size-3.5 bg-[#059669] rounded-sm" />
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[280px] bg-[#F9FAFB] rounded-[24px] p-8 dark:bg-slate-900/50">
              <h4 className="text-[14px] font-bold text-slate-700 dark:text-slate-200 mb-8">
                Top abnormal logins
              </h4>
              <div className="flex flex-col gap-6">
                <AbnormalUser
                  color="bg-slate-800"
                  name={riskyUsers[0]?.user_id || "jane.doe@company.com"}
                  value={heatmapData[0]?.count ?? 12}
                />
                <AbnormalUser
                  color="bg-blue-400"
                  name={riskyUsers[1]?.user_id || "john.smith@company.com"}
                  value={heatmapData[1]?.count ?? 8}
                />
                <AbnormalUser
                  color="bg-emerald-400"
                  name="mike.barret@company.com"
                  value={3}
                />
                <AbnormalUser
                  color="bg-emerald-100"
                  name="Others"
                  value={5}
                />
              </div>
            </div>
          </div>
        }
      />

      {/* 3. Impossible Travel Alerts */}
      <Section
        title="Impossible travel alerts"
        timeRange={travelRange}
        onSelectTime={setTravelRange}
        content={
          <div className="w-full overflow-x-auto">
            {travelData.length === 0 ? (
              <p className="py-6 text-center text-sm text-slate-400 font-medium">
                No impossible travel alerts detected.
              </p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-slate-400 text-[13px] font-bold uppercase tracking-widest">
                    <th className="py-4">Staff</th>
                    <th className="py-4">From</th>
                    <th className="py-4">To</th>
                    <th className="py-4">Time Diff</th>
                    <th className="py-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {travelData.map((alert: any, i: number) => (
                    <tr key={i} className="group">
                      <td className="py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <span className="text-[14.5px] font-bold text-slate-800 dark:text-slate-200">
                              {alert.user}
                            </span>
                            <span className="text-[12px] text-slate-400 font-medium italic">
                              {alert.role || "Staff"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 text-[14px] text-slate-500 font-bold">
                        {alert.from}
                      </td>
                      <td className="py-5 text-[14px] text-slate-500 font-bold">
                        {alert.to}
                      </td>
                      <td className="py-5 text-[14px] text-slate-500 font-bold">
                        {alert.time_diff}
                      </td>
                      <td className="py-5 text-center">
                        <span className="px-3 py-1 bg-white dark:bg-slate-800 border border-rose-200 text-rose-400 text-[11px] font-bold rounded-md shadow-sm">
                          {alert.status || "Open"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        }
      />

      {/* 4. Privilege Escalation Events */}
      <Section
        title="Privilege escalation events"
        timeRange={escalationRange}
        onSelectTime={setEscalationRange}
        content={
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-slate-400 text-[13px] font-bold uppercase tracking-widest">
                  <th className="py-4">Time</th>
                  <th className="py-4">Staff</th>
                  <th className="py-4">From role</th>
                  <th className="py-4">To role</th>
                  <th className="py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="group">
                    <td className="py-6 text-[14px] font-black text-slate-700 dark:text-slate-300">
                      12 Jan 2023, 12:40am
                    </td>
                    <td className="py-6">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://i.pravatar.cc/150?u=kate"
                          alt=""
                          className="size-9 rounded-full object-cover grayscale"
                        />
                        <div className="flex flex-col">
                          <span className="text-[14.5px] font-bold text-slate-800 dark:text-slate-200">
                            Kate Huntington
                          </span>
                          <span className="text-[12px] text-slate-400 font-medium italic">
                            Manager
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 text-[14px] text-slate-500 font-bold">
                      Finance officer
                    </td>
                    <td className="py-6 text-[14px] text-slate-500 font-bold">
                      Manager
                    </td>
                    <td className="py-6 text-center">
                      <span className="px-3 py-1 bg-white border border-rose-200 text-rose-400 text-[11px] font-bold rounded-md shadow-sm">
                        Open
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      />
    </div>
  );
};

interface SectionProps {
  title: string;
  content: React.ReactNode;
  timeRange: string;
  onSelectTime: (val: string) => void;
}

const Section = ({
  title,
  content,
  timeRange,
  onSelectTime,
}: SectionProps) => (
  <div className="flex flex-col gap-8 w-full">
    <div className="flex items-center justify-between">
      <h3 className="text-[18px] font-bold text-slate-800 dark:text-white tracking-tight">
        {title}
      </h3>
      <TimeFilterDropdown timeRange={timeRange} onSelectTime={onSelectTime} />
    </div>
    <div className="bg-white border border-slate-50 rounded-[24px] p-8 shadow-sm dark:bg-slate-900 dark:border-slate-800">
      {content}
    </div>
  </div>
);

const AbnormalUser = ({ color, name, value }: any) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className={cn("size-2 rounded-full", color)} />
      <span className="text-[13px] font-bold text-slate-500 dark:text-slate-400">
        {name}
      </span>
    </div>
    <span className="text-[13px] font-black text-slate-800 dark:text-white">
      {value}
    </span>
  </div>
);

export default UserBehaviour;