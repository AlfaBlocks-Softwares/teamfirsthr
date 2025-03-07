export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

export const AuthInitialState: AuthState = {
  isAuthenticated: false,
  token: null,
  refreshToken: null,
};
