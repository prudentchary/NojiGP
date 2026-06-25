import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

type Variant = "solid" | "outline" | "ghost" | "soft" | "link";
type ColorScheme =
  | "slate"
  | "blue"
  | "emerald"
  | "rose"
  | "amber"
  | "violet"
  | "gradient";
type Size = "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  colorScheme?: ColorScheme;
  size?: Size;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  rounded?: "default" | "full" | "none";
  children: ReactNode;
}

// ─── Style Maps ───────────────────────────────────────────────────────────────

const sizeMap: Record<Size, string> = {
  xs: "h-7 px-3 text-xs gap-1.5",
  sm: "h-8 px-4 text-sm gap-2",
  md: "h-10 px-5 text-sm gap-2",
  lg: "h-11 px-6 text-base gap-2.5",
  xl: "h-13 px-8 text-lg gap-3",
};

const iconSizeMap: Record<Size, string> = {
  xs: "size-3",
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
  xl: "size-6",
};

const roundedMap: Record<"default" | "full" | "none", string> = {
  default: "rounded-lg",
  full: "rounded-full",
  none: "rounded-none",
};

const variantColorMap: Record<ColorScheme, Record<Variant, string>> = {
  gradient: {
    // ☀️ Light Mode: Forces solid slate-900 with white text
    // 🌙 Dark Mode: Forces the vertical gradient layout with dark text
    solid:
      "bg-slate-900 text-white hover:bg-slate-800 active:bg-black border border-transparent " +
      "dark:bg-[linear-gradient(to_bottom,#99FCFF_45%,#FF00C7_250%)] dark:text-slate-900 dark:hover:opacity-90",
    outline: "border border-cyan-400 text-cyan-600",
    ghost: "text-cyan-600 border border-transparent",
    soft: "bg-cyan-50 text-cyan-700",
    link: "text-cyan-600 underline",
  },
  slate: {
    solid:
      "bg-slate-900 text-white hover:bg-slate-700 active:bg-slate-800 border border-slate-900 hover:border-slate-700",
    outline:
      "border border-slate-300 text-slate-700 hover:bg-slate-50 active:bg-slate-100",
    ghost:
      "text-slate-700 hover:bg-slate-100 active:bg-slate-200 border border-transparent",
    soft: "bg-slate-100 text-slate-700 hover:bg-slate-200 active:bg-slate-300 border border-transparent",
    link: "text-slate-700 underline-offset-4 hover:underline border border-transparent p-0 h-auto",
  },
  blue: {
    solid:
      "bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700 border border-blue-600 hover:border-blue-500",
    outline:
      "border border-blue-400 text-blue-600 hover:bg-blue-50 active:bg-blue-100",
    ghost:
      "text-blue-600 hover:bg-blue-50 active:bg-blue-100 border border-transparent",
    soft: "bg-blue-50 text-blue-700 hover:bg-blue-100 active:bg-blue-200 border border-transparent",
    link: "text-blue-600 underline-offset-4 hover:underline border border-transparent p-0 h-auto",
  },
  emerald: {
    solid:
      "bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-700 border border-emerald-600",
    outline:
      "border border-emerald-400 text-emerald-600 hover:bg-emerald-50 active:bg-emerald-100",
    ghost:
      "text-emerald-600 hover:bg-emerald-50 active:bg-emerald-100 border border-transparent",
    soft: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 active:bg-emerald-200 border border-transparent",
    link: "text-emerald-600 underline-offset-4 hover:underline border border-transparent p-0 h-auto",
  },
  rose: {
    solid:
      "bg-rose-600 text-white hover:bg-rose-500 active:bg-rose-700 border border-rose-600",
    outline:
      "border border-rose-400 text-rose-600 hover:bg-rose-50 active:bg-rose-100",
    ghost:
      "text-rose-600 hover:bg-rose-50 active:bg-rose-100 border border-transparent",
    soft: "bg-rose-50 text-rose-700 hover:bg-rose-100 active:bg-rose-200 border border-transparent",
    link: "text-rose-600 underline-offset-4 hover:underline border border-transparent p-0 h-auto",
  },
  amber: {
    solid:
      "bg-amber-400 text-amber-950 hover:bg-amber-300 active:bg-amber-500 border border-amber-400",
    outline:
      "border border-amber-400 text-amber-600 hover:bg-amber-50 active:bg-amber-100",
    ghost:
      "text-amber-600 hover:bg-amber-50 active:bg-amber-100 border border-transparent",
    soft: "bg-amber-50 text-amber-700 hover:bg-amber-100 active:bg-amber-200 border border-transparent",
    link: "text-amber-600 underline-offset-4 hover:underline border border-transparent p-0 h-auto",
  },
  violet: {
    solid:
      "bg-violet-600 text-white hover:bg-violet-500 active:bg-violet-700 border border-violet-600",
    outline:
      "border border-violet-400 text-violet-600 hover:bg-violet-50 active:bg-violet-100",
    ghost:
      "text-violet-600 hover:bg-violet-50 active:bg-violet-100 border border-transparent",
    soft: "bg-violet-50 text-violet-700 hover:bg-violet-100 active:bg-violet-200 border border-transparent",
    link: "text-violet-600 underline-offset-4 hover:underline border border-transparent p-0 h-auto",
  },
};

// ─── Spinner ──────────────────────────────────────────────────────────────────

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ─── Button Component ─────────────────────────────────────────────────────────

export function Button({
  variant = "solid",
  colorScheme = "slate",
  size = "md",
  isLoading = false,
  loadingText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  rounded = "default",
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  const base = cn(
    "inline-flex items-center justify-center font-medium",
    "transition-all duration-150 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
    "select-none",
    isDisabled ? "cursor-not-allowed" : "cursor-pointer",
    "disabled:opacity-50 disabled:pointer-events-none",
    sizeMap[size],
    roundedMap[rounded],
    variantColorMap[colorScheme][variant], // Purely read map configuration arrays
    fullWidth ? "w-full" : "",
    className,
  );

  const iconClass = iconSizeMap[size];

  return (
    <button className={base} disabled={isDisabled} {...props}>
      {isLoading ? (
        <>
          <Spinner className={iconClass} />
          {loadingText ?? children}
        </>
      ) : (
        <>
          {leftIcon && <span className={iconClass}>{leftIcon}</span>}
          {children}
          {rightIcon && <span className={iconClass}>{rightIcon}</span>}
        </>
      )}
    </button>
  );
}
