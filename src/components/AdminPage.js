import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal } from 'antd';

const AdminPage = () => {
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Fetch employee details when the component mounts
    axios.get('http://localhost:5000/admin/employee-details')
      .then(response => {
        if (response.data.status === 'success') {
          setEmployeeDetails(response.data.employees);
        } else {
          console.error('Failed to fetch employee details:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error during API request:', error);
      });
  }, []);

  const viewEmployeeDetails = (employee) => {
    setSelectedEmployee(employee);
    setVisible(true);
  };

  const columns = [
    {
      title: 'Employee ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'User Image',
      dataIndex: 'id',
      key: 'image',
      render: (id) => (
        <Button onClick={() => viewEmployeeDetails(id)}>
          View Image
        </Button>
      ),
    },
    {
      title: 'Latitude',
      dataIndex: 'latitude',
      key: 'latitude',
    },
    {
      title: 'Longitude',
      dataIndex: 'longitude',
      key: 'longitude',
    },
    // Add more columns as needed
  ];

  return (
    <div>
      <h1>Admin page</h1>
      <Table dataSource={employeeDetails} columns={columns} />

      <Modal
        title={`Employee Details - ID: ${selectedEmployee?.id}`}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        {selectedEmployee && (
          <div>
            <img src={`http://localhost:5000/view/image?employeeId=${selectedEmployee.id}`} alt={`Employee ${selectedEmployee.id}`} />
           
          </div>
        )}
      </Modal>
    </div>
  );
}

export default AdminPage;

