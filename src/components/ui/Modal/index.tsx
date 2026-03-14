import React, { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { AnimatePresence, motion } from "framer-motion";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    showCloseButton?: boolean;
    className?: string;
    overlayClassName?: string;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    showCloseButton = true,
    className,
    overlayClassName,
}) => {
    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <AnimatePresence>
                {isOpen && (
                    <Dialog.Portal forceMount>
                        <Dialog.Overlay asChild>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className={cn(
                                    "fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] cursor-pointer",
                                    overlayClassName
                                )}
                            />
                        </Dialog.Overlay>
                        <Dialog.Content asChild>
                            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                    transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
                                    className={cn(
                                        "relative w-full max-w-[540px] bg-white rounded-[10px] shadow-2xl p-8 pointer-events-auto overflow-hidden",
                                        className
                                    )}
                                >
                                    {showCloseButton && (
                                        <Dialog.Close asChild>
                                            <button
                                                className="absolute top-6 right-6 p-1 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                                                aria-label="Close"
                                            >
                                                <X className="size-6" />
                                            </button>
                                        </Dialog.Close>
                                    )}

                                    <Dialog.Title className={cn(
                                        "text-xl font-bold text-slate-900 mb-4 pr-10",
                                        !title && "sr-only"
                                    )}>
                                        {title || "Modal Dialog"}
                                    </Dialog.Title>

                                    <Dialog.Description className="sr-only">
                                        Modal dialog content
                                    </Dialog.Description>

                                    <div className="flex flex-col items-center">
                                        {children}
                                    </div>
                                </motion.div>
                            </div>
                        </Dialog.Content>
                    </Dialog.Portal>
                )}
            </AnimatePresence>
        </Dialog.Root>
    );
};
