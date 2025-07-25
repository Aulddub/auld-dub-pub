import React, { useEffect, useRef } from "react";
import "../styles/About.css";
import pubInterior from "../assets/irish-pub-interior.jpeg";
import {
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const About: React.FC = () => {
  const aboutRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (aboutRef.current) {
          if (entry.isIntersecting) {
            aboutRef.current.classList.add("about-active");
          } else {
            aboutRef.current.classList.remove("about-active");
          }
        }
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = aboutRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);


  return (
    <section className="about" id="about">
      <div className="gradient-background"></div>
      <div className="gradient-overlay"></div>
      <div className="about-container">
        <h2>About Us</h2>

        <div className="about-hero">
          <div className="hero-content">
            
            <p>
              Step into The Auld Dub and discover Stockholm's most authentic Irish experience. 
              Our warm, wood-paneled interior buzzes with the genuine spirit of Irish hospitality, 
              where every guest becomes part of our extended family.
            </p>
            <p>
              From the perfectly poured Guinness that settles with pride, to the traditional Irish 
              dishes crafted with love, every detail reflects our commitment to authenticity. 
              Whether you're catching the match with friends, enjoying live music, or simply 
              seeking refuge from the Stockholm winter, our doors are always open.
            </p>
          </div>
          <div className="hero-image">
            <img src={pubInterior} alt="Inside Auld Dub Pub" />
          </div>
        </div>

        <div className="about-sections">
          <div className="history-section">
            <div className="section-header">
              <h3 className="section-header">What Makes Us Special</h3>
            </div>
            <p>
              More than just a pub, we're a cultural bridge between Ireland and Sweden. 
              Our carefully curated atmosphere combines the cozy intimacy of a traditional 
              Irish pub with Stockholm's cosmopolitan energy. Every element, from our 
              imported Irish fixtures to our locally-sourced ingredients, tells a story 
              of two cultures coming together.
            </p>
            <p>
              Our passionate team doesn't just serve drinks – they create experiences. 
              Behind the bar, you'll find genuine Irish hospitality paired with Swedish 
              efficiency, ensuring every visit feels both familiar and special.
            </p>
          </div>


        </div>

        <div className="info-section">
          <div className="location-card">
            <div className="location-card-inner">
              <div className="info-header">
                <div className="icon-wrapper">
                  <FaMapMarkerAlt className="info-icon" />
                </div>
                <h3 className="section-header">Find Us</h3>
              </div>
              <div className="location-content">
                <p className="location-description">
                  Just 5 minutes from Central Station, in the heart of the historic
                  district.
                </p>
                <div className="address-container">
                  <address className="main-address">Holländargatan 1, 111 36 Stockholm</address>
                  <div className="location-highlights">
                    <span className="highlight-item">Historic District</span>
                    <span className="highlight-item">5 min from Central Station</span>
                    <span className="highlight-item">Easy Access</span>
                  </div>
                </div>
              </div>
              <div className="location-footer">
                <button className="directions-btn">Get Directions</button>
              </div>
            </div>
          </div>

          <div className="hours-card">
            <div className="info-header">
              <FaClock className="info-icon" />
              <h3 className="section-header">Opening Hours</h3>
            </div>
            <div className="hours-grid">
              <div className="day-time">
                <span className="day">Monday - Thursday</span>
                <span className="time">15:00 – 01:00</span>
              </div>
              <div className="day-time">
                <span className="day">Friday</span>
                <span className="time">14:00 – 03:00</span>
              </div>
              <div className="day-time">
                <span className="day">Saturday</span>
                <span className="time">12:00 – 03:00</span>
              </div>
              <div className="day-time">
                <span className="day">Sunday</span>
                <span className="time">12:00 – 23:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="about-cta">
          <div className="cta-content">
            <h3 className="section-header">Your Table Awaits</h3>
            <p>
              Ready to experience Stockholm's finest Irish hospitality? Join us for 
              an evening where every pint tells a story and every conversation feels 
              like coming home.
            </p>
            <button className="cta-button">Reserve Your Experience</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
