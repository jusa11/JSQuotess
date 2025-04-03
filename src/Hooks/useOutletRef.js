import { createContext, useContext, useRef } from 'react';

const RefContext = createContext(null);

export const RefProvider = ({ children }) => {
  const outletRef = useRef([]);

  return (
    <RefContext.Provider value={outletRef}>{children}</RefContext.Provider>
  );
};

export const useOutletRef = () => useContext(RefContext);
