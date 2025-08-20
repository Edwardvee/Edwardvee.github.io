export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
export type LoadingState = "idle" | "loading" | "success" | "error";
export interface ErrorState {
  message: string;
  code?: string;
  details?: any;
}

export interface Project {
  name: string;
  path: string;
  description: string;
  duration: string;
}

export interface ProjectsInfo {
  projects: Project[];
}
