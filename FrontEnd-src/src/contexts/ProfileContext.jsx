import { createContext } from "react";

export const ProfileContext = createContext(null);
export const ProfileProvider = ({ children }) => {
  const value = {};

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
