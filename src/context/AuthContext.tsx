import { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../lib/supabase";

type AuthProviderProps = {
  children: React.ReactNode;
};

type User = {
  id: string;
  username: string;
  email: string;
  isAuthenticated?: boolean;
};

type AuthContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>({
    id: "",
    username: "",
    email: "",
    isAuthenticated: false,
  });

  const logout = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error("Error fetching session:", error);
        return;
      }
      const sessionData = data.session;
      if (sessionData?.user) {
        setUser({
          id: sessionData.user.id,
          username: sessionData.user.user_metadata.username || "",
          email: sessionData.user.email || "",
          isAuthenticated: true,
        });
      } else {
        setUser({
          id: "",
          username: "",
          email: "",
          isAuthenticated: false,
        });
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const newUser = session.user;
        setUser({
          id: newUser.id,
          username: newUser.email?.split("@")[0] || "",
          email: newUser.email || "",
          isAuthenticated: true,
        });
      } else {
        setUser({
          id: "",
          username: "",
          email: "",
          isAuthenticated: false,
        });
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
