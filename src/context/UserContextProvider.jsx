import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import TokenService from "../services/token.service";
export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(getUser);
  const logIn = (user) => setUserInfo(user);
  const logOut = () => {
    setUserInfo(null);
    TokenService.removeUser();
  };
  function getUser() {
    const savedUser = TokenService.getUser() || null;
    return savedUser;
  }
  useEffect(() => {
    TokenService.setUser(userInfo);
  }, [userInfo]);
  return (
    <UserContext.Provider value={{ userInfo, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};
