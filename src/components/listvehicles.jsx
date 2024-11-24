import React, { useState, useEffect } from "react";
import { Table, message, Modal, Button, Form, Input, DatePicker, InputNumber } from "antd";
import axios from "axios";

const columns = [
  {
    title: "Vehicle Number",
    dataIndex: "VehicleNumber",
    key: "VehicleNumber",
  },
  {
    title: "Vehicle Model",
    dataIndex: "VehicleModel",
    key: "VehicleModel",
   
  },
  {
    title: "Vehicle Type",
    dataIndex: "VehicleType",
    key: "VehicleType",
  },
  {
    title: "Vehicle Year",
    dataIndex: "VehicleYear",
    key: "VehicleYear",
  },
  {
    title: "Vehicle Make",
    dataIndex: "VehicleMake",
    key: "VehicleMake",
  },
  {
    title: "Vehicle Condition",
    dataIndex: "VehicleCondition",
    key: "VehicleCondition",
  },
  {
    title: "Temperature",
    dataIndex: "Temperature",
    key: "Temperature",
  }, {
    title: "Speed",
    dataIndex: "Speed",
    key: "Speed",
  }, {
    title: "RPM",
    dataIndex: "RPM",
    key: "RPM",
  },
  {
    title: "Type",
    dataIndex: "PrivateCommercial",
    key: "PrivateCommercial",
  },{
    title: "Oil Temperature",
    dataIndex: "OilTemperature",
    key: "OilTemperature",
  },
  {
    title: "Odometer (miles)",
    dataIndex: "Odometer",
    key: "Odometer",
  },
];

const ListVehicle = ({ vehicleId, setTotalSpend, totalSpent }) => {
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleDelete, setIsModalVisibleDelete] = useState(false);

  const [form] = Form.useForm();

  // Fetch maintenance data
  useEffect(() => {
    axios
      .get("http://localhost:8000/vehicles-list", {
      })
      .then((response) => {
        console.log(response)
        setMaintenanceData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching maintenance history:", error);
        message.error("Failed to fetch maintenance history.");
        setLoading(false);
      });
  }, []);

  

  // Show modal to add new maintenance
  const showAddMaintenanceModal = () => {
    setIsModalVisible(true);
  };

  // Show modal to delete maintenance
  const showDeleteMaintenanceModal = () => {
    setIsModalVisibleDelete(true);
  };

  const handleAddMaintenance = (values) => {
    axios
      .post("http://localhost:8000/vehicle-list", {
        vehicleNo: vehicleId,
        ...values,
      })
      .then((response) => {
        setMaintenanceData((prevData) => [...prevData, response.data]);
        message.success("Maintenance record added successfully!");
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((error) => {
        console.error("Error adding maintenance:", error);
        message.error("Failed to add maintenance record.");
      });
  };

  const handleDeleteMaintenance = async (values) => {
    try {
      const response = await axios.post("http://localhost:8000/delete-maintenance", {
        vehicleNo: vehicleId,
        ServiceNumber: values.ServiceNumber,
      });
  
      if (response.status === 200) {
        setMaintenanceData((prevData) =>
          prevData.filter((item) => item.ServiceNumber !== values.ServiceNumber)
        );
  
        message.success("Maintenance record deleted successfully!");
  
        setIsModalVisibleDelete(false);
  
        form.resetFields();
      } else {
        message.error("Failed to delete maintenance record.");
      }
    } catch (error) {
      console.error("Error deleting maintenance:", error);
      message.error("Failed to delete maintenance record.");
    }
  };
  

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ fontSize: 24, fontWeight: "bold" }}>Vehicle List</div>

      <Button style={{ background: "grey", color: "white" }} onClick={showAddMaintenanceModal}>
        Add Vehicle
      </Button>
      <Button style={{ background: "grey", color: "white" }} onClick={showDeleteMaintenanceModal}>
        Delete Vehicle
      </Button>

      <Table
        columns={columns}
        dataSource={maintenanceData.map((item, index) => ({
          key: index,
          ...item,
        }))}
        loading={loading}
        onChange={(pagination, filters, sorter, extra) => {
          console.log("Table params:", pagination, filters, sorter, extra);
        }}
      />

      <Modal
        title="Add Maintenance Record"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddMaintenance} layout="vertical">
          <Form.Item
            label="Vehicle Model"
            name="VehicleModel"
            rules={[{ required: true, message: "Please enter the service number" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Vehicle Type"
            name="VehicleType"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <Input.TextArea />
            </Form.Item>

          <Form.Item
            label="Vehicle Year"
            name="VehicleYear"
            rules={[{ required: true, message: "Please enter the work done" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Vehicle Make"
            name="VehicleMake"
            rules={[{ required: true, message: "Please enter the work done" }]}
          >
            <Input.TextArea />
          </Form.Item>


          

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add Vehicle
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Delete Vehicle Record"
        visible={isModalVisibleDelete}
        onCancel={() => setIsModalVisibleDelete(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleDeleteMaintenance} layout="vertical">
          <Form.Item
            label="VehicleNumber"
            name="Vehicle Number"
            rules={[{ required: true, message: "Please enter the Vehicle number" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Delete Vehicle
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ListVehicle;
