import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/theaulddub-logo.png';
import { IoMenu, IoClose } from 'react-icons/io5';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo-link">
            <img src={logo} alt="Auld Dub Pub" className="navbar-logo" />
          </Link>

          <div className="navbar-content">
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/menu">Menu</Link>
              </li>
              <li className="nav-item">
                <Link to="/sports">Sports</Link>
              </li>
              <li className="nav-item">
                <Link to="/events">Events</Link>
              </li>
              <li className="nav-item">
                <Link to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <Link to="/reserve" className="reserve-button">
            Reserve
          </Link>

          <button className="menu-icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <>
          <div className="mobile-menu-overlay" onClick={toggleMobileMenu} />
          <div className="mobile-menu">
            <ul className="mobile-nav-menu">
              <li className="mobile-nav-item">
                <Link to="/" onClick={toggleMobileMenu}>Home</Link>
              </li>
              <li className="mobile-nav-item">
                <Link to="/menu" onClick={toggleMobileMenu}>Menu</Link>
              </li>
              <li className="mobile-nav-item">
                <Link to="/sports" onClick={toggleMobileMenu}>Sports</Link>
              </li>
              <li className="mobile-nav-item">
                <Link to="/events" onClick={toggleMobileMenu}>Events</Link>
              </li>
              <li className="mobile-nav-item">
                <Link to="/about" onClick={toggleMobileMenu}>About</Link>
              </li>
              <li className="mobile-nav-item">
                <Link to="/contact" onClick={toggleMobileMenu}>Contact</Link>
              </li>
              <li className="mobile-nav-item">
                <Link to="/reserve" className="reserve-button" onClick={toggleMobileMenu}>
                  Reserve
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
