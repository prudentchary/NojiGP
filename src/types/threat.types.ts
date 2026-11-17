
export type ThreatSeverity = "Critical" | "High" | "Low";

export type ThreatStatus = "Untreated" | "Investigating" | "Resolved";

export interface ThreatUser {
  name: string;
  email: string;
  avatar: string;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  user: ThreatUser;
  deviceId: string;
  time: string;
  timeAgo: string;
  severity: ThreatSeverity;
  status: ThreatStatus;
  mitre: string;
  isFavorite: boolean;
}

export interface ThreatTimeSlot {
  timeSlot: string;
  incidents: Incident[];
}
