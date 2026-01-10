export interface AuthFormState {
  loading: boolean;
  error: string | null;
  name?: string | null;
  email?: string | null;
  password?: string | null;
}

export interface GlobalState {
  isAuthenticated: boolean;
  login: AuthFormState;
  signup: AuthFormState;
}
