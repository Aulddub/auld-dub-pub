import React from 'react';
import '../styles/Hero.css';

const Hero: React.FC = () => {
  return (
    <div className="hero">
      <div className="version-badge">
        Est. 1995
      </div>
      <div className="hero-content">
        <h1 className="hero-title">
          Experience True
          <span className="highlight"> Irish Spirit</span>
        </h1>
        <p className="hero-subtitle">
          Authentic Irish Pub in the Heart of Stockholm, Bringing You the Finest Craft Beers,
          Traditional Food, and Live Music.
        </p>
        <div className="hero-buttons">
          <a href="#reserve" className="hero-button">
            Book a Table
          </a>
          <a href="#menu" className="hero-button secondary">
            View Menu
          </a>
        </div>
        <p className="hero-note">No reservation fee required.</p>
      </div>
    </div>
  );
};

export default Hero;
