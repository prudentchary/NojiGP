
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ChevronDown, Lock, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/cn";
import { sharedIncidents } from "@/data/threatMockData";
import type { Incident } from "@/types/threat.types";

// MITRE ATT&CK tactic names
const mitreTactics: Record<string, string> = {
  TA0001: "Initial Access",
  TA0002: "Execution",
  TA0003: "Persistence",
  TA0004: "Privilege Escalation",
  TA0005: "Defense Evasion",
  TA0006: "Credential Access",
  TA0007: "Discovery",
  TA0008: "Lateral Movement",
  TA0009: "Collection",
  TA0010: "Exfiltration",
  TA0011: "Command and Control",
  TA0040: "Impact",
};

const Investigation: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Incident");

  // Find the incident using the ID from the URL
  const incident = sharedIncidents.find((item) => item.id === id);

  const tabs = ["Incident", "User details", "Investigation Log"];

  // Handle invalid incident IDs
  if (!incident) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Incident not found
        </h2>

        <p className="text-sm text-slate-500">
          The incident you are looking for does not exist.
        </p>

        <button
          onClick={() => navigate("/threats")}
          className="flex items-center gap-2 rounded-lg bg-[#14B8A6] px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-600"
        >
          <ArrowLeft size={16} />
          Back to threats
        </button>
      </div>
    );
  }

  const userName = incident.user.name;
  const nameParts = userName.trim().split(" ");
  const firstName = nameParts[0] || "Unknown";
  const lastName = nameParts.slice(1).join(" ") || "-";

  const tacticName =
    mitreTactics[incident.mitre] || "Unknown tactic";

  return (
    <div className="flex w-full animate-in flex-col gap-8 slide-in-from-right-10 duration-500">

      {/* Page Title & Lock Action */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <button
            onClick={() => navigate("/threats")}
            className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-[#14B8A6]"
          >
            <ArrowLeft size={16} />
            Back to threats
          </button>

          <h1 className="text-[22px] font-bold tracking-tight text-slate-800 dark:text-white">
            {incident.title} - {userName}
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Incident ID: {incident.id}
          </p>
        </div>

        <button
          disabled
          title="Session locking is not connected yet"
          className="flex cursor-not-allowed items-center gap-2 rounded-lg bg-[#0F172A] px-5 py-2.5 text-[14px] font-bold text-white opacity-60 shadow-sm"
        >
          <Lock className="size-4" />
          Lock session
          <ChevronDown className="ml-1 size-4 opacity-50" />
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-8 overflow-x-auto border-b border-slate-100 dark:border-slate-800 sm:gap-12">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "relative whitespace-nowrap pb-4 text-[15px] font-bold transition-all",
              activeTab === tab
                ? "text-[#14B8A6]"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            )}
          >
            {tab}

            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 h-[3px] w-full rounded-t-full bg-[#14B8A6]" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex flex-col gap-10">

        {/* ================================= */}
        {/* INCIDENT TAB */}
        {/* ================================= */}

        {activeTab === "Incident" && (
          <div className="flex flex-col gap-10">

            {/* Incident Details */}
            <div className="rounded-[20px] border border-slate-100 bg-[#F9FAFB]/60 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
              <h3 className="mb-10 text-[14px] font-bold uppercase tracking-widest text-slate-400">
                Incident Details
              </h3>

              <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2">
                <LabelValue label="Incident ID:" value={incident.id} />

                <LabelValue label="Title:" value={incident.title} />

                <LabelValue
                  label="Severity:"
                  value={incident.severity}
                  valueColor={getSeverityColor(incident.severity)}
                />

                <LabelValue label="Time:" value={incident.time} />

                <LabelValue
                  label="Status:"
                  value={incident.status}
                  valueColor={getStatusColor(incident.status)}
                />

                <LabelValue label="Assigned:" value="Unassigned" />

                <LabelValue
                  label="Correlation score:"
                  value="Not calculated"
                />

                <LabelValue
                  label="Device ID:"
                  value={incident.deviceId}
                />

                <LabelValue
                  label="MITRE ATT&CK:"
                  value={`${incident.mitre} - ${tacticName}`}
                />
              </div>
            </div>

            {/* MITRE ATT&CK Mapping */}
            <div className="space-y-6">
              <h3 className="text-[17px] font-bold tracking-tight text-slate-800 dark:text-white">
                MITRE ATT&CK Mapping
              </h3>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <TacticCard
                  type="PRIMARY TACTIC"
                  id={incident.mitre}
                  label={tacticName}
                  technique="Not specified"
                  confidence="Not calculated"
                  confidenceColor="text-slate-400"
                />
              </div>

              <p className="text-xs text-slate-400">
                The mock dataset currently contains tactic IDs only.
                Technique and sub-technique details will be populated when
                they become available from the backend.
              </p>
            </div>

            {/* Timeline of Events */}
            <div className="space-y-6">
              <h3 className="text-[17px] font-bold tracking-tight text-slate-800 dark:text-white">
                Timeline of events
              </h3>

              <div className="overflow-hidden rounded-[20px] border border-slate-50 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <table className="w-full text-left">
                  <thead className="bg-[#F9FAFB] dark:bg-slate-800/50">
                    <tr className="border-b border-slate-50 dark:border-slate-800">
                      <th className="px-8 py-5 text-[13px] font-bold uppercase tracking-widest text-slate-400">
                        Time
                      </th>

                      <th className="px-8 py-5 text-[13px] font-bold uppercase tracking-widest text-slate-400">
                        Description
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="transition-all hover:bg-slate-50 dark:hover:bg-slate-800/20">
                      <td className="px-8 py-5 text-[14px] font-bold text-slate-700 dark:text-slate-300">
                        {incident.time}
                      </td>

                      <td className="px-8 py-5 text-[14px] font-medium text-slate-500 dark:text-slate-400">
                        {incident.description}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================================= */}
        {/* USER DETAILS TAB */}
        {/* ================================= */}

        {activeTab === "User details" && (
          <div className="flex flex-col gap-8">

            {/* Affected User */}
            <div className="rounded-[24px] border border-slate-50 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <div className="mb-10 flex items-center gap-4">
                <img
                  src={incident.user.avatar}
                  alt={userName}
                  className="size-14 rounded-full border border-slate-100 object-cover dark:border-slate-700"
                />

                <div>
                  <h3 className="text-base font-bold text-slate-800 dark:text-white">
                    {userName}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {incident.user.email}
                  </p>
                </div>
              </div>

              <h3 className="mb-8 text-[14px] font-bold uppercase tracking-widest text-slate-400">
                Affected User
              </h3>

              <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2">
                <LabelValue label="First name:" value={firstName} />

                <LabelValue label="Last name:" value={lastName} />

                <LabelValue label="Other name:" value="Not available" />

                <LabelValue
                  label="Email address:"
                  value={incident.user.email}
                />

                <LabelValue label="User ID:" value="Not available" />

                <LabelValue label="Role:" value="Not available" />

                <LabelValue label="Department:" value="Not available" />

                <LabelValue label="SCRS:" value="Not calculated" />
              </div>
            </div>

            {/* Device and Network Information */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

              {/* Device Info */}
              <div className="rounded-[24px] border border-slate-50 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="mb-10 text-[14px] font-bold uppercase tracking-widest text-slate-400">
                  Device Info
                </h3>

                <div className="space-y-5">
                  <LabelValue
                    label="Device Name:"
                    value="Not available"
                    horizontal
                  />

                  <LabelValue
                    label="Device ID:"
                    value={incident.deviceId}
                    horizontal
                  />

                  <LabelValue
                    label="Agent status:"
                    value="Not available"
                    horizontal
                  />

                  <LabelValue
                    label="Last check-in:"
                    value="Not available"
                    horizontal
                  />

                  <LabelValue
                    label="Operating System:"
                    value="Not available"
                    horizontal
                  />

                  <LabelValue
                    label="Model version:"
                    value="Not available"
                    horizontal
                  />

                  <LabelValue
                    label="Current session:"
                    value="Not available"
                    horizontal
                  />
                </div>
              </div>

              {/* Network & Location */}
              <div className="rounded-[24px] border border-slate-50 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="mb-10 text-[14px] font-bold uppercase tracking-widest text-slate-400">
                  Network & Location
                </h3>

                <div className="space-y-5">
                  <LabelValue
                    label="Current IP:"
                    value="Not available"
                    horizontal
                  />

                  <LabelValue
                    label="Connection:"
                    value="Not available"
                    horizontal
                  />

                  <LabelValue
                    label="VPN Status:"
                    value="Not available"
                    horizontal
                  />
                </div>

                <div className="mt-8 border-t border-slate-100 pt-6 dark:border-slate-800">
                  <h4 className="mb-4 text-[13px] font-bold text-slate-800 dark:text-white">
                    Last Locations
                  </h4>

                  <p className="text-sm text-slate-400">
                    No location history available for this incident.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================= */}
        {/* INVESTIGATION LOG TAB */}
        {/* ================================= */}

        {activeTab === "Investigation Log" && (
          <div className="rounded-[24px] border border-slate-50 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <h3 className="mb-10 text-[14px] font-bold uppercase tracking-widest text-slate-400">
              Investigation Activity
            </h3>

            <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                <Lock className="size-5 text-slate-400" />
              </div>

              <h4 className="text-sm font-bold text-slate-700 dark:text-white">
                No investigation activity yet
              </h4>

              <p className="max-w-md text-sm text-slate-400">
                Activities such as status updates, investigator assignments,
                session locking, and investigation notes will appear here
                when they are recorded.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// =================================
// HELPER FUNCTIONS
// =================================

const getSeverityColor = (severity: Incident["severity"]) => {
  switch (severity) {
    case "Critical":
      return "text-rose-500";
    case "High":
      return "text-orange-500";
    case "Low":
      return "text-emerald-500";
    default:
      return "text-slate-500";
  }
};
const getStatusColor = (status: Incident["status"]) => {
  switch (status) {
    case "Untreated":
      return "text-rose-500";
    case "Investigating":
      return "text-amber-500";
    case "Resolved":
      return "text-emerald-500";
    default:
      return "text-slate-500";
  }
};

// =================================
// LABEL VALUE COMPONENT
// =================================

interface LabelValueProps {
  label: string;
  value: React.ReactNode;
  onClick?: () => void;
  horizontal?: boolean;
  valueColor?: string;
}

const LabelValue: React.FC<LabelValueProps> = ({
  label,
  value,
  onClick,
  horizontal,
  valueColor,
}) => (
  <div
    className={cn(
      "flex min-w-0 flex-col gap-1",
      horizontal ? "flex-row items-center justify-between gap-4" : ""
    )}
  >
    <span className="text-[13px] font-medium text-slate-400">
      {label}
    </span>

    <span
      onClick={onClick}
      className={cn(
        "truncate text-[14px] font-bold text-slate-800 dark:text-slate-200",
        onClick ? "cursor-pointer text-[#14B8A6] hover:underline" : "",
        valueColor || ""
      )}
    >
      {value}
    </span>
  </div>
);

// =================================
// MITRE TACTIC CARD
// =================================

interface TacticCardProps {
  type: string;
  id: string;
  label: string;
  technique: string;
  subTechnique?: string;
  confidence: string;
  confidenceColor: string;
}

const TacticCard: React.FC<TacticCardProps> = ({
  type,
  id,
  label,
  technique,
  subTechnique,
  confidence,
  confidenceColor,
}) => (
  <div className="relative rounded-[24px] border border-slate-50 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">

    <h3 className="mb-6 text-[14px] font-bold uppercase tracking-widest text-slate-400">
      {type}: {id} - {label}
    </h3>

    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <span className="text-[13px] font-medium text-slate-400">
          Technique:
        </span>

        <span className="text-right text-[13px] font-bold text-slate-700 dark:text-white">
          {technique}
        </span>
      </div>

      {subTechnique && (
        <div className="flex items-center justify-between gap-4">
          <span className="text-[13px] font-medium text-slate-400">
            Sub-technique:
          </span>

          <span className="text-right text-[13px] font-bold text-slate-700 dark:text-white">
            {subTechnique}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <span className="text-[13px] font-medium text-slate-400">
          Confidence:
        </span>

        <span className={cn("text-[13px] font-bold", confidenceColor)}>
          {confidence}
        </span>
      </div>
    </div>
  </div>
);

export default Investigation;
