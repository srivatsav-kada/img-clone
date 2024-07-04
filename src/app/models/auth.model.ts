// src/app/models/auth.model.ts
export interface AuthState {
    username: string | null;
    isAuthenticated: boolean;
    error: string | null;
  }
  