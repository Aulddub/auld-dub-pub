import React from 'react';
import '../styles/About.css';
import pubInterior from '../assets/irish-pub-interior.jpeg';
import { FaBeer, FaMusic, FaFutbol, FaMapMarkerAlt, FaClock, FaHistory } from 'react-icons/fa';

const About: React.FC = () => {
  const stats = [
    { number: '1962', text: 'Established' },
    { number: '60+', text: 'Years of Service' },
    { number: '100%', text: 'Irish Spirit' }
  ];

  return (
    <section className="about" id="about">
      <div className="gradient-background"></div>
      <div className="gradient-overlay"></div>
      <div className="about-container">
        <h2>About Us</h2>
        
        <div className="about-hero">
          <div className="hero-content">
            <h3>A True Irish Experience</h3>
            <p>
              Step into the heart of Irish tradition at Auld Dub Pub, where every pint tells a story 
              and every visitor becomes family. Our authentic Irish pub brings the warmth and charm 
              of Dublin's finest establishments to your doorstep.
            </p>
            <p>
              From our carefully curated selection of Irish whiskeys to our perfectly poured pints 
              of Guinness, we pride ourselves on delivering an authentic Irish pub experience that's 
              second to none.
            </p>
            <div className="about-stats">
              {stats.map((stat, index) => (
                <div className="stat" key={index}>
                  <span>{stat.number}</span>
                  <p>{stat.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-image">
            <img src={pubInterior} alt="Inside Auld Dub Pub" />
          </div>
        </div>

        <div className="about-sections">
          <div className="history-section">
            <div className="section-header">
              <FaHistory className="section-icon" />
              <h3>Our Story</h3>
            </div>
            <p>
              Since 1962, Auld Dub has been a cornerstone of Irish culture in the heart of the city. 
              Founded by Dublin native Michael O'Connor, our pub has maintained its authentic charm 
              while becoming a beloved gathering place for locals and visitors alike. Our walls echo 
              with decades of stories, laughter, and Irish music.
            </p>
            <p>
              Our team of friendly bartenders and chefs are dedicated to making your evening special. 
              With years of experience and genuine Irish hospitality, they're here to ensure you have 
              an authentic pub experience.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature">
              <FaBeer className="feature-icon" />
              <span className="feature-title">Premium Beer</span>
              <span className="feature-text">Irish & Local Craft</span>
            </div>
            <div className="feature">
              <FaFutbol className="feature-icon" />
              <span className="feature-title">Live Sports</span>
              <span className="feature-text">Football & Rugby</span>
            </div>
            <div className="feature">
              <FaMusic className="feature-icon" />
              <span className="feature-title">Live Music</span>
              <span className="feature-text">Every Friday</span>
            </div>
          </div>
        </div>

        <div className="info-section">
          <div className="location-card">
            <div className="info-header">
              <FaMapMarkerAlt className="info-icon" />
              <h3>Find Us</h3>
            </div>
            <p>Just 5 minutes from Central Station, in the heart of the historic district.</p>
            <address>123 Irish Lane, City Center</address>
          </div>

          <div className="hours-card">
            <div className="info-header">
              <FaClock className="info-icon" />
              <h3>Opening Hours</h3>
            </div>
            <div className="hours-grid">
              <div className="day-time">
                <span className="day">Monday - Wednesday</span>
                <span className="time">12:00 – 23:00</span>
              </div>
              <div className="day-time">
                <span className="day">Thursday</span>
                <span className="time">12:00 – 00:00</span>
              </div>
              <div className="day-time">
                <span className="day">Friday</span>
                <span className="time">12:00 – 02:00</span>
              </div>
              <div className="day-time">
                <span className="day">Saturday</span>
                <span className="time">14:00 – 02:00</span>
              </div>
              <div className="day-time">
                <span className="day">Sunday</span>
                <span className="time">14:00 – 22:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="about-cta">
          <div className="cta-content">
            <h3>Join Us Tonight</h3>
            <p>
              Experience the warmth of Irish hospitality and the taste of perfectly poured Guinness. 
              Book your table now and become part of our story.
            </p>
            <button className="cta-button">Book a Table</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
