import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useNavigate } from "react-router";
import { Incident } from "@/types/threat.types";

interface PolicyViolationModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident?: Incident | null;
}

export const PolicyViolationModal: React.FC<PolicyViolationModalProps> = ({
  isOpen,
  onClose,
  incident,
}) => {
  const navigate = useNavigate();

  if (!isOpen || !incident) return null;

  const handleInvestigate = () => {
    onClose();
    // This routes you directly to the full details page shown in your second screenshot (/threats/1)
    navigate(`/threats/${incident.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-[480px] bg-white rounded-[24px] p-10 dark:bg-[#1F262E] shadow-2xl border border-slate-100 dark:border-slate-800">
        <div className="flex flex-col gap-6 w-full text-left">
          
          {/* Modal Header Preview */}
          <div className="space-y-1">
            <h2 className="text-[24px] font-bold text-slate-900 dark:text-white tracking-tight">
              {incident.title}
            </h2>
            <p className="text-[14px] font-semibold text-slate-400">
              {incident.description}
            </p>
          </div>

          {/* Status Badge */}
          <div className="flex">
            <Badge
              variant="danger"
              className="bg-[#FFF1F2] text-[#E11D48] border-none px-4 py-1.5 text-[12px] font-bold rounded-lg uppercase tracking-wider"
            >
              {incident.status}
            </Badge>
          </div>

          {/* Incident Fields Preview */}
          <div className="space-y-4 py-2">
            <InfoRow
    label="User:"
    value={
        typeof incident.user === "string"
            ? incident.user
            : incident.user?.name || "Unknown user"
    }
/>
            <InfoRow label="Device ID:" value={incident.deviceId} />
            <InfoRow label="Time:" value={incident.time} />
            <InfoRow
              label="Severity:"
              value={incident.severity}
              valueClass="text-rose-500 font-bold"
            />
            <InfoRow label="MITRE ATT&CK:" value={incident.mitre} />
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-6 mt-2">
            <button className="text-[14px] font-bold text-[#14B8A6] hover:text-[#0D9488] transition-colors underline decoration-2 underline-offset-4 cursor-pointer">
              Assign
            </button>
            <button className="text-[14px] font-bold text-[#14B8A6] hover:text-[#0D9488] transition-colors underline decoration-2 underline-offset-4 cursor-pointer">
              Acknowledge
            </button>
          </div>

          {/* Investigate Button -> Triggers routing to /threats/:id */}
          <Button
            onClick={handleInvestigate}
            colorScheme="gradient"
            className="w-full rounded-xl h-14 text-[15px] font-bold mt-2 shadow-lg shadow-slate-200 dark:shadow-none cursor-pointer"
          >
            Investigate
          </Button>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) => (
  <div className="flex items-center justify-between">
    <span className="text-[14px] font-bold text-slate-400">{label}</span>
    <span
      className={cn(
        "text-[14px] font-bold text-slate-700 dark:text-slate-200",
        valueClass,
      )}
    >
      {value}
    </span>
  </div>
);

export default PolicyViolationModal;