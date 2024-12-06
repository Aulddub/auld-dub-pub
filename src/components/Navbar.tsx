import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';
import logo from '../assets/theaulddub-logo.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="#hero" onClick={closeMenu}>
            <img src={logo} alt="The Auld Dub" />
          </a>
        </div>

        <button 
          className={`menu-toggle ${isOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <nav className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <a href="#about" className="nav-link" onClick={closeMenu}>About</a>
          <a href="#menu" className="nav-link" onClick={closeMenu}>Menu</a>
          <a href="#live-music" className="nav-link" onClick={closeMenu}>Live Music</a>
          <a href="#live-sport" className="nav-link" onClick={closeMenu}>Live Sport</a>
          <a href="#pubquiz" className="nav-link" onClick={closeMenu}>Pub Quiz</a>
          <a href="#contact" className="nav-link" onClick={closeMenu}>Contact</a>
        </nav>
        <a href="#contact" className="reserve-button" onClick={closeMenu}>
          Reserve a Table
        </a>
      </div>
    </header>
  );
};

export default Navbar;
