import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {

  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""});

  const navigate = useNavigate();

  const handleChange = (e)=>{

    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  const handleSignup = async (e)=>{

    e.preventDefault();

    const { name, email, password } = credentials;

    const response = await fetch('http://localhost:2000/api/auth/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    const responseData = await response.json();

    if(responseData.success) {

      localStorage.setItem('auth-token', responseData.authToken);
      navigate('/');
      props.showAlert('success', 'Account Created Successfully');
    }
    else {

      props.showAlert('danger', `${responseData.msg}`);
    }
    
  }

  return (
    <form className="my-3">
      <h2 className="my-3">Create New Account to Use Quick Notebook!</h2>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          aria-describedby="emailHelp"
          placeholder="your name here"
          minLength={2}
          required
          value={credentials.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          aria-describedby="emailHelp"
          placeholder="example@gmail.com"
          required
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
          placeholder="your password here"
          minLength={3}
          required
          value={credentials.password}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          id="cpassword"
          name="cpassword"
          placeholder="repeat your password"
          aria-describedby="emailHelp"
          required
          value={credentials.cpassword}
          onChange={handleChange}
        />
        <div id="emailHelp" className="form-text" style={{color: 'red'}}>
          {credentials.password===credentials.cpassword?'':'Password and Confirm Password must be same to continue!'}
        </div>
      </div>
      <button disabled={!(credentials.password===credentials.cpassword)?true:false} type="submit" className="btn btn-primary my-3" onClick={handleSignup}>
        Signup
      </button>
    </form>
  );
};

export default Signup;
