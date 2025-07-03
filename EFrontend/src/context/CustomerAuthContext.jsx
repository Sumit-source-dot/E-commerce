import { createContext, useContext, useState, useEffect } from "react";

const CustomerAuthContext = createContext();

export const CustomerAuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(() => {
    const storedUser = localStorage.getItem("customerData");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    localStorage.setItem("customerData", JSON.stringify(userData));
    localStorage.setItem("customerToken", userData.token);
    setCustomer(userData);
  };

  const logout = () => {
    localStorage.removeItem("customerData");
    localStorage.removeItem("customerToken");
    setCustomer(null);
  };

  return (
    <CustomerAuthContext.Provider value={{ customer, login, logout }}>
      {children}
    </CustomerAuthContext.Provider>
  );
};

export const useCustomerAuth = () => useContext(CustomerAuthContext);
