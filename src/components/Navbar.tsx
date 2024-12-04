import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/theaulddub-logo.png';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/">
            <img src={logo} alt="The Auld Dub Logo" className="navbar-logo" />
          </Link>
        </div>
        <div className="navbar-center">
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/#menu">Menu</Link>
            </li>
            <li className="nav-item">
              <Link to="/#events">Events</Link>
            </li>
            <li className="nav-item">
              <Link to="/#about">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/#gallery">Gallery</Link>
            </li>
            <li className="nav-item">
              <Link to="/all-matches">Matches</Link>
            </li>
            <li className="nav-item">
              <Link to="/#contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-right">
          <Link to="/#reserve" className="reserve-button">Reserve</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
