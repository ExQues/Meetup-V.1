// Tipos globais da aplicação

export interface FormData {
  nome: string;
  email: string;
  telefone: string;
  discord: string;
}

export interface Submission {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  discord: string;
  ip_address?: string | null;
  user_agent?: string | null;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  total: number;
  today: number;
  thisWeek: number;
  lastSubmission: Submission | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export type SubmissionStatus = "idle" | "loading" | "success" | "error";

export interface AdminUser {
  id: string;
  username: string;
  password: string;
  created_at: string;
}