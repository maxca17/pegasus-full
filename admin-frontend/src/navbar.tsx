import React from 'react';
import { Link } from 'react-router-dom';
//import './Navbar.css'; // You'll need to create this CSS file

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Admin Dashboard
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/companies" className="nav-link">Companies</Link>
          </li>
          <li className="nav-item">
            <Link to="/settings" className="nav-link">Settings</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
