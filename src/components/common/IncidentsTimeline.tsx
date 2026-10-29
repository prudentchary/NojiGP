import React from "react";
import { Activity, ShieldAlert, Users, FileText } from "lucide-react";

interface SummaryCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ icon: Icon, label, value }) => (
  <div className="bg-white border border-slate-50 rounded-[12px] p-4 flex flex-col gap-2 shadow-sm transition-all hover:shadow-md dark:bg-slate-900 dark:border-slate-800">
    <div className="flex items-center gap-2">
      <Icon className="size-4 text-slate-400" />
      <span className="text-[15px] font-bold text-slate-900 dark:text-white leading-none tracking-tight">{value}</span>
    </div>
    <span className="text-[12px] font-medium text-slate-400 tracking-tight leading-none">{label}</span>
  </div>
);

const timelineData = [
  { time: '00:00', count: 30},
  { time: '00:01', count: 5 },
  { time: '00:02', count: 17},
  { time: '00:03', count: 13},
  { time: '00:04', count: 21},
  { time: '00:05', count: 44},
  { time: '00:06', count: 2 },
  { time: '00:07', count: 7 },
  { time: '00:08', count: 0 },
  { time: '00:09', count: 5 },
  { time: '00:10', count: 9 },
  { time: '00:11', count: 11},
];

interface BubbleCloudProps {
  colIdx: number;
  onClick?: () => void;
}

const BubbleCloud: React.FC<BubbleCloudProps> = ({ onClick }) => {
  return (
    <div className="relative w-16 h-[140px] mt-4">
      {/* Row 1: Top Small Dots */}
      <div 
        onClick={onClick}
        className="absolute top-0 left-0 size-[6px] rounded-full bubble-3d-small animate-water cursor-pointer hover:scale-125 transition-transform" 
        style={{ animationDelay: '0.2s' }}
      />
      <div 
        onClick={onClick}
        className="absolute top-0 left-[12px] size-[6px] rounded-full bubble-3d-small animate-water cursor-pointer hover:scale-125 transition-transform" 
        style={{ animationDelay: '1.5s' }}
      />
      <div 
        onClick={onClick}
        className="absolute top-0 left-[24px] size-[6px] rounded-full bubble-3d-small animate-water cursor-pointer hover:scale-125 transition-transform" 
        style={{ animationDelay: '0.8s' }}
      />
      <div 
        onClick={onClick}
        className="absolute top-[-4px] left-[36px] size-[18px] rounded-full bg-gradient-to-br from-cyan-100/90 via-cyan-300/40 to-teal-500/20 blur-[0.5px] border border-cyan-200/60 shadow-[0_0_10px_rgba(165,243,252,0.5)] animate-water cursor-pointer hover:scale-110 transition-transform" 
        style={{ animationDelay: '2.1s' }}
      >
        <div className="absolute top-[2px] left-[3px] size-[3px] rounded-full bg-white/90 pointer-events-none" />
      </div>
      
      {/* Row 2: Smaller dots and Grey accent */}
      <div 
        onClick={onClick}
        className="absolute top-[18px] left-[4px] size-[7px] rounded-full bubble-3d-small animate-water cursor-pointer hover:scale-125 transition-transform" 
        style={{ animationDelay: '1.1s' }}
      />
      <div 
        onClick={onClick}
        className="absolute top-[20px] left-[18px] size-[7px] rounded-full bubble-3d-small animate-water cursor-pointer hover:scale-125 transition-transform" 
        style={{ animationDelay: '0.4s' }}
      />
      <div 
        onClick={onClick}
        className="absolute top-[28px] left-[26px] size-[8px] rounded-full bg-gradient-to-br from-slate-200 via-slate-400 to-slate-600 shadow-sm animate-water cursor-pointer hover:scale-125 transition-transform" 
        style={{ animationDelay: '2.5s' }}
      />
      <div 
        onClick={onClick}
        className="absolute top-[28px] left-[42px] size-[7px] rounded-full bubble-3d-small animate-water cursor-pointer hover:scale-125 transition-transform" 
        style={{ animationDelay: '1.7s' }}
      />
      <div 
        onClick={onClick}
        className="absolute top-[28px] left-[54px] size-[7px] rounded-full bubble-3d-small animate-water cursor-pointer hover:scale-125 transition-transform" 
        style={{ animationDelay: '0.9s' }}
      />
      
      {/* LARGE 3D Teal Bubbles on the left */}
      <div 
        onClick={onClick}
        className="absolute top-[40px] left-0 size-[28px] rounded-full bubble-3d-large animate-water cursor-pointer hover:scale-110 transition-transform" 
        style={{ animationDelay: '1.3s' }}
      >
        <div className="absolute top-[4px] left-[5px] size-[5px] rounded-full bg-white/70 blur-[0.2px] pointer-events-none" />
      </div>
      <div 
        onClick={onClick}
        className="absolute top-[75px] left-[2px] size-[26px] rounded-full bubble-3d-large animate-water cursor-pointer hover:scale-110 transition-transform" 
        style={{ animationDelay: '0.5s' }}
      >
        <div className="absolute top-[4px] left-[5px] size-[5px] rounded-full bg-white/70 blur-[0.2px] pointer-events-none" />
      </div>
      
      {/* Mid area tiny dots */}
      <div 
        onClick={onClick}
        className="absolute top-[52px] left-[30px] size-[6px] rounded-full bubble-3d-small animate-water cursor-pointer hover:scale-125 transition-transform" 
        style={{ animationDelay: '2.2s' }}
      />
      <div 
        onClick={onClick}
        className="absolute top-[68px] left-[32px] size-[6px] rounded-full bubble-3d-small animate-water cursor-pointer hover:scale-125 transition-transform" 
        style={{ animationDelay: '0.7s' }}
      />
      <div 
        onClick={onClick}
        className="absolute top-[55px] left-[40px] size-[6px] rounded-full bubble-3d-small animate-water cursor-pointer hover:scale-125 transition-transform" 
        style={{ animationDelay: '1.6s' }}
      />
      <div 
        onClick={onClick}
        className="absolute top-[55px] left-[52px] size-[6px] rounded-full bubble-3d-small animate-water cursor-pointer hover:scale-125 transition-transform" 
        style={{ animationDelay: '2.8s' }}
      />
      <div 
        onClick={onClick}
        className="absolute top-[81px] left-[30px] size-[8px] rounded-full bubble-3d-small animate-water cursor-pointer hover:scale-125 transition-transform" 
        style={{ animationDelay: '1.0s' }}
      />

      {/* Medium Grey Accent */}
      <div 
        onClick={onClick}
        className="absolute top-[102px] left-[26px] size-[8px] rounded-full bg-gradient-to-br from-slate-300 via-slate-500 to-slate-700 shadow-sm animate-water cursor-pointer hover:scale-125 transition-transform" 
        style={{ animationDelay: '0.3s' }}
      />

      {/* LARGE 3D Teal Bubble on the right */}
      <div 
        onClick={onClick}
        className="absolute top-[92px] left-[40px] size-[28px] rounded-full bubble-3d-large animate-water cursor-pointer hover:scale-110 transition-transform" 
        style={{ animationDelay: '2.0s' }}
      >
        <div className="absolute top-[4px] left-[5px] size-[5px] rounded-full bg-white/70 blur-[0.2px] pointer-events-none" />
      </div>

      {/* Bottom clusters */}
      <div 
        onClick={onClick}
        className="absolute bottom-[24px] left-[2px] size-[8px] rounded-full bubble-3d-small animate-water cursor-pointer hover:scale-125 transition-transform" 
        style={{ animationDelay: '1.4s' }}
      />
      <div 
        onClick={onClick}
        className="absolute bottom-[24px] left-[16px] size-[8px] rounded-full bubble-3d-small animate-water cursor-pointer hover:scale-125 transition-transform" 
        style={{ animationDelay: '0.6s' }}
      />
      <div 
        onClick={onClick}
        className="absolute bottom-[6px] left-[8px] size-[6px] rounded-full bubble-3d-small animate-water cursor-pointer hover:scale-125 transition-transform" 
        style={{ animationDelay: '2.4s' }}
      />
      <div 
        onClick={onClick}
        className="absolute bottom-[4px] left-[34px] size-[6px] rounded-full bubble-3d-small animate-water cursor-pointer hover:scale-125 transition-transform" 
        style={{ animationDelay: '1.1s' }}
      />
    </div>
  );
};

