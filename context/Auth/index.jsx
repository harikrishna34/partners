import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({ user: undefined });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isStaff, setIsStaff] = useState(false);

  useEffect(() => {
    const isLogin = window.localStorage.getItem('isLogin');
    const token = window.localStorage.getItem('x-fiftyaccess-token');
    const partnerID = window.localStorage.getItem('partnerID');
    const isTrue = window.localStorage.getItem('approved');
    const isStaff = window.localStorage.getItem('isStaff');

    if (isLogin && token) {
      setUser({ isLogin, token, partnerID });
      setIsApproved(isTrue);
      setIsStaff(isStaff);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isApproved,
        isStaff,
        setUser,
        setLoading,
        setIsApproved,
        setIsStaff,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
