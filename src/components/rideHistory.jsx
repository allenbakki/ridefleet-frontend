import React, { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "axios";

const columns = [
  {
    title: "Ride Number",
    dataIndex: "RideNumber",
  },
  {
    title: "Top Speed (km/h)",
    dataIndex: "TopSpeed",
    sorter: (a, b) => a.TopSpeed - b.TopSpeed,
  },
  {
    title: "Date Time",
    dataIndex: "DateTime",
    sorter: (a, b) => new Date(a.DateTime) - new Date(b.DateTime),
    render: (date) => new Date(date).toLocaleString(),
  },
  {
    title: "Start Location",
    dataIndex: "LocationStart",
  },
  {
    title: "End Location",
    dataIndex: "LocationEnd",
  },
  {
    title: "Fuel Consumed (L)",
    dataIndex: "FuelConsumed",
    sorter: (a, b) => a.FuelConsumed - b.FuelConsumed,
  },
  {
    title: "Cost ($)",
    dataIndex: "paymentDetails",
  },
];

const RideHistory = ({ vehicleId, profit, setProfit }) => {
  const [rideHistory, setRideHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/ride-history?vehicleNo=${vehicleId}`)
      .then((response) => {
        const rides = response.data;
        setRideHistory(
          rides.map((item, index) => ({
            ...item,
            key: index,
          }))
        );

        // Calculate total profit
        const totalProfit = rides.reduce((acc, item) => acc + item.paymentDetails, 0);

        // Update profit state
        setProfit(totalProfit);
      })
      .catch((err) => {
        console.error("Error fetching ride history:", err.message);
        setError(err.message);
      });
  }, [vehicleId, setProfit]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ fontSize: 24, fontWeight: "bold" }}>Ride History</div>
      <Table columns={columns} dataSource={rideHistory} />
    </div>
  );
};

export default RideHistory;