interface IncidentsTimelineProps {
  onDotClick?: () => void;
}

export const IncidentsTimeline: React.FC<IncidentsTimelineProps> = ({ onDotClick }) => {
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

        .bubble-3d-large {
          background: radial-gradient(circle at 32% 32%, #5EEAD4 0%, #14B8A6 45%, #0D9488 75%, #042F2E 100%);
          box-shadow: 
            0 4px 10px rgba(20, 184, 166, 0.35),
            inset -3px -3px 6px rgba(4, 47, 46, 0.7),
            inset 2px 2px 5px rgba(255, 255, 255, 0.7);
        }

        .bubble-3d-small {
          background: radial-gradient(circle at 30% 30%, #99F6E4 0%, #14B8A6 60%, #0F766E 100%);
          box-shadow: 
            0 2px 5px rgba(20, 184, 166, 0.25),
            inset -1px -1px 3px rgba(0, 0, 0, 0.4),
            inset 1px 1px 2px rgba(255, 255, 255, 0.8);
        }
      `}</style>

      <div className="bg-[#F9FBFF]/60 border border-slate-100 rounded-[24px] p-8 shadow-sm dark:bg-slate-900/40 dark:border-slate-800">
        <div className="flex gap-4">
          {/* Left side summary cards */}
          <div className="w-[180px] flex flex-col gap-3">
            <SummaryCard icon={Activity} label="Total events" value="75" />
            <SummaryCard icon={ShieldAlert} label="Behavior anomaly" value="75" />
            <SummaryCard icon={FileText} label="Policy violations" value="75" />
            <SummaryCard icon={Users} label="Affected users" value="75" />
          </div>

          {/* Vertical Divider */}
          <div className="w-[1px] bg-slate-100 dark:bg-slate-800 self-stretch my-2" />

          {/* Right side bubble chart */}
          <div className="flex-1 w-full overflow-hidden">
            <div className="flex justify-between items-start w-full">
              {timelineData.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center relative min-w-0">
                  <span className="text-[11px] font-bold text-slate-400 mb-6">{item.time}</span>
                  <span className="text-[16px] font-black text-slate-900 dark:text-white leading-none z-10 translate-y-[-4px]">
                    {item.count}
                  </span>
                  
                  <BubbleCloud colIdx={idx} onClick={onDotClick} />

                  {/* Vertical Divider between slots */}
                  {idx < timelineData.length - 1 && (
                    <div className="absolute top-[10px] -right-[1px] w-[1px] h-[170px] bg-slate-200/80 dark:bg-slate-800 pointer-events-none" />
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