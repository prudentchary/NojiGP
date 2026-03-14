import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

interface PolicyViolationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PolicyViolationModal: React.FC<PolicyViolationModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="max-w-[480px] rounded-[24px] p-10"
        >
            <div className="flex flex-col gap-6 w-full">
                <div className="space-y-1">
                    <h2 className="text-[24px] font-bold text-slate-900 dark:text-white tracking-tight">Policy violation</h2>
                    <p className="text-[14px] font-semibold text-slate-400">No VPN. Unapproved location</p>
                </div>

                <div className="flex">
                    <Badge variant="danger" className="bg-[#FFF1F2] text-[#E11D48] border-none px-4 py-1.5 text-[12px] font-bold rounded-lg uppercase tracking-wider">
                        Untreated
                    </Badge>
                </div>

                <div className="space-y-4 py-2">
                    <InfoRow label="User:" value="Kate Hunington" />
                    <InfoRow label="Device ID:" value="LAPTOP-IT-001" />
                    <InfoRow label="Time:" value="11:30 AM (2 hours ago)" />
                    <InfoRow label="Severity:" value="Critical" valueClass="text-rose-500" />
                    <InfoRow label="MITRE ATTA&CK:" value="TA0001" />
                </div>

                <div className="flex items-center gap-6 mt-2">
                    <button className="text-[14px] font-bold text-[#14B8A6] hover:text-[#0D9488] transition-colors underline decoration-2 underline-offset-4">
                        Assign
                    </button>
                    <button className="text-[14px] font-bold text-[#14B8A6] hover:text-[#0D9488] transition-colors underline decoration-2 underline-offset-4">
                        Acknowledge
                    </button>
                </div>

                <Button 
                    onClick={onClose}
                    className="w-full bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl h-14 text-[15px] font-bold mt-2 shadow-lg shadow-slate-200 dark:shadow-none"
                >
                    Investigate
                </Button>
            </div>
        </Modal>
    );
};

const InfoRow = ({ label, value, valueClass }: { label: string, value: string, valueClass?: string }) => (
    <div className="flex items-center justify-between">
        <span className="text-[14px] font-bold text-slate-400">{label}</span>
        <span className={cn("text-[14px] font-bold text-slate-700 dark:text-slate-200", valueClass)}>
            {value}
        </span>
    </div>
);
