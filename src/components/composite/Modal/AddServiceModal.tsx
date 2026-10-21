import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { CustomAlert } from "@/components/composite/Alert";

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

export interface CreateApiServicePayload {
  tenantId: string;
  integrationType: string;
  serviceProvider: string;
  clientId?: string;
  clientSecret?: string;
  apiKey?: string;
}

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateApiServicePayload) => Promise<void>;
  integrationTypes: IntegrationType[];
  providers: Provider[];
  onIntegrationTypeChange: (typeId: string) => void;
  error?: string | null;
  onClearError?: () => void;
}

export const AddServiceModal = ({
  isOpen,
  onClose,
  onSubmit,
  integrationTypes,
  providers,
  onIntegrationTypeChange,
  error,
  onClearError,
}: AddServiceModalProps) => {
  const [formData, setFormData] = useState({
    integrationTypeId: "",
    providerId: "",
    tenantId: "",
    clientId: "",
    clientSecret: "",
    apiKey: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showClientSecret, setShowClientSecret] = useState(false);

  // Clear form and visibility state completely
  const resetForm = () => {
    setFormData({
      integrationTypeId: "",
      providerId: "",
      tenantId: "",
      clientId: "",
      clientSecret: "",
      apiKey: "",
    });
    setShowApiKey(false);
    setShowClientSecret(false);
  };

  // Security: Reset sensitive fields when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const hasValidAuth = Boolean(
    formData.apiKey.trim() ||
      (formData.clientId.trim() && formData.clientSecret.trim())
  );

  const isFormValid = Boolean(
    formData.integrationTypeId &&
      formData.providerId &&
      formData.tenantId.trim() &&
      hasValidAuth
  );

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    const selectedType = integrationTypes.find(
      (t) => t.id === formData.integrationTypeId
    );
    const selectedProvider = providers.find(
      (p) => p.id === formData.providerId
    );

    // Build payload with non-empty fields only
    const payload: CreateApiServicePayload = {
      tenantId: formData.tenantId.trim(),
      integrationType: selectedType?.name || "",
      serviceProvider: selectedProvider?.name || "",
    };

    if (formData.clientId.trim()) {
      payload.clientId = formData.clientId.trim();
    }

    if (formData.clientSecret.trim()) {
      payload.clientSecret = formData.clientSecret.trim();
    }

    if (formData.apiKey.trim()) {
      payload.apiKey = formData.apiKey.trim();
    }

    try {
      setIsSubmitting(true);
      await onSubmit(payload);
      resetForm();
      onClose();
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add API service"
      className="dark:bg-[#1F262E] max-w-2xl w-full"
    >
      <div className="max-h-[80vh] overflow-y-auto pr-1">
        {error && (
          <div className="mt-3 mb-2">
            <CustomAlert
              title="Integration failed"
              description={error}
              variant="failed"
              onClose={() => onClearError?.()}
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mt-4">
          {/* Row 1: Integration Type & Service Provider */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              id="integrationType"
              label="Integration type"
              variant="filled"
              value={formData.integrationTypeId}
              onChange={(e) => {
                const typeId = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  integrationTypeId: typeId,
                  providerId: "",
                }));
                onIntegrationTypeChange(typeId);
              }}
              containerClassName="gap-1"
            >
              <option value="">Select integration type</option>
              {integrationTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </Select>

            <Select
              id="serviceProvider"
              label="Service provider"
              variant="filled"
              disabled={!formData.integrationTypeId}
              value={formData.providerId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, providerId: e.target.value }))
              }
              containerClassName="gap-1"
            >
              <option value="">
                {!formData.integrationTypeId
                  ? "Select a type first"
                  : "Select provider"}
              </option>
              {providers.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </Select>
          </div>

          {/* Row 2: Tenant ID & API Key */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="tenantId"
              label="Tenant ID (UUID)"
              type="text"
              placeholder="Enter tenant ID"
              variant="filled"
              autoComplete="off"
              value={formData.tenantId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, tenantId: e.target.value }))
              }
              containerClassName="gap-1"
            />

            <Input
              id="apiKey"
              label="API Key"
              type={showApiKey ? "text" : "password"}
              placeholder="Enter API key"
              variant="filled"
              autoComplete="off"
              value={formData.apiKey}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, apiKey: e.target.value }))
              }
              containerClassName="gap-1"
              rightElement={
                <button
                  type="button"
                  aria-label={showApiKey ? "Hide API key" : "Show API key"}
                  onClick={() => setShowApiKey((prev) => !prev)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all duration-200 outline-none focus:ring-0 py-2"
                >
                  {showApiKey ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              }
            />
          </div>

          {/* Row 3: Client ID & Client Secret */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="clientId"
              label="Client ID"
              type="text"
              placeholder="client-ID"
              variant="filled"
              autoComplete="off"
              value={formData.clientId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, clientId: e.target.value }))
              }
              containerClassName="gap-1"
            />

            <Input
              id="clientSecret"
              label="Client Secret"
              type={showClientSecret ? "text" : "password"}
              placeholder="Enter-secret-value"
              variant="filled"
              autoComplete="new-password"
              value={formData.clientSecret}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, clientSecret: e.target.value }))
              }
              containerClassName="gap-1"
              rightElement={
                <button
                  type="button"
                  aria-label={
                    showClientSecret ? "Hide client secret" : "Show client secret"
                  }
                  onClick={() => setShowClientSecret((prev) => !prev)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all duration-200 outline-none focus:ring-0 py-2"
                >
                  {showClientSecret ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              }
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            colorScheme={isFormValid ? "gradient" : "slate"}
            size="lg"
            fullWidth
            disabled={!isFormValid || isSubmitting}
            className={cn(
              "h-12 mt-2 font-bold text-[14px] border-none transition-all duration-300 rounded-lg",
              (!isFormValid || isSubmitting) &&
                "bg-[#E2E8F0] text-slate-400 dark:bg-[#313740] dark:text-slate-500 pointer-events-none"
            )}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </Modal>
  );
};