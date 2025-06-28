export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  isAuthenticated?: boolean;
};

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (username: string, password: string) => Promise<boolean>;
}
