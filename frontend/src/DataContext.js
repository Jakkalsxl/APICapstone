import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [repoData, setRepoData] = useState(null);

  return (
    <DataContext.Provider value={{ userData, setUserData, repoData, setRepoData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}