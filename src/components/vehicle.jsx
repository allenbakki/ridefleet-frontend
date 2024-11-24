import React, { useEffect, useState } from "react";
import { Select, Spin, message } from "antd";
import axios from "axios";

const VehicleSelector = ({setVehicleID,vehicleId,setMiles}) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const[miles,setmilos]=useState([])

  useEffect(() => {
    axios
      .get("http://localhost:8000/vehicle-names")
      .then((response) => {
        if (response.data.length > 0) {
          const options = response.data.map((vehicle) => ({
            value: vehicle.vehicleNumber,
            label: `${vehicle.vehicleMake} - ${vehicle.vehicleModel}`,
          }));
          const milos = response.data.map((vehicle) => ({
            value: vehicle.vehicleNumber,
            odometer:vehicle.odometer,
          }));
          setVehicles(options);
          setmilos(milos)
          const selectedVehicle = response.data.find(
            (vehicle) => vehicle.vehicleNumber === vehicleId
          );
          if (selectedVehicle) {
            setMiles(selectedVehicle.odometer);
          }
          
        } else {
          message.warning("No vehicles found.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching vehicle names:", error);
        message.error("Failed to fetch vehicle names.");
        setLoading(false);
      });
  }, [vehicleId,miles]);

  const handleChange = (value) => {
    console.log(`Selected Vehicle Number: ${value}`);
    setVehicleID(value)
    miles.forEach((val)=>{
      if (val.value===value){
        setMiles(val.odometer)
      }
    })
  };


  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Select
    value={vehicleId}
      placeholder="Select Vehicle..."
      style={{
        width: 300,
      }}
      onChange={handleChange}
      options={vehicles}
    />
  );
};

export default VehicleSelector;
