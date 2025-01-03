import React from 'react';
import { FaCalendarAlt, FaMusic, FaFutbol, FaBrain, FaArrowDown } from 'react-icons/fa';
import '../styles/Hero.css';
import logo from '../assets/theaulddub-logo.png';
import pubVideo from '../assets/pub-atmosphere.m4v';

const Hero: React.FC = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="home">
      <video className="hero-video" autoPlay loop muted playsInline>
        <source src={pubVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-overlay" />
      
      <div className="hero-content">
        <div className="hero-logo-container">
          <img src={logo} alt="The Auld Dub" className="pub-logo" />
          <span className="location-tag">Stockholm</span>
        </div>

        <div className="version-badge">
          Est. 2010
        </div>

        <h1 className="hero-title">
          Experience True
          <span className="highlight">Irish Spirit</span>
        </h1>
        
        <p className="hero-subtitle">
          Authentic Irish Pub in the Heart of Stockholm, Bringing You the Finest Craft Beers,
          Traditional Food, and Live Music.
        </p>
        
        <div className="hero-buttons">
          <div className="button-row">
            <a href="#reserve" className="hero-button primary-button">
              <FaCalendarAlt className="button-icon" />
              Book a Table
            </a>
            <a href="#livemusic" className="hero-button secondary-button">
              <FaMusic className="button-icon" />
              Live Music
            </a>
            <a href="#sports" className="hero-button secondary-button">
              <FaFutbol className="button-icon" />
              Sports
            </a>
            <a href="#pubquiz" className="hero-button secondary-button">
              <FaBrain className="button-icon" />
              Pub Quiz
            </a>
          </div>
        </div>
      </div>

      <div className="scroll-indicator" onClick={scrollToAbout}>
        <span className="scroll-text">Scroll Down</span>
        <FaArrowDown className="scroll-icon" />
      </div>
    </section>
  );
};

export default Hero;
