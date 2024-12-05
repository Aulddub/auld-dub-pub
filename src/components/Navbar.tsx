import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/theaulddub-logo.png';
import { FaBars, FaTimes, FaCalendarAlt } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" onClick={closeMenu}>
            <img src={logo} alt="The Auld Dub Logo" className="navbar-logo" />
          </Link>
        </div>
        
        <div className={`navbar-center ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/#menu" onClick={closeMenu}>Menu</Link>
            </li>
            <li className="nav-item">
              <Link to="/#about" onClick={closeMenu}>About</Link>
            </li>
            <li className="nav-item">
              <Link to="/#gallery" onClick={closeMenu}>Gallery</Link>
            </li>
            <li className="nav-item">
              <Link to="/all-matches" onClick={closeMenu}>Sports</Link>
            </li>
            <li className="nav-item">
              <Link to="/#live-music" onClick={closeMenu}>Live Music</Link>
            </li>
            <li className="nav-item">
              <Link to="/#quiz" onClick={closeMenu}>Pub Quiz</Link>
            </li>
            <li className="nav-item">
              <Link to="/#contact" onClick={closeMenu}>Contact</Link>
            </li>
          </ul>
        </div>

        <div className="navbar-right">
          <Link to="/#reserve" className="reserve-button" onClick={closeMenu}>
            <FaCalendarAlt className="reserve-icon" />
            Reserve
          </Link>
          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}>
        <div className="mobile-menu-content" onClick={e => e.stopPropagation()}>
          <ul className="mobile-nav-menu">
            <li className="mobile-nav-item" style={{"--item-index": 0} as React.CSSProperties}>
              <Link to="/#menu" onClick={closeMenu}>Menu</Link>
            </li>
            <li className="mobile-nav-item" style={{"--item-index": 1} as React.CSSProperties}>
              <Link to="/#about" onClick={closeMenu}>About</Link>
            </li>
            <li className="mobile-nav-item" style={{"--item-index": 2} as React.CSSProperties}>
              <Link to="/#gallery" onClick={closeMenu}>Gallery</Link>
            </li>
            <li className="mobile-nav-item" style={{"--item-index": 3} as React.CSSProperties}>
              <Link to="/all-matches" onClick={closeMenu}>Sports</Link>
            </li>
            <li className="mobile-nav-item" style={{"--item-index": 4} as React.CSSProperties}>
              <Link to="/#live-music" onClick={closeMenu}>Live Music</Link>
            </li>
            <li className="mobile-nav-item" style={{"--item-index": 5} as React.CSSProperties}>
              <Link to="/#quiz" onClick={closeMenu}>Pub Quiz</Link>
            </li>
            <li className="mobile-nav-item" style={{"--item-index": 6} as React.CSSProperties}>
              <Link to="/#contact" onClick={closeMenu}>Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
