// src/App.js
import './App.css';
import Dashboard from './components/dashboard';
import RideHistory from './components/rideHistory';
import SideBar from './components/sidebar';
import 'antd/dist/reset.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VehicleDetails from './components/VehicleDetails';
import Maintenance from './components/maintenance';
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './components/authContext';
import Login from './components/login';
import { Navigate } from 'react-router-dom';
import ListVehicle from './components/listvehicles';

function App() {
  const [vehicleId, setVehicleID] = useState(1);
  const [miles, setMiles] = useState(0);
  const [profit, setProfit] = useState(0);
  const [totalSpent, setTotalSpend] = useState(0);

  return (
    <AuthProvider>
      <Router>
        <AppRoutes 
          vehicleId={vehicleId} 
          setVehicleID={setVehicleID} 
          miles={miles} 
          setMiles={setMiles} 
          profit={profit} 
          setProfit={setProfit} 
          totalSpent={totalSpent} 
          setTotalSpend={setTotalSpend}
        />
      </Router>
    </AuthProvider>
  );
}

// AppRoutes component that manages the Routes and conditional Sidebar
const AppRoutes = ({ vehicleId, setVehicleID, miles, setMiles, profit, setProfit, totalSpent, setTotalSpend }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div style={{ display: 'flex' }}>
      {isAuthenticated && <SideBar />} {/* Show sidebar only if authenticated */}
      <div style={{ padding: 20, flex: 1 }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard
                      setVehicleID={setVehicleID}
                      vehicleId={vehicleId}
                      miles={miles}
                      setMiles={setMiles}
                      profit={profit}
                      setProfit={setProfit}
                      totalSpent={totalSpent}
                      setTotalSpend={setTotalSpend}
                    />} />}
          />
          <Route
            path="/rideHistory"
            element={<PrivateRoute element={<RideHistory vehicleId={vehicleId} setProfit={setProfit} profit={profit} />} />}
          />
          <Route
            path="/vehicle-details"
            element={<PrivateRoute element={<VehicleDetails vehicleId={vehicleId} />} />}
          />
          <Route
            path="/maintenance"
            element={<PrivateRoute element={<Maintenance vehicleId={vehicleId} setTotalSpend={setTotalSpend} totalSpent={totalSpent} />} />}
          />
          <Route
            path="/vehicle-list"
            element={<PrivateRoute element={<ListVehicle vehicleId={vehicleId} setTotalSpend={setTotalSpend} totalSpent={totalSpent} />} />}
          />
        </Routes>
      </div>
    </div>
  );
};

// PrivateRoute component for conditional rendering
const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return element;
};

export default App;
