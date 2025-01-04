import React, { useEffect, useRef } from "react";
import "../styles/About.css";
import pubInterior from "../assets/irish-pub-interior.jpeg";
import {
  FaBeer,
  FaMusic,
  FaFutbol,
  FaMapMarkerAlt,
  FaClock,
  FaHistory,
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

  const stats = [
    { number: "2010", text: "Established" },
    { number: "15", text: "Years of Service" },
    { number: "100%", text: "Irish Spirit" },
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
              Welcome to Sweden´s longest established genuine Irish Pub. Since
              the start the focus of the pub has been authentic Irish food and
              live music in an enjoyable, welcoming environment. We show all
              major sporting events on our many TV screens and our projector
              screen and you can always come to us to get in the right mood for
              a big game. Every weekend we have live music on stage from a
              selection of the finest musicians who guarantee you’ll have a
              cracking time!
            </p>
            <p>
              So if you’re looking for a good time, good food and good friends,
              look no further.
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
              Since 2010, Auld Dub has been a cornerstone of Irish culture in
              the heart of the city. Our pub has maintained its authentic charm
              while becoming a beloved gathering place for locals and visitors
              alike. Our walls echo with decades of stories, laughter, and Irish
              music.
            </p>
            <p>
              Our team of friendly bartenders and chefs are dedicated to making
              your evening special. With years of experience and genuine Irish
              hospitality, they're here to ensure you have an authentic pub
              experience.
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
            <p>
              Just 5 minutes from Central Station, in the heart of the historic
              district.
            </p>
            <address>Holländargatan 1, 111 36 Stockholm</address>
          </div>

          <div className="hours-card">
            <div className="info-header">
              <FaClock className="info-icon" />
              <h3>Opening Hours</h3>
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
            <h3>Join Us Tonight</h3>
            <p>
              Experience the warmth of Irish hospitality and the taste of
              perfectly poured Guinness. Book your table now and become part of
              our story.
            </p>
            <button className="cta-button">Book a Table</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
