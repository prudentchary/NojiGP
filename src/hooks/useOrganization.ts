import { useQuery } from "@tanstack/react-query";
import { organizationService } from "@/services/organization.service";

// Query keys factory for clean cache management & invalidation
export const organizationKeys = {
  all: ["organization"] as const,
  departments: () => [...organizationKeys.all, "departments"] as const,
  teams: () => [...organizationKeys.all, "teams"] as const,
  departmentTeams: (departmentId: string) => [...organizationKeys.teams(), departmentId] as const,
  users: () => [...organizationKeys.all, "users"] as const,
  departmentUsers: (departmentId: string) => [...organizationKeys.users(), departmentId] as const,
};

// Hook for fetching departments
export function useDepartments() {
  return useQuery({
    queryKey: organizationKeys.departments(),
    queryFn: organizationService.getDepartments,
  });
}

// Hook for fetching all teams
export function useAllTeams() {
  return useQuery({
    queryKey: organizationKeys.teams(),
    queryFn: organizationService.getAllTeams,
  });
}

// Hook for fetching teams scoped to a department ID
export function useDepartmentTeams(departmentId?: string) {
  return useQuery({
    queryKey: organizationKeys.departmentTeams(departmentId || ""),
    queryFn: () => organizationService.getTeamsByDepartment(departmentId!),
    enabled: Boolean(departmentId),
  });
}

// Hook for fetching all users
export function useAllUsers() {
  return useQuery({
    queryKey: organizationKeys.users(),
    queryFn: organizationService.getAllUsers,
  });
}

// Hook for fetching users scoped to a department ID
export function useDepartmentUsers(departmentId?: string) {
  return useQuery({
    queryKey: organizationKeys.departmentUsers(departmentId || ""),
    queryFn: () => organizationService.getUsersByDepartment(departmentId!),
    enabled: Boolean(departmentId),
  });
}