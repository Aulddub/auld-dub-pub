import React from 'react';
import '../styles/Hero.css';
import logo from '../assets/theaulddub-logo.png';
import { FaCalendarAlt, FaUtensils, FaMusic, FaFutbol } from 'react-icons/fa';

const Hero: React.FC = () => {
  return (
    <div className="hero">
      <video className="background-video" autoPlay loop muted playsInline>
        <source src={require('../assets/pub-atmosphere.m4v')} type="video/mp4" />
      </video>
      <div className="video-overlay"></div>
      <div className="hero-logo-container">
        <img src={logo} alt="The Auld Dub" className="pub-logo" />
        <span className="location-tag">Stockholm</span>
      </div>
      <div className="version-badge">
        Est. 1995
      </div>
      <div className="hero-content">
        <h1 className="hero-title">
          Experience True
          <br />
          <span className="highlight">Irish Spirit</span>
        </h1>
        <p className="hero-subtitle">
          Authentic Irish Pub in the Heart of Stockholm, Bringing You the Finest Craft Beers,
          Traditional Food, and Live Music.
        </p>
        <div className="hero-buttons">
          <div className="button-row">
            <a href="#reserve" className="hero-button">
              <FaCalendarAlt className="button-icon" />
              Book a Table
            </a>
            <a href="#menu" className="hero-button secondary">
              <FaUtensils className="button-icon" />
              View Menu
            </a>
          </div>
          <div className="button-row">
            <a href="#music" className="hero-button secondary">
              <FaMusic className="button-icon" />
              Live Music
            </a>
            <a href="#sports" className="hero-button secondary">
              <FaFutbol className="button-icon" />
              Live Sport
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
