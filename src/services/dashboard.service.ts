import api from "@/lib/api";

export const dashboardService = {
  getSummary: async (timeRange: string = "24h") => {
    try {
      const response = await api.get(`/dashboard/summary`, {
        params: { timeRange },
      });
      return response.data?.data || response.data;
    } catch (error) {
      console.error("Failed to fetch dashboard summary:", error);
      throw error;
    }
  },

  getEndpointsMetrics: async (timeRange: string = "24h") => {
    try {
      const response = await api.get(`/dashboard/endpoints`, {
        params: { timeRange },
      });
      return response.data?.data || response.data;
    } catch (error) {
      console.error("Failed to fetch endpoint metrics:", error);
      throw error;
    }
  },

  getAgentsStatus: async () => {
    try {
      const response = await api.get(`/dashboard/agents/status`);
      return response.data?.data || response.data;
    } catch (error) {
      console.error("Failed to fetch agents status:", error);
      throw error;
    }
  },

  getViolations: async (timeRange: string = "24h") => {
    try {
      const response = await api.get(`/dashboard/violations`, {
        params: { timeRange },
      });
      return response.data?.data || response.data;
    } catch (error) {
      console.error("Failed to fetch policy violations:", error);
      throw error;
    }
  },
};