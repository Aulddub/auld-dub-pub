import React from 'react';
import '../styles/About.css';
import pubInterior from '../assets/irish-pub-interior.jpeg';
import { FaBeer, FaMusic, FaFutbol, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const About: React.FC = () => {
  return (
    <section className="about">
      <div className="about-container">
        <div className="about-header">
          
          <h2>
            <span className="about-subtitle">Welcome to</span>
            <span className="about-title">Auld Dub Pub</span>
            <span className="about-tagline">Experience True Irish Spirit</span>
          </h2>
        </div>

        <div className="about-grid">
          <div className="about-main-content">
            <div className="about-description">
              <p>
                Step into the heart of Irish tradition at Auld Dub Pub, where every pint tells a story and every visitor becomes family. Our authentic Irish pub brings the warmth and charm of Dublin's finest establishments to your doorstep.
              </p>
              <p>
                From our carefully curated selection of Irish whiskeys to our perfectly poured pints of Guinness, we pride ourselves on delivering an authentic Irish pub experience that's second to none.
              </p>
            </div>

            <div className="features">
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

          <div className="about-image-wrapper">
            <div className="about-image">
              <img src={pubInterior} alt="Inside Auld Dub Pub" />
            </div>
          </div>

          <div className="about-story">
            <div className="history">
              <h3>Our Story</h3>
              <p>
                Since 1962, Auld Dub has been a cornerstone of Irish culture in the heart of the city. Founded by Dublin native Michael O'Connor, our pub has maintained its authentic charm while becoming a beloved gathering place for locals and visitors alike. Our walls echo with decades of stories, laughter, and Irish music.
              </p>
            </div>

            <div className="team">
              <h3>Our Team</h3>
              <p>
                Our team of friendly bartenders and chefs are dedicated to making your evening special. With years of experience and genuine Irish hospitality, they're here to ensure you have an authentic pub experience.
              </p>
            </div>
          </div>

          <div className="about-info">
            <div className="location">
              <FaMapMarkerAlt className="location-icon" />
              <div className="location-text">
                <h3>Find Us</h3>
                <p>Just 5 minutes from Central Station, in the heart of the historic district.</p>
                <address>123 Irish Lane, City Center</address>
              </div>
            </div>

            <div className="hours">
              <FaClock className="hours-icon" />
              <div className="hours-content">
                <h3>Opening Hours</h3>
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

            <div className="cta">
              <button className="cta-button">Book a Table</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
