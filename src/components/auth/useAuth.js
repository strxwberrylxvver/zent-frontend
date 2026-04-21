import { createContext, useContext, useState } from "react";

const USER_KEY = "auth_user";
const AuthContext = createContext(null);

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const set = (data) => { localStorage.setItem(key, JSON.stringify(data)); setValue(data); };
  const clear = () => { localStorage.removeItem(key); setValue(null); };

  return [value, set, clear];
}

export function AuthProvider({ children }) {
  const [user, setUser, clearUser] = useLocalStorage(USER_KEY, null);

  const login = (userData) => setUser(userData);
  const logout = () => clearUser();

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}