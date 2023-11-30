
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Login.css"
const Login = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('employee'); // Default to employee

  const handleLogin = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/login/${userType}`, {
        id,
        password,
      });

      if (response.data.status === 'success') {
        // Redirect based on user type
        if (userType === 'employee') {
          // Redirect to employee page
          navigate('/employee');
        } else if (userType === 'admin') {
          // Redirect to admin page
          navigate('/admin');
        }
      } else {
        console.error('Login failed:', response.data.message);
        // Handle login failure (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>
        ID:
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <label>
        User Type:
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
