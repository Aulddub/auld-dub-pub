import React, { useEffect, useRef } from 'react';
import '../styles/About.css';
import pubInterior from '../assets/irish-pub-interior.jpeg';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Text content animation
      gsap.fromTo(textRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Image animation
      gsap.fromTo(imageRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.5,
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="about" ref={sectionRef}>
      <div className="about-container">
        <div className="about-content">
          <div className="about-text-content" ref={textRef}>
            <h2 ref={headingRef}>
              <span className="about-subtitle">Welcome to</span>
              <span className="about-title">Auld Dub Pub</span>
            </h2>
            <div className="about-description">
              <p>
                Step into the heart of Irish tradition at Auld Dub Pub, where every pint tells a story and every visitor becomes family. Our authentic Irish pub brings the warmth and charm of Dublin's finest establishments to your doorstep.
              </p>
              <p>
                From our carefully curated selection of Irish whiskeys to our perfectly poured pints of Guinness, we pride ourselves on delivering an authentic Irish pub experience that's second to none.
              </p>
            </div>
            <div className="about-features">
              <div className="feature">
                <span className="feature-number">20+</span>
                <span className="feature-text">Irish Whiskeys</span>
              </div>
              <div className="feature">
                <span className="feature-number">1962</span>
                <span className="feature-text">Est. Year</span>
              </div>
              <div className="feature">
                <span className="feature-number">100%</span>
                <span className="feature-text">Authentic</span>
              </div>
            </div>
          </div>
          <div className="about-image" ref={imageRef}>
            <img src={pubInterior} alt="Inside Auld Dub Pub" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
