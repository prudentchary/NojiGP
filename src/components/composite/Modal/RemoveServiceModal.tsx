import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button"; // Adjust path if your Button location differs
import { cn } from "@/lib/cn"; // Include if using cn() inside the file
import SpiralImage from "../../../assets/spiral-removebg-preview.png";
interface RemoveServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  serviceName: string;
}

export const RemoveServiceModal: React.FC<RemoveServiceModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  serviceName,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={true}
      className="max-w-[600px] dark:bg-[#1F262E]"
    >
      <div className="flex flex-col items-center text-center py-4">
        <div className="w-52 h-52 mb-6">
          <img
            src={SpiralImage}
            alt="Remove service"
            className="w-full h-full object-contain"
          />
        </div>

        <h3 className="text-[20px] font-bold text-slate-900 mb-2  dark:text-white">
          Remove service?
        </h3>
        <p className="text-[14px] text-slate-400 font-medium mb-8">
          Are you sure you want to remove {serviceName}?
        </p>

        <div className="flex items-center gap-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 h-12 bg-slate-50 text-slate-900 rounded-lg text-[14px] font-bold hover:bg-slate-100 transition-all"
          >
            Cancel
          </button>
          <Button
            type="button"
            onClick={onConfirm}
            colorScheme="gradient"
            size="lg"
            className={cn(
              "flex-1 h-12 font-bold tracking-widest uppercase border-none transition-all duration-300 rounded-[4px]",
            )}
          >
            Yes, remove
          </Button>
        </div>
      </div>
    </Modal>
  );
};
