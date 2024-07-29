import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const InwardContext = createContext();

export const InwardProvider = ({ children }) => {
  const [inwardItems, setInwardItems] = useState([]);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    if (authToken) {
      axios.get('http://localhost:5000/api/inward-items', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then(response => setInwardItems(response.data))
        .catch(error => console.error(error));
    }
  }, [authToken]);

  const addInwardItem = (item) => {
    if (authToken) {
      axios.post('http://localhost:5000/api/inward-items', item, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then(response => setInwardItems([...inwardItems, response.data]))
        .catch(error => console.error(error));
    }
  };

  return (
    <InwardContext.Provider value={{ inwardItems, addInwardItem }}>
      {children}
    </InwardContext.Provider>
  );
};
