import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaMusic, FaFutbol, FaBrain, FaArrowDown } from 'react-icons/fa';
import '../styles/Hero.css';
import logo from '../assets/theaulddub-logo.png';
// import sceneImage from '../assets/scene.jpg';
import womanBarImage from '../assets/woman-bar.webp';

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [womanBarImage];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, [images.length]);


  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="home">
      <div className="hero-slider">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Irish Pub Scene ${index + 1}`}
            className={`hero-background ${index === currentImageIndex ? 'active' : ''}`}
          />
        ))}
      </div>
      <div className="hero-overlay" />
      
    
      
      <div className="hero-content">
        <div className="hero-logo-container">
          <img src={logo} alt="The Auld Dub" className="pub-logo" />
          <span className="location-tag">Stockholm</span>
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
            <a href="https://booking-legacy.caspeco.net/public/webBooking?system=se_aulsto&unitId=13&v=1" className="hero-button primary-button" target="_blank" rel="noopener noreferrer">
              <FaCalendarAlt className="button-icon" />
              Book a Table
            </a>
            <a href="#entertainment?tab=music" className="hero-button secondary-button">
              <FaMusic className="button-icon" />
              Live Music
            </a>
            <a href="#entertainment?tab=sports" className="hero-button secondary-button">
              <FaFutbol className="button-icon" />
              Sports
            </a>
            <a href="#entertainment?tab=quiz" className="hero-button secondary-button">
              <FaBrain className="button-icon" />
              Pub Quiz
            </a>
          </div>
        </div>
      </div>

      <div className="scroll-indicator" onClick={scrollToAbout}>
        <FaArrowDown className="scroll-icon" />
      </div>
    </section>
  );
};

export default Hero;
