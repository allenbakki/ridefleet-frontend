import React, { useState, useEffect } from "react";
import { Table, message, Modal, Button, Form, Input, DatePicker, InputNumber } from "antd";
import axios from "axios";

const columns = [
  {
    title: "Maintenance Number",
    dataIndex: "ServiceNumber",
    key: "ServiceNumber",
  },
  {
    title: "Date",
    dataIndex: "Date",
    key: "Date",
    sorter: (a, b) => new Date(a.Date) - new Date(b.Date),
    render: (date) => new Date(date).toLocaleString(),
  },
  {
    title: "Work Done",
    dataIndex: "WorkDone",
    key: "WorkDone",
  },
  {
    title: "Notes",
    dataIndex: "Notes",
    key: "Notes",
  },
  {
    title: "Future Recommendations",
    dataIndex: "FutureRecommendations",
    key: "FutureRecommendations",
  },
  {
    title: "Cost ($)",
    dataIndex: "paymentDetails",
    key: "paymentDetails",
    sorter: (a, b) => a.paymentDetails - b.paymentDetails,
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
      .get("http://localhost:8000/maintenance-history", {
        params: { vehicleNo: vehicleId },
      })
      .then((response) => {
        setMaintenanceData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching maintenance history:", error);
        message.error("Failed to fetch maintenance history.");
        setLoading(false);
      });
  }, [vehicleId]);

  // Fetch total spend
  useEffect(() => {
    axios
      .get("http://localhost:8000/total-spend", {
        params: { vehicleNo: vehicleId },
      })
      .then((response) => {
        setTotalSpend(response.data.totalSpent);
      })
      .catch((error) => {
        console.error("Error fetching total spend:", error);
        message.error("Failed to fetch total spend.");
      });
  }, [vehicleId, setTotalSpend]);

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
            label="Service Number"
            name="ServiceNumber"
            rules={[{ required: true, message: "Please enter the service number" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Date"
            name="Date"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Work Done"
            name="WorkDone"
            rules={[{ required: true, message: "Please enter the work done" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="Notes" name="Notes">
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="Future Recommendations" name="FutureRecommendations">
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Cost ($)"
            name="paymentDetails"
            rules={[{ required: true, message: "Please enter the cost" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add Vehicle
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Delete Maintenance Record"
        visible={isModalVisibleDelete}
        onCancel={() => setIsModalVisibleDelete(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleDeleteMaintenance} layout="vertical">
          <Form.Item
            label="Service Number"
            name="ServiceNumber"
            rules={[{ required: true, message: "Please enter the service number" }]}
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
