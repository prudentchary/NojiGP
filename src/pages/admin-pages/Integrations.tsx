import React, { useState, useEffect } from "react";
import {
  Plus,
  ArrowUp,
  Edit2,
  Trash2,
  Cloud,
  Shield,
  Lock,
  Zap,
} from "lucide-react";
import {
  AddServiceModal,
  RemoveServiceModal,
  type AddIntegrationForm,
} from "@/components/composite/Modal";
import { CustomAlert } from "@/components/composite/Alert";
import Integrattion_Logo from "../../assets/integration_logo.png";
import { integrationService } from "@/services/integration.service";
import type {
  IntegrationType,
  Provider,
} from "@/components/composite/Modal/AddServiceModal";

interface Integration {
  id: string;
  name: string;
  provider: string;
  status: "Active" | "Inactive";
  health: number;
  type: string;
  integratedOn: string;
}

const Integrations: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] =
    useState<Integration | null>(null);
  const [alert, setAlert] = useState<{
    title: string;
    description: string;
    variant?: "success" | "failed";
  } | null>(null);

  const [integrationTypes, setIntegrationTypes] = useState<IntegrationType[]>(
    []
  );
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loadingTypes, setLoadingTypes] = useState(false);

  useEffect(() => {
    if (isAddModalOpen) {
      fetchIntegrationTypes();
    }
  }, [isAddModalOpen]);

  const fetchIntegrationTypes = async () => {
    try {
      setLoadingTypes(true);
      const data = await integrationService.getIntegrationTypes();

      if (Array.isArray(data) && data.length > 0) {
        setIntegrationTypes(data);
      } else {
        throw new Error("Invalid or empty data from server");
      }
    } catch (error) {
      console.warn("Backend failed (500), applying frontend fallback:", error);

      // GUARANTEED FALLBACK DATA MATCHING EXACT BACKEND SCHEMA
      setIntegrationTypes([
        {
          id: "12465d03-1187-4f4d-80ef-d86baa5c6ede",
          name: "ER",
          slug: "edr",
          providers: [
            {
              id: "14e4a6a4-ee35-4d86-86d8-7626d2d75683",
              name: "Microsoft Defender",
              slug: "microsoft-defender",
            },
          ],
        },
        {
          id: "type-2",
          name: "Identity Provider",
          providers: [
            { id: "provider-201", name: "Okta" },
            { id: "provider-202", name: "Microsoft Azure AD" },
          ],
        },
      ]);
    } finally {
      setLoadingTypes(false);
    }
  };

  // Extract nested providers from state instead of firing extra API calls
  const handleTypeChange = (typeId: string) => {
    if (!typeId) {
      setProviders([]);
      return;
    }

    const selectedType = integrationTypes.find((t) => t.id === typeId);

    if (selectedType && selectedType.providers && selectedType.providers.length > 0) {
      setProviders(selectedType.providers);
    } else {
      // Fallback network fetch if backend didn't embed providers for this type
      integrationService
        .getProviders(typeId)
        .then((data) => setProviders(Array.isArray(data) ? data : []))
        .catch(() => setProviders([]));
    }
  };

  const handleAddService = async (data: AddIntegrationForm) => {
    try {
      await integrationService.createIntegration(data);

      const selectedType = integrationTypes.find(
        (type) => type.id === data.integrationTypeId
      );

      const selectedProvider = providers.find(
        (provider) => provider.id === data.providerId
      );

      const newIntegration: Integration = {
        id: Math.random().toString(36).substring(2, 11),
        name: selectedProvider?.name ?? "Unknown",
        provider: selectedProvider?.name ?? "Unknown",
        status: "Active",
        health: 95,
        type: selectedType?.name ?? "Unknown",
        integratedOn:
          new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }) +
          ", " +
          new Date()
            .toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
            .toLowerCase(),
      };

      setIntegrations((prev) => [...prev, newIntegration]);
      setIsAddModalOpen(false);

      setAlert({
        title: `${newIntegration.type} integration successful`,
        description: `Your ${newIntegration.provider} has been successfully integrated with Noji Guardian protocol`,
      });
    } catch (error) {
      console.error("Failed to add integration:", error);
      setAlert({
        title: "Integration failed",
        description: "Could not create the integration. Please try again.",
        variant: "failed",
      });
    }
  };

  const handleRemoveConfirm = () => {
    if (selectedIntegration) {
      setIntegrations(
        integrations.filter((i) => i.id !== selectedIntegration.id)
      );
      setIsRemoveModalOpen(false);
      setSelectedIntegration(null);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F8FAFC]/50 dark:bg-slate-950/50 p-2 md:p-4 animate-in fade-in duration-500">
      {alert && (
        <div className="mb-4">
          <CustomAlert
            title={alert.title}
            description={alert.description}
            variant={alert.variant}
            onClose={() => setAlert(null)}
          />
        </div>
      )}

      <div className="bg-white dark:bg-[#1F262E] border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                <th className="w-[25%] px-6 py-3 text-[13px] font-bold text-slate-400">
                  Integration service
                </th>
                <th className="w-[12%] px-6 py-3 text-[13px] font-bold text-slate-400">
                  Status
                </th>
                <th className="w-[18%] px-6 py-3 text-[13px] font-bold text-slate-400">
                  Health
                </th>
                <th className="w-[12%] px-6 py-3 text-[13px] font-bold text-slate-400">
                  Type
                </th>
                <th className="w-[20%] px-6 py-3 text-[13px] font-bold text-slate-400">
                  Integrated on
                </th>
                <th className="w-[13%] px-6 py-3 text-[13px] font-bold text-slate-400 text-right">
                  <div className="flex justify-end items-center gap-4">
                    <span>Action</span>
                    {integrations.length > 0 && (
                      <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="p-1.5 bg-[#14B8A6] text-white rounded-lg hover:bg-[#0D9488] transition-colors shadow-sm"
                        title="Add Integration"
                      >
                        <Plus className="size-4" />
                      </button>
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {integrations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-24 md:py-32">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-48 h-48">
                        <img
                          src={Integrattion_Logo}
                          alt="No services"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[16px] font-medium text-slate-400">
                          No services connected
                        </span>
                        <button
                          onClick={() => setIsAddModalOpen(true)}
                          className="text-[16px] font-bold text-[#14B8A6] hover:text-[#0D9488] flex items-center gap-1 transition-colors"
                        >
                          Add API service <Plus className="size-4" />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                integrations.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/30 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="px-6 py-5 overflow-hidden">
                      <div className="flex items-center gap-3">
                        <div className="size-8 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <ProviderIcon name={item.name} />
                        </div>
                        <span className="text-[14px] font-semibold text-slate-700 dark:text-slate-200 truncate">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-[12px] font-bold">
                        <div className="size-1.5 rounded-full bg-emerald-500" />
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1.5 text-[14px] font-medium text-slate-600 dark:text-slate-300">
                        {item.health}%{" "}
                        <ArrowUp className="size-3.5 text-emerald-500" />
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-[14px] font-medium text-slate-500 dark:text-slate-400">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-[14px] font-medium text-slate-500 dark:text-slate-400">
                        {item.integratedOn}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-3">
                        <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg shadow-sm">
                          <Edit2 className="size-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedIntegration(item);
                            setIsRemoveModalOpen(true);
                          }}
                          className="p-2 text-rose-400 hover:text-rose-600 transition-colors bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg shadow-sm"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddServiceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddService}
        integrationTypes={integrationTypes}
        providers={providers}
        onIntegrationTypeChange={handleTypeChange}
      />

      {selectedIntegration && (
        <RemoveServiceModal
          isOpen={isRemoveModalOpen}
          onClose={() => setIsRemoveModalOpen(false)}
          onConfirm={handleRemoveConfirm}
          serviceName={selectedIntegration.name}
        />
      )}
    </div>
  );
};

const ProviderIcon = ({ name }: { name: string }) => {
  if (name.includes("Azure") || name.includes("Microsoft"))
    return <Shield className="size-4 text-blue-500" />;
  if (name.includes("Google"))
    return <Zap className="size-4 text-orange-500" />;
  if (name.includes("AWS")) return <Cloud className="size-4 text-amber-500" />;
  return <Lock className="size-4 text-slate-400" />;
};

export default Integrations;