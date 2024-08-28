// context/UserContext.js
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  //   const user = getUserFromLocalStorage();
  //   const userData = localStorage.getItem("user");
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });

  //   const user = localStorage.getItem('user');
  //   const user = userData ? JSON.parse(userData) : null;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
