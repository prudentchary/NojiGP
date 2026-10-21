import React, { SelectHTMLAttributes, ReactNode, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { ChevronDown } from "lucide-react";

type Variant = "outline" | "filled" | "flushed" | "unstyled" | "error";
type ColorScheme = "slate" | "blue" | "emerald" | "rose" | "amber" | "violet";
type Size = "sm" | "md" | "lg";

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  variant?: Variant;
  colorScheme?: ColorScheme;
  size?: Size;
  label?: string;
  error?: string;
  helperText?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  containerClassName?: string;
}

const sizeMap: Record<
  Size,
  { container: string; select: string; element: string }
> = {
  sm: { container: "h-10", select: "px-3 text-sm", element: "px-2.5" },
  md: { container: "h-12", select: "px-4 text-[15px]", element: "px-3" },
  lg: { container: "h-14", select: "px-4 text-lg", element: "px-3.5" },
};

const variantClasses: Record<Variant, string> = {
  outline:
    "border border-[rgba(138,143,148,1)] bg-white focus-within:border-transparent focus-within:ring-0",
  filled:
    "border border-transparent bg-slate-100 hover:bg-slate-200/70 focus-within:bg-slate-200/70 dark:bg-[#0B0F14] dark:border-slate-800 dark:text-slate-100 dark:hover:bg-[#0B0F14] dark:hover:border-slate-400 focus-within:bg-slate-[#0B0F14] focus-within:border-transparent dark:focus-within:border-transparent focus-within:ring-0",
  flushed:
    "border-b border-slate-200 bg-transparent rounded-none px-0 focus-within:border-slate-500 focus-within:ring-0",
  unstyled: "border-none bg-transparent p-0 focus-within:ring-0",
  error:
    "border border-red-500 bg-slate-100 dark:bg-[#0B0F14] text-red-500 dark:text-red-400 focus-within:ring-0 focus-within:border-red-500",
};

const colorSchemeMap: Record<ColorScheme, string> = {
  slate: "focus-within:ring-slate-500 text-slate-900 border-slate-500",
  blue: "focus-within:ring-blue-500 text-blue-900 border-blue-500",
  emerald: "focus-within:ring-emerald-500 text-emerald-900 border-emerald-500",
  rose: "focus-within:ring-rose-500 text-rose-900 border-rose-500",
  amber: "focus-within:ring-amber-500 text-amber-900 border-amber-500",
  violet: "focus-within:ring-violet-500 text-violet-900 border-violet-500",
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      variant = "filled",
      colorScheme = "slate",
      size = "md",
      label,
      error,
      helperText,
      leftElement,
      rightElement,
      containerClassName = "",
      className = "",
      id,
      children,
      ...props
    },
    ref
  ) => {
    const isInvalid = !!error;
    const sizeConfig = sizeMap[size];

    return (
      <div className={cn("w-full flex flex-col gap-1.5", containerClassName)}>
        {/* Label Text */}
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "text-[13px] font-medium ml-0.5 transition-colors duration-200",
              isInvalid
                ? "text-red-500 dark:text-red-500"
                : "text-slate-700 dark:text-slate-100"
            )}
          >
            {label}
          </label>
        )}

        {/* Select Container */}
        <div
          className={cn(
            "relative flex items-center transition-all duration-200 rounded-lg group",
            variantClasses[variant as Variant],
            colorSchemeMap[colorScheme as ColorScheme],
            isInvalid
              ? "border-red-500 dark:border-red-500 focus-within:border-red-500 focus-within:ring-0 ring-0"
              : "",
            sizeConfig.container
          )}
        >
          {leftElement && (
            <div className="flex items-center justify-center pl-3 text-slate-400 group-focus-within:text-slate-600 h-full pointer-events-none">
              {leftElement}
            </div>
          )}

          <select
            ref={ref}
            id={id}
            className={cn(
              "flex-1 h-full bg-transparent outline-none appearance-none cursor-pointer dark:text-slate-100 dark:[&>option]:bg-[#0B0F14] dark:[&>option]:text-slate-100 [&>option]:bg-white [&>option]:text-slate-900",
              variant === "flushed"
                ? "px-0"
                : leftElement
                ? "pl-2"
                : sizeConfig.select,
              "pr-10", // Space for dropdown chevron
              className
            )}
            {...props}
          >
            {children}
          </select>

          {/* Chevron Dropdown Arrow */}
          <div className="absolute right-3.5 flex items-center justify-center text-slate-400 pointer-events-none">
            {rightElement || <ChevronDown className="size-4" />}
          </div>
        </div>

        {/* Error or Helper Text */}
        {(error || helperText) && (
          <p
            className={cn(
              "text-[11px] font-medium mt-0.5 ml-0.5 transition-colors duration-200",
              isInvalid
                ? "text-red-500 dark:text-red-500"
                : "text-slate-500 dark:text-slate-400"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";