import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Inward from './components/Inward';
import Parts from './components/Parts';
import Locations from './components/Locations';
import Header from './components/Header';
import PutawayForm from './components/PutawayForm';
import PicklistForm from './components/Picklist';
import { PartProvider } from './context/PartContext';
import { LocationProvider } from './context/LocationContext';
import { InwardProvider } from './context/InwardContext';
import PickingListPage from './components/PickingListPage';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext';
import ReportsPage from './components/ReportsPage';

function App() {
  return (
    <Router><AuthProvider>
      <PartProvider>
        <LocationProvider>
          <InwardProvider>
            <Header />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path='/pickings' element={<PrivateRoute><PickingListPage/></PrivateRoute>} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/inward" element={<PrivateRoute><Inward /></PrivateRoute>} />
              <Route path="/parts" element={<PrivateRoute><Parts /></PrivateRoute>} />
              <Route path="/locations" element={<PrivateRoute><Locations /></PrivateRoute>} />
              <Route path="/putaway" element={<PrivateRoute><PutawayForm /></PrivateRoute>} />
              <Route path="/picklist" element={<PrivateRoute><PicklistForm /></PrivateRoute>} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/reports" element={<PrivateRoute><ReportsPage /></PrivateRoute>} />

            </Routes>
          </InwardProvider>
        </LocationProvider>
      </PartProvider></AuthProvider>
    </Router>
  );
}

export default App;
