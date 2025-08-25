import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaMusic, FaFutbol, FaBrain } from 'react-icons/fa';
import '../styles/Hero.css';
import logo from '../assets/theaulddub-logo.png';
// import sceneImage from '../assets/scene.jpg';
import womanBarImage from '../assets/woman-bar.webp';
import ShamrockParticles from './ShamrockParticles';
import AnimatedLogo from './AnimatedLogo';
import TypewriterText from './TypewriterText';

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [womanBarImage];

  
  const handleNavigation = (sectionId: string, tab?: string) => {
    
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      const offset = 80; // Высота navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    
    if (tab && sectionId === '#entertainment') {
      setTimeout(() => {
        const event = new CustomEvent('switchTab', { detail: { tab } });
        window.dispatchEvent(event);
      }, 200); 
    }
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); 
    
    return () => clearInterval(interval);
  }, [images.length]);


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
      
    
      
      {/* Частицы трилистников */}
      <ShamrockParticles />
      
      <div className="hero-content">
        <div className="hero-logo-container">
          <AnimatedLogo
            logoSrc={logo}
            alt="The Auld Dub"
            className="pub-logo"
          />
          <span className="location-tag">Stockholm</span>
        </div>

        <h1 className="hero-title">
          Experience True
          <span className="highlight">Irish Spirit</span>
        </h1>
        
        <div className="hero-subtitle">
          <TypewriterText
            text="Authentic Irish Pub in Stockholm"
            delay={2000} // Начинаем после анимации логотипа
            speed={80}
            className="typewriter-subtitle"
          />
        </div>
        
        <div className="hero-buttons">
          <div className="button-row">
            <a href="https://booking-legacy.caspeco.net/public/webBooking?system=se_aulsto&unitId=13&v=1" className="hero-button primary-button" target="_blank" rel="noopener noreferrer">
              <FaCalendarAlt className="button-icon" />
              Book a Table
            </a>
            <a href="#entertainment" className="hero-button secondary-button" onClick={() => handleNavigation('#entertainment', 'music')}>
              <FaMusic className="button-icon" />
              Live Music
            </a>
            <a href="#entertainment" className="hero-button secondary-button" onClick={() => handleNavigation('#entertainment', 'sports')}>
              <FaFutbol className="button-icon" />
              Sports
            </a>
            <a href="#entertainment" className="hero-button secondary-button" onClick={() => handleNavigation('#entertainment', 'quiz')}>
              <FaBrain className="button-icon" />
              Pub Quiz
            </a>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
