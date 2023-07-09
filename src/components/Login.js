import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

  const[credentials, setCredentials] = useState({email: "", password: ""});
  const navigate = useNavigate();

  const handleChange = (e)=>{

    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  const handleLogin = async (e)=>{

    e.preventDefault();

    const response = await fetch('http://localhost:2000/api/auth/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });

    const responseData = await response.json();

    if(responseData.success) {

      localStorage.setItem('auth-token', responseData.authToken);
      navigate('/');
      props.showAlert('success', 'Logged in Successfully');
    }
    else {
      props.showAlert('danger', 'Invalid Details!');
    }
  }

  return (
    <form className="my-4">
      <h2 className="my-4">Login to Continue Using Quick Notebook</h2>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          name="email"
          placeholder="example@gmail.com"
          value={credentials.email}
          onChange={handleChange}
        />
        <div id="emailHelp" className="form-text">
          Don't worry your email is secured and protected.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          placeholder="your password here..."
          value={credentials.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary my-2" onClick={handleLogin}>
        Login
      </button>
    </form>
  );
};

export default Login;
