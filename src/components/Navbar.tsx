import React from 'react';
import '../styles/Navbar.css';
import logo from '../assets/theaulddub-logo.png';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <img src={logo} alt="The Auld Dub Logo" className="navbar-logo" />
        </div>
        <div className="navbar-center">
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="#menu">Menu</a>
            </li>
            <li className="nav-item">
              <a href="#events">Events</a>
            </li>
            <li className="nav-item">
              <a href="#about">About</a>
            </li>
            <li className="nav-item">
              <a href="#gallery">Gallery</a>
            </li>
            <li className="nav-item">
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
        <div className="navbar-right">
          <a href="#reserve" className="reserve-button">Reserve</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
