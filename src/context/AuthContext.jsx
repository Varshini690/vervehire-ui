import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);   // ⭐ ADDED

  useEffect(() => {
    const access = localStorage.getItem("accessToken");
    const refresh = localStorage.getItem("refreshToken");

    if (access && refresh) {
      setUser({ loggedIn: true });
      setToken(access);                        // ⭐ ADDED
    }
  }, []);

  const login = async (username, password) => {
    const res = await api.post("/auth/login/", { username, password });

    localStorage.setItem("accessToken", res.data.access);
    localStorage.setItem("refreshToken", res.data.refresh);

    setUser({ loggedIn: true });
    setToken(res.data.access);                // ⭐ ADDED
  };

  const register = async (username, email, password) => {
    await api.post("/auth/register/", { username, email, password });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setToken(null);                           // ⭐ ADDED
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,                                // ⭐ ADDED
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
