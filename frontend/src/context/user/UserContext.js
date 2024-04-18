import React, { createContext, useContext, useState, useEffect } from "react";
import { isAuthenticated, getSession, signout } from "../auth/auth";
import { getThisUser } from "../../api/auth";

const UserContext = createContext({ user: null, setUser: () => {} });

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      console.log("111111111111111");
      if (!isAuthenticated()) return;
      console.log("222222222222222");
      const token = getSession();
      const userData = await getThisUser(token);
      console.log("token========", token);
      if (userData) {
        setUser(userData);
      } else {
        console.log("GTFOooooooo");
        console.log(userData);
        signout();
      }
    };

    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
