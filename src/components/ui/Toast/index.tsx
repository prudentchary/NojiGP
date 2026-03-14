import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleX } from "lucide-react";
import { cn } from "@/lib/cn";

// --- Types ---

type ToastVariant = "success" | "error";
type ToastPosition =
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";

interface Toast {
    id: string;
    message: string;
    variant: ToastVariant;
    duration?: number;
}

interface ToastOptions {
    variant?: ToastVariant;
    duration?: number;
}

interface ToastContextType {
    toast: (message: string, options?: ToastOptions) => void;
    success: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// --- Component ---

interface ToastProviderProps {
    children: ReactNode;
    position?: ToastPosition;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
    children,
    position = "top-right"
}) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const addToast = useCallback((message: string, options?: ToastOptions) => {
        const id = Math.random().toString(36).substring(2, 9);
        const variant = options?.variant || "success";
        const duration = options?.duration || 5000;

        const newToast: Toast = { id, message, variant, duration };
        setToasts((prev) => [...prev, newToast]);

        if (duration !== Infinity) {
            setTimeout(() => removeToast(id), duration);
        }
    }, [removeToast]);

    const success = useCallback((message: string, duration?: number) => {
        addToast(message, { variant: "success", duration });
    }, [addToast]);

    const error = useCallback((message: string, duration?: number) => {
        addToast(message, { variant: "error", duration });
    }, [addToast]);

    // Position logic
    const positionClasses: Record<ToastPosition, string> = {
        "top-left": "top-6 left-6 flex-col",
        "top-right": "top-6 right-6 flex-col items-end",
        "top-center": "top-6 left-1/2 -translate-x-1/2 flex-col items-center",
        "bottom-left": "bottom-6 left-6 flex-col-reverse",
        "bottom-right": "bottom-6 right-6 flex-col-reverse items-end",
        "bottom-center": "bottom-6 left-1/2 -translate-x-1/2 flex-col-reverse items-center",
    };

    return (
        <ToastContext.Provider value={{ toast: addToast, success, error }}>
            {children}
            <div className={cn("fixed z-[9999] flex gap-3 pointer-events-none", positionClasses[position])}>
                <AnimatePresence>
                    {toasts.map((t) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: position.includes("top") ? -20 : 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            className="pointer-events-auto group"
                        >
                            <div
                                className={cn(
                                    "relative min-w-[320px] max-w-md bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-t-[14px] overflow-hidden border-b-4",
                                    t.variant === "success" ? "border-emerald-600" : "border-rose-500"
                                )}
                            >
                                <div className="flex items-center justify-between p-5 pr-4">
                                    <p className={cn(
                                        "text-[15px] font-medium leading-tight",
                                        t.variant === "success" ? "text-emerald-700" : "text-rose-500"
                                    )}>
                                        {t.message}
                                    </p>
                                    <button
                                        onClick={() => removeToast(t.id)}
                                        className="ml-4 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        <CircleX className="size-6 cursor-pointer" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

// --- Hook ---

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
