import React from 'react';
import { Link } from 'react-router-dom';
import Maintenance from "./maintenance";
import RideHistory from "./rideHistory";
import VehicleDropDown from "./vehicle";

const Dashboard = ({setVehicleID,vehicleId,miles,profit,setMiles,setProfit,setTotalSpend,totalSpent}) => {
  return (
    <div style={{ padding: 10, width: '100%', display: 'flex', flexDirection: 'column', gap: 25 }}>
      <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-around' }}>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ background: 'grey', padding: 10, borderRadius: 8, color: "white", fontSize: 16, display: 'flex', flexDirection: 'column', width: 150 }}>
            <div>Total Spent</div>
            <div style={{ fontSize: 24 }}>${totalSpent}</div>
          </div>
          <div style={{ background: 'grey', padding: 10, borderRadius: 8, color: "white", fontSize: 16, display: 'flex', flexDirection: 'column', width: 150 }}>
            <div>Profit</div>
            <div style={{ fontSize: 24 }}>${profit}</div>
          </div>
          <div style={{ background: 'grey', padding: 10, borderRadius: 8, color: "white", fontSize: 16, display: 'flex', flexDirection: 'column', width: 150 }}>
            <div>Miles</div>
            <div style={{ fontSize: 24 }}>{miles}</div>
          </div>
        </div>
        <VehicleDropDown setVehicleID={setVehicleID} vehicleId={vehicleId} setMiles={setMiles}/>
      </div>

      <div style={{ border: '1px solid black', padding: 12, borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ height: 300, overflow: "hidden" }}>
          <RideHistory  vehicleId={vehicleId} profit={profit} setProfit={setProfit}/>
        </div>
        <Link to="/ridehistory" style={{ color: '#00cccc', cursor: 'pointer', textDecoration: 'none' }}>view more ...</Link>
      </div>

      <div style={{ border: '1px solid black', padding: 12, borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ height: 300, overflow: "hidden" }}>
          <Maintenance vehicleId={vehicleId} setTotalSpend={setTotalSpend} totalSpent={totalSpent}/>
        </div>
        <Link to="/maintenance" style={{ color: '#00cccc', cursor: 'pointer', textDecoration: 'none' }}>view more ...</Link>
      </div>
    </div>
  );
};

export default Dashboard;
