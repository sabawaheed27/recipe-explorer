

"use client";
import { createContext, useState, ReactNode, useEffect } from "react";
import { UserType, UserContextType } from "@/utils/types";

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  // Load last logged-in user once on mount
  useEffect(() => {
    const lastUser = localStorage.getItem("lastUser");
    if (lastUser) {
      const userData = localStorage.getItem(`user_${lastUser}`);
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (err) {
          console.error("Failed to parse user data:", err);
        }
      }
    }
  }, []);

  // Save user changes safely
  useEffect(() => {
    if (user) {
      // Save user profile
      localStorage.setItem(`user_${user.name}`, JSON.stringify(user));
      // Save last logged-in user
      localStorage.setItem("lastUser", user.name);
    } else {
      // Remove lastUser on logout
      localStorage.removeItem("lastUser");
    }
  }, [user]);

  // Logout function
  const logout = () => {
    setUser(null); // triggers effect above to remove lastUser
    localStorage.removeItem("lastUser");  // clears last logged-in user
    localStorage.removeItem("loggedInUser"); // prevents auto-login

  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
