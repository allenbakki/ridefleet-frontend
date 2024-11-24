import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const handleTabClick = (path) => {
    setActiveTab(path);
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: 4,
  };

  const getTabStyle = (path) => ({
    ...linkStyle,
    background: activeTab === path ? '#555' : 'transparent',
    transition: 'background 0.3s',
  });

  return (
    <div style={{
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
      width: 200,
      height: '100vh',
      borderRight: '2px solid grey',
      gap: 10,
      background: 'grey',
      color: 'white'
    }}>
      <div style={{ fontSize: "24px" }}>RideFleet</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '16px' }}>
        <Link
          to="/dashboard"
          style={getTabStyle("/dashboard")}
          onClick={() => handleTabClick("/dashboard")}
          onMouseOver={(e) => (e.target.style.background = '#777')}
          onMouseOut={(e) => (e.target.style.background = activeTab === "/dashboard" ? '#555' : 'transparent')}
        >
          Dashboard
        </Link>
        <Link
          to="/maintenance"
          style={getTabStyle("/maintenance")}
          onClick={() => handleTabClick("/maintenance")}
          onMouseOver={(e) => (e.target.style.background = '#777')}
          onMouseOut={(e) => (e.target.style.background = activeTab === "/maintenance" ? '#555' : 'transparent')}
        >
          Maintenance
        </Link>
        <Link
          to="/ridehistory"
          style={getTabStyle("/ridehistory")}
          onClick={() => handleTabClick("/ridehistory")}
          onMouseOver={(e) => (e.target.style.background = '#777')}
          onMouseOut={(e) => (e.target.style.background = activeTab === "/ridehistory" ? '#555' : 'transparent')}
        >
          Ride History
        </Link>
        <Link
          to="/vehicle-details"
          style={getTabStyle("/vehicle-details")}
          onClick={() => handleTabClick("/vehicle-details")}
          onMouseOver={(e) => (e.target.style.background = '#777')}
          onMouseOut={(e) => (e.target.style.background = activeTab === "/vehicle-details" ? '#555' : 'transparent')}
        >
          Vehicle Details
        </Link>
        <Link
          to="/vehicle-list"
          style={getTabStyle("/vehicle-list")}
          onClick={() => handleTabClick("/vehicle-list")}
          onMouseOver={(e) => (e.target.style.background = '#777')}
          onMouseOut={(e) => (e.target.style.background = activeTab === "/vehicle-list" ? '#555' : 'transparent')}
        >
          Vehicle List
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
