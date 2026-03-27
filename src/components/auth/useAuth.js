import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("userID");
    const email = localStorage.getItem("email");
    const firstName = localStorage.getItem("firstName");
    const userType = localStorage.getItem("userType");  
    return token ? { token, userID, email, firstName, userType } : null;
  });
  
  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("userID", userData.userID);
    localStorage.setItem("email", userData.email);
    localStorage.setItem("firstName", userData.firstName);
    localStorage.setItem("userType", userData.userType); 
    setUser(userData);
  };
  
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    localStorage.removeItem("email");
    localStorage.removeItem("firstName");
    localStorage.removeItem("userType");                
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
