import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NoteContext from "../context/NoteContext";

const Navbar = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(NoteContext);

  const handleLogout = ()=>{

    localStorage.removeItem('auth-token');
    navigate('/login');
  }
  
  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Quick Notebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==='/'?'active':''}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==='/about'?'active':''}`} to="/about">
                About
              </Link>
            </li>
          </ul>
          { !localStorage.getItem('auth-token')?<form className="d-flex" role="search">
            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
          </form>:
          <div className="d-flex align-items-center">
            <div className="btn-group dropstart mx-4">
            <i type="button" className="fa-solid fa-circle-user dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{color: 'white', fontSize: '29px'}}></i>
            <ul className="dropdown-menu">
              <li className="dropdown-item" style={{cursor: 'pointer'}}>{user.name}</li>
              <li><hr className="dropdown-divider" /></li>
              <li className="dropdown-item" style={{cursor: 'pointer'}}>{user.email}</li>
            </ul>
          </div>
            <button className="btn btn-primary mx-1" onClick={handleLogout}>Logout</button>
        </div>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
