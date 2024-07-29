import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const PutawayContext = createContext();

export const PutawayProvider = ({ children }) => {
  const [putawayItems, setPutawayItems] = useState([]);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    if (authToken) {
      axios.get('http://localhost:5000/api/putaway-items', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then(response => setPutawayItems(response.data))
        .catch(error => console.error(error));
    }
  }, [authToken]);

  return (
    <PutawayContext.Provider value={{ putawayItems }}>
      {children}
    </PutawayContext.Provider>
  );
};
