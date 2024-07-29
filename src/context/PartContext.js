import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const PartContext = createContext();

export const PartProvider = ({ children }) => {
  const [parts, setParts] = useState([]);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    if (authToken) {
      axios.get('http://localhost:5000/api/parts', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then(response => setParts(response.data))
        .catch(error => console.error(error));
    }
  }, [authToken]);

  const addPart = (part) => {
    if (authToken) {
      axios.post('http://localhost:5000/api/parts', part, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then(response => setParts([...parts, response.data]))
        .catch(error => console.error(error));
    }
  };

  const updatePart = (index, updatedPart) => {
    const partId = parts[index]._id;
    if (authToken) {
      axios.patch(`http://localhost:5000/api/parts/${partId}`, updatedPart, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then(response => {
          const updatedParts = [...parts];
          updatedParts[index] = response.data;
          setParts(updatedParts);
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <PartContext.Provider value={{ parts, addPart, updatePart }}>
      {children}
    </PartContext.Provider>
  );
};
