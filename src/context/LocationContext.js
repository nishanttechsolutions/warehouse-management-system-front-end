import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    if (authToken) {
      axios.get('http://localhost:5000/api/locations', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then(response => setLocations(response.data))
        .catch(error => console.error(error));
    }
  }, [authToken]);

  const addLocation = (location) => {
    if (authToken) {
      axios.post('http://localhost:5000/api/locations', location, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then(response => setLocations([...locations, response.data]))
        .catch(error => console.error(error));
    }
  };

  const updateLocation = (index, updatedLocation) => {
    const locationId = locations[index]._id;
    if (authToken) {
      axios.patch(`http://localhost:5000/api/locations/${locationId}`, updatedLocation, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then(response => {
          const updatedLocations = [...locations];
          updatedLocations[index] = response.data;
          setLocations(updatedLocations);
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <LocationContext.Provider value={{ locations, addLocation, updateLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
