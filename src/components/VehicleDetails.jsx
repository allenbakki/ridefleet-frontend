import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spin, message } from "antd";

const VehicleDetails = ({vehicleId}) => {
  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/vehicle-details", { params: { vehicleNo: vehicleId } }) 
      .then((response) => {
        if (response.data.length > 0) {
          const vehicle = response.data[0];
          setVehicleData({
            "Vehicle Number": vehicle.VehicleNumber,
            "Vehicle Year": vehicle.VehicleYear,
            "Vehicle Make": vehicle.VehicleMake,
            "Vehicle Model": vehicle.VehicleModel,
            "Vehicle Type": vehicle.PrivateCommercial,
            "Vehicle Condition": vehicle.VehicleCondition,
            RPM: vehicle.RPM,
            Temperature: `${vehicle.Temperature}°C`,
            "Oil Temperature": `${vehicle.OilTemperature}°C`,
            Speed: `${vehicle.Speed} km/h`,
            Odometer: `${vehicle.Odometer} miles`,
          });
        } else {
          message.warning("No vehicle details found.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching vehicle details:", error);
        message.error("Failed to fetch vehicle details.");
        setLoading(false);
      });
  }, [vehicleId]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!vehicleData) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <h2>No Vehicle Details Found</h2>
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: "bold" }}>Vehicle Details</div>
      <div
        style={{
          marginTop: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 600,
            border: "1px solid black",
            padding: 40,
            borderRadius: 8,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {Object.entries(vehicleData).map(([key, value]) => (
            <div
              key={key}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <div>{key}</div>
              <div>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
