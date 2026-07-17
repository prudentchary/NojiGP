import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { DashboardDateRange } from "@/types/dashboard";

interface DateRangeDropdownProps {
  value: DashboardDateRange;
  onChange: (value: DashboardDateRange) => void;
}

const OPTIONS: {
  label: string;
  value: DashboardDateRange;
}[] = [
  { label: "Today", value: "today" },
  { label: "1 Week", value: "1week" },
  { label: "1 Month", value: "1month" },
  { label: "1 Hour", value: "1hr" },
];

export const DateRangeDropdown: React.FC<
  DateRangeDropdownProps
> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const selected =
    OPTIONS.find((option) => option.value === value)?.label ??
    "Today";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white"
      >
        {selected}
        <ChevronDown
          size={16}
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 rounded-lg border border-slate-700 bg-[#1F262E] shadow-lg z-50">
          {OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2 text-left text-sm hover:bg-slate-700 ${
                value === option.value
                  ? "text-cyan-400"
                  : "text-slate-300"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};