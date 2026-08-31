import React from "react";
import { Modal } from "@/components/ui/Modal";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

export interface Provider {
  id: string;
  slug?: string;
  name: string;
  description?: string;
  baseUrl?: string;
  isActive?: boolean;
}

export interface IntegrationType {
  id: string;
  slug?: string;
  name: string;
  description?: string;
  isActive?: boolean;
  providers?: Provider[];
}

export interface AddIntegrationForm {
  integrationTypeId: string;
  providerId: string;
  apiKey: string;
}

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddIntegrationForm) => void;
  integrationTypes: IntegrationType[];
  providers: Provider[];
  onIntegrationTypeChange: (typeId: string) => void;
}

export const AddServiceModal = ({
  isOpen,
  onClose,
  onSubmit,
  integrationTypes,
  providers,
  onIntegrationTypeChange,
}: AddServiceModalProps) => {
  const [formData, setFormData] = React.useState<AddIntegrationForm>({
    integrationTypeId: "",
    providerId: "",
    apiKey: "",
  });

  const isFormValid = Boolean(
    formData.integrationTypeId && formData.providerId && formData.apiKey.trim(),
  );

  const resetForm = () => {
    setFormData({
      integrationTypeId: "",
      providerId: "",
      apiKey: "",
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      apiKey: formData.apiKey.trim(),
    });

    resetForm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add API service"
      className="dark:bg-[#1F262E]"
    >
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 mt-4">
        {/* Integration Type Select */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-slate-500">
            Integration type
          </label>
          <div className="relative">
            <select
              value={formData.integrationTypeId}
              onChange={(e) => {
                const typeId = e.target.value;

                setFormData({
                  ...formData,
                  integrationTypeId: typeId,
                  providerId: "",
                });

                onIntegrationTypeChange(typeId);
              }}
              className="w-full h-11 px-4 bg-white rounded-lg text-[14px] appearance-none focus:outline-none transition-all cursor-pointer dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            >
              <option value="">Select integration type</option>
              {integrationTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5">
            Service category
          </span>
        </div>

        {/* Service Provider Select */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-slate-500">
            Service provider
          </label>
          <div className="relative">
            <select
              disabled={!formData.integrationTypeId}
              value={formData.providerId}
              onChange={(e) =>
                setFormData({ ...formData, providerId: e.target.value })
              }
              className="w-full h-11 px-4 bg-white rounded-lg text-[14px] appearance-none focus:outline-none transition-all cursor-pointer dark:bg-slate-700 dark:border-slate-600 dark:text-white disabled:opacity-50"
            >
              <option value="">
                {!formData.integrationTypeId
                  ? "Select a type first"
                  : "Select provider"}
              </option>

              {/* Directly map providers fetched by Integrations.tsx */}
              {providers.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* API Key Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-slate-500 uppercase tracking-wider">
            API KEYs
          </label>
          <input
            disabled={!formData.providerId}
            type="text"
            placeholder={
              formData.providerId ? "Enter API Key" : "Select a provider first"
            }
            value={formData.apiKey}
            onChange={(e) =>
              setFormData({ ...formData, apiKey: e.target.value })
            }
            className="w-full h-11 px-4 bg-slate-50 border border-transparent rounded-lg text-[14px] focus:outline-none focus:bg-white transition-all dark:bg-slate-700 dark:text-slate-50 dark:focus:bg-slate-700 disabled:opacity-50"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          colorScheme={isFormValid ? "gradient" : "slate"}
          size="lg"
          fullWidth
          disabled={!isFormValid}
          className={cn(
            "h-12 mt-4 font-bold text-[14px] border-none transition-all duration-300 rounded-lg",
            !isFormValid &&
              "bg-[#E2E8F0] text-slate-400 dark:bg-[#313740] dark:text-slate-500 pointer-events-none",
          )}
        >
          Submit
        </Button>
      </form>
    </Modal>
  );
};
