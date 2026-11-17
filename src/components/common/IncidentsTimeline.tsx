
import React from "react";
import {
  Activity,
  ShieldAlert,
  Users,
  FileText,
} from "lucide-react";

import { threatMockData } from "@/data/threatMockData";
import type {
  Incident,
  ThreatSeverity,
} from "@/types/threat.types";

// ----------------------------------
// Summary Card
// ----------------------------------

interface SummaryCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  icon: Icon,
  label,
  value,
}) => (
  <div className="bg-white border border-slate-50 rounded-[12px] p-4 flex flex-col gap-2 shadow-sm transition-all hover:shadow-md dark:bg-slate-900 dark:border-slate-800">
    <div className="flex items-center gap-2">
      <Icon className="size-4 text-slate-400" />
      <span className="text-[15px] font-bold text-slate-900 dark:text-white leading-none tracking-tight">
        {value}
      </span>
    </div>

    <span className="text-[12px] font-medium text-slate-400 tracking-tight leading-none">
      {label}
    </span>
  </div>
);

// ----------------------------------
// Severity-based Bubble Sizes
// ----------------------------------

const bubbleSizes: Record<ThreatSeverity, number> = {
  Critical:30,
  High: 20,  
  Low:10,
};

// ----------------------------------
// Bubble Component
// ----------------------------------

interface BubbleCloudProps {
  incidents: Incident[];
  onBubbleClick?: (incident: Incident) => void;
}

const BubbleCloud: React.FC<BubbleCloudProps> = ({
  incidents,
  onBubbleClick,
}) => {
  return (
    <div className="w-full min-h-[190px] flex flex-wrap justify-center items-center content-start gap-x-3 gap-y-5 px-2 pt-4 pb-6">
      {incidents.map((incident, index) => {
        const size = bubbleSizes[incident.severity];

        return (
          <button
            key={incident.id}
            type="button"
            title={`${incident.title} - ${incident.severity}`}
            aria-label={`View ${incident.severity} incident: ${incident.title}`}
            onClick={() => onBubbleClick?.(incident)}
            className="relative shrink-0 rounded-full cursor-pointer transition-transform duration-300 hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 animate-water"
            style={{
              width: size,
              height: size,
              animationDelay: `${(index % 5)}s`,
              background:
                incident.severity === "Critical"
                  ? "radial-gradient(circle at 32% 32%, #A5F3FC 0%, #22D3EE 40%, #0E7490 100%)"
                  : incident.severity === "High"
                  ? "radial-gradient(circle at 32% 32%, #5EEAD4 0%, #14B8A6 45%, #0D9488 100%)"
                  : "radial-gradient(circle at 32% 32%, #CCFBF1 0%, #5EEAD4 60%, #14B8A6 100%)",
              boxShadow:
                "0 4px 10px rgba(20,184,166,0.35), inset -3px -3px 6px rgba(4,47,46,0.5), inset 2px 2px 5px rgba(255,255,255,0.6)",
            }}
          />
        );
      })}
    </div>
  );
};

// ----------------------------------
// Timeline
// ----------------------------------

interface IncidentsTimelineProps {
  onDotClick?: (incident: Incident) => void;
}

export const IncidentsTimeline: React.FC<
  IncidentsTimelineProps
> = ({ onDotClick }) => {

  // Flatten all incidents
  const allIncidents = threatMockData.flatMap(
    (slot) => slot.incidents
  );

  // Summary calculations
  const totalEvents = allIncidents.length;

  const behaviorAnomalies = allIncidents.filter(
    (incident) => incident.title === "Behavioral Anomaly"
  ).length;

  const policyViolations = allIncidents.filter(
    (incident) => incident.title === "Policy Violation"
  ).length;

  const affectedUsers = new Set(
    allIncidents.map((incident) => incident.user.email)
  ).size;

  return (
    <>
      <style>{`
        @keyframes waterDrift {
          0%, 100% {
            transform: translate3d(0px, 0px, 0);
          }
          25% {
            transform: translate3d(2px, -3px, 0);
          }
          50% {
            transform: translate3d(-2px, 2px, 0);
          }
          75% {
            transform: translate3d(1px, 3px, 0);
          }
        }

        .animate-water {
          animation: waterDrift 6s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>

      <div className="bg-[#F9FBFF]/60 border border-slate-100 rounded-[24px] p-8 shadow-sm dark:bg-slate-900/40 dark:border-slate-800">

        <div className="flex gap-4">

          {/* SUMMARY CARDS */}
          <div className="w-[270px] shrink-0 flex flex-col gap-3">

            <SummaryCard
              icon={Activity}
              label="Total events"
              value={totalEvents}
            />

            <SummaryCard
              icon={ShieldAlert}
              label="Behavior anomaly"
              value={behaviorAnomalies}
            />

            <SummaryCard
              icon={FileText}
              label="Policy violations"
              value={policyViolations}
            />

            <SummaryCard
              icon={Users}
              label="Affected users"
              value={affectedUsers}
            />

          </div>

          {/* VERTICAL DIVIDER */}
          <div className="w-[1px] bg-slate-100 dark:bg-slate-800 self-stretch my-2 shrink-0" />

          {/* TIMELINE */}
          <div className="flex-1 min-w-0 overflow-x-auto">

            <div className="flex items-start min-w-max w-full">

              {threatMockData.map((slot, index) => (

                <div
                  key={slot.timeSlot}
                  className="flex-1 min-w-[50px] flex flex-col items-center relative"
                >

                  {/* TIME */}
                  <span className="text-[11px] font-bold text-slate-400 mb-6">
                    {slot.timeSlot}
                  </span>

                  {/* INCIDENT COUNT */}
                  <span className="text-[24px] font-black text-slate-900 dark:text-white leading-none">
                    {slot.incidents.length}
                  </span>

                  {/* DYNAMIC BUBBLES */}
                  <BubbleCloud
                    incidents={slot.incidents}
                    onBubbleClick={onDotClick}
                  />

                  {/* DIVIDER */}
                  {index < threatMockData.length - 1 && (
                    <div className="absolute top-[10px] -right-[1px] w-[1px] h-[255px] bg-slate-200/80 dark:bg-slate-800 pointer-events-none" />
                  )}

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>
    </>
  );
};
