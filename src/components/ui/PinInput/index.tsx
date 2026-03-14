import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/cn";

interface PinInputProps {
    length?: number;
    onComplete?: (value: string) => void;
    onChange?: (value: string) => void;
    className?: string;
    inputClassName?: string;
    mask?: boolean;
    error?: boolean | string | null;
    value?: string;
}

export const PinInput: React.FC<PinInputProps> = ({
    length = 6,
    onComplete,
    onChange,
    className,
    inputClassName,
    mask = true,
    error,
    value: externalValue,
}) => {
    const isInvalid = !!error;
    const [values, setValues] = useState<string[]>(Array(length).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (externalValue !== undefined) {
            const newValues = Array(length).fill("");
            for (let i = 0; i < Math.min(externalValue.length, length); i++) {
                newValues[i] = externalValue[i];
            }
            setValues(newValues);
        }
    }, [externalValue, length]);

    const handleChange = (index: number, value: string) => {
        // Only allow digits
        const newValue = value.replace(/[^0-9]/g, "").slice(-1);

        const newValues = [...values];
        newValues[index] = newValue;
        setValues(newValues);

        const combinedValue = newValues.join("");
        onChange?.(combinedValue);

        if (newValue && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        if (newValues.every((v) => v !== "") && newValues.join("").length === length) {
            onComplete?.(combinedValue);
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !values[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleFocus = (index: number) => {
        inputRefs.current[index]?.select();
    };

    return (
        <div className={cn("flex items-center gap-2", className)}>
            {values.map((value, index) => (
                <input
                    key={index}
                    ref={(el) => {
                        inputRefs.current[index] = el;
                    }}
                    type={mask ? "password" : "text"}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onFocus={() => handleFocus(index)}
                    className={cn(
                        "w-12 h-14 text-center text-xl font-bold bg-white border rounded-lg transition-all duration-200",
                        "focus:outline-none focus:ring-0 focus:border-transparent",
                        isInvalid
                            ? "border-rose-500 text-rose-500 focus:ring-0"
                            : "border-[rgba(138,143,148,1)] text-slate-800",
                        "selection:bg-transparent",
                        inputClassName
                    )}
                />
            ))}
        </div>
    );
};
