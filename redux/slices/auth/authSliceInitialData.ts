export interface IUser {
  name: string;
  email: string;
}

export interface AuthState {
  user: IUser;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

export const AuthInitialState: AuthState = {
  isAuthenticated: false,
  token: null,
  refreshToken: null,
  user: {
    name: "",
    email: "",
  },
};
