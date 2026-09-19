
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const demoUsers = {
  customer: { id: 'u1', name: 'Rahul Sharma', email: 'customer@demo.com', role: 'customer', phone: '9876543210', avatar: 'https://picsum.photos/seed/rahul/100/100' },
  vendor: { id: 'v1', name: 'Rajesh Kumar', email: 'vendor@demo.com', role: 'vendor', avatar: 'https://picsum.photos/seed/techmart/100/100' },
  admin: { id: 'a1', name: 'Admin User', email: 'admin@demo.com', role: 'admin', avatar: 'https://picsum.photos/seed/admin/100/100' },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('bazaarhub_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('bazaarhub_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('bazaarhub_user');
    }
  }, [user]);

  const login = (role) => {
    if (demoUsers[role]) {
      setUser(demoUsers[role]);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
