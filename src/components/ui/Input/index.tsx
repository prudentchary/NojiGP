import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "outline" | "filled" | "flushed" | "unstyled";
type ColorScheme = "slate" | "blue" | "emerald" | "rose" | "amber" | "violet";
type Size = "sm" | "md" | "lg";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
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

const sizeMap: Record<Size, { container: string; input: string; element: string }> = {
    sm: {
        container: "h-10",
        input: "px-3 text-sm",
        element: "px-2.5",
    },
    md: {
        container: "h-12",
        input: "px-4 text-[15px]",
        element: "px-3",
    },
    lg: {
        container: "h-14",
        input: "px-4 text-lg",
        element: "px-3.5",
    },
};

const variantClasses: Record<Variant, string> = {
    outline: "border border-[rgba(138,143,148,1)] bg-white focus-within:border-transparent focus-within:ring-0",
    filled: "border bg-slate-100 hover:bg-slate-200/70 focus-within:bg-white focus-within:border-transparent focus-within:ring-1",
    flushed: "border-b border-slate-200 bg-transparent rounded-none px-0 focus-within:border-slate-500 focus-within:ring-0",
    unstyled: "border-none bg-transparent p-0 focus-within:ring-0",
};

const colorSchemeMap: Record<ColorScheme, string> = {
    slate: "focus-within:ring-slate-500 text-slate-900 border-slate-500",
    blue: "focus-within:ring-blue-500 text-blue-900 border-blue-500",
    emerald: "focus-within:ring-emerald-500 text-emerald-900 border-emerald-500",
    rose: "focus-within:ring-rose-500 text-rose-900 border-rose-500",
    amber: "focus-within:ring-amber-500 text-amber-900 border-amber-500",
    violet: "focus-within:ring-violet-500 text-violet-900 border-violet-500",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            variant = "outline",
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
            ...props
        },
        ref
    ) => {
        const isInvalid = !!error;
        const sizeConfig = sizeMap[size];

        return (
            <div className={cn("w-full flex flex-col gap-1.5", containerClassName)}>
                {label && (
                    <label
                        htmlFor={id}
                        className={cn(
                            "text-[13px] font-medium ml-0.5 transition-colors duration-200",
                            isInvalid ? "text-rose-500" : "text-slate-700"
                        )}
                    >
                        {label}
                    </label>
                )}

                <div
                    className={cn(
                        "relative flex items-center transition-all duration-200 rounded-lg group",
                        variantClasses[variant],
                        colorSchemeMap[colorScheme],
                        isInvalid ? "border-rose-500 focus-within:ring-0 ring-0" : "",
                        sizeConfig.container
                    )}
                >
                    {leftElement && (
                        <div className="flex items-center justify-center pl-3 text-slate-400 group-focus-within:text-slate-600 h-full pointer-events-none">
                            {leftElement}
                        </div>
                    )}

                    <input
                        ref={ref}
                        id={id}
                        className={cn(
                            "flex-1 h-full bg-transparent outline-none appearance-none placeholder:text-slate-400",
                            variant === "flushed" ? "px-0" : leftElement ? "pl-2" : sizeConfig.input,
                            rightElement ? "pr-2" : variant === "flushed" ? "px-0" : sizeConfig.input,
                            className
                        )}
                        {...props}
                    />

                    {rightElement && (
                        <div className="flex items-center justify-center pr-3 text-slate-400 group-focus-within:text-slate-900 h-full">
                            {rightElement}
                        </div>
                    )}
                </div>

                {error ? (
                    <p className="text-[11px] font-medium text-rose-500 mt-0.5 ml-0.5">{error}</p>
                ) : helperText ? (
                    <p className={cn(
                        "text-[11px] mt-0.5 ml-0.5 transition-colors duration-200",
                        isInvalid ? "text-rose-500" : "text-slate-500"
                    )}>{helperText}</p>
                ) : null}
            </div>
        );
    }
);

Input.displayName = "Input";
