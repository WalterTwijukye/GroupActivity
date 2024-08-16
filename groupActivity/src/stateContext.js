// stateContext.js
import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedOrgUnit, setSelectedOrgUnit] = useState("");
  const [groupActivities, setGroupActivities] = useState([]);
  const [sessions, setSessions] = useState([]);

  return (
    <StateContext.Provider value={{
      filteredData, setFilteredData,
      selectedOrgUnit, setSelectedOrgUnit,
      groupActivities, setGroupActivities,
      sessions, setSessions
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
