import api from "@/lib/api";

export const integrationService = {
  getIntegrations: async () => {
    try {
      const response = await api.get("/integrations");
      return response.data?.data || response.data || [];
    } catch {
      return [];
    }
  },

  getIntegrationTypes: async () => {
    const response = await api.get("/integrations/types");
    return response.data?.data || response.data || [];
  },

  getProviders: async (typeId: string) => {
    const response = await api.get(
      `/integrations/types/${typeId}/providers`
    );
    return response.data?.data || response.data || [];
  },

  createIntegration: async (payload: Record<string, any>) => {
    const response = await api.post("/integrations/create-api-service", payload);
    return response.data?.data || response.data;
  },
};