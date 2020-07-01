import React, { createContext, useState, useEffect } from "react";
import apiHandler from "../services/apiHandler";

export const AuthContext = createContext();

export default ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isloaded, setIsLoaded] = useState(false);

  useEffect(() => {
    apiHandler.isAuthenticated()
    .then((data) => {
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
    })
    .catch((error)=>{
      setUser(null);
      setIsAuthenticated(false)
      setIsLoaded(true);
    })
  }, []);
  return (
    <div>
    {!isloaded ? (
      <h1>Loading</h1>
    ) : (
      <AuthContext.Provider
        value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
        {children}
      </AuthContext.Provider>
    )}
  </div>
  );
};
