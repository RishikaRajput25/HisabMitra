import { createContext, useContext, useEffect, useState } from "react";
import { checkLoginStatus, logoutUser } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchUser = async () => {
  const res = await checkLoginStatus();

  if (res?.user) {
    setUser(res.user);
  
  } else {
    setUser(null);
  }

  setLoading(false);
};

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading,setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
