// types/organization.ts

export interface Department {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  staffCount?: number;
  avgRiskScore?: number;
  trend?: "up" | "down";
}

export interface Team {
  id: string;
  name: string;
  departmentId?: string;
  memberCount?: number;
}

// Core user model from backend API
// types/organization.ts

export interface Department {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  staffCount?: number;
  avgRiskScore?: number;
  trend?: "up" | "down";
}

export interface Team {
  id: string;
  name: string;
  departmentId?: string;
  memberCount?: number;
}

// User model returned from the backend API
export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  name?: string; // Some endpoints return full name directly
  email: string;
  role: string;
  department?: string;
  departmentId?: string;
  riskLevel?: "Low" | "Med" | "High";
  riskScore?: number;
  scrs?: number;
  incidents?: number;
  lastActive?: string;
  avatar?: string;
}

// Staff model mapped directly for the Department Members table
export interface Staff {
  id: string;
  name: string;
  role: string;
  department: string;
  riskLevel: "Low" | "Med" | "High";
  scrs: number;
  incidents: number;
  lastActive: string;
  avatar?: string;
}

// Department member / Staff view model (used in table rendering)
export interface Staff {
  id: string;
  name: string;
  role: string;
  department: string;
  riskLevel: "Low" | "Med" | "High";
  scrs: number;
  incidents: number;
  lastActive: string;
  avatar?: string;
  email?: string;
}