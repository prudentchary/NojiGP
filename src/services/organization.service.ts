import api from '@/lib/api'
import { Department, Team, User } from '@/types/organization';

export const organizationService = {
  // GET /organization/departments
  getDepartments: async (): Promise<Department[]> => {
    const { data } = await api.get('/organization/departments');
    return data;
  },

  // GET /organization/teams
  getAllTeams: async (): Promise<Team[]> => {
    const { data } = await api.get('/organization/teams');
    return data;
  },

  // GET /organization/departments/{departmentId}/teams
  getTeamsByDepartment: async (departmentId: string): Promise<Team[]> => {
    const { data } = await api.get(`/organization/departments/${departmentId}/teams`);
    return data;
  },

  // GET /organization/users
  getAllUsers: async (): Promise<User[]> => {
    const { data } = await api.get('/organization/users');
    return data;
  },

  // GET /organization/departments/{departmentId}/users
  getUsersByDepartment: async (departmentId: string): Promise<User[]> => {
    const { data } = await api.get(`/organization/departments/${departmentId}/users`);
    return data;
  },
};