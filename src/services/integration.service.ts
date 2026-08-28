// import api from "@/lib/api";

// export const integrationService = {
//   // Fetch all integration types
//   getIntegrationTypes: async () => {
//     const response = await api.get("/integrations/types");
//     return response.data;
//   },

//   // Fetch providers for a type
//   getProviders: async (typeId: string) => {
//     const response = await api.get(
//       `/integrations/types/${typeId}/providers`
//     );
//     return response.data;
//   },

//   // Create an integration
//   createIntegration: async (payload: {
//     integrationTypeId: string;
//     providerId: string;
//     apiKey: string;
//   }) => {
//     const response = await api.post("/integrations", payload);
//     return response.data;
//   },
// };
import api from "@/lib/api";

export const integrationService = {

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


  createIntegration: async (payload: {
    integrationTypeId: string;
    providerId: string;
    apiKey: string;
  }) => {
    const response = await api.post("/integrations", payload);
    return response.data?.data || response.data;
  },
};