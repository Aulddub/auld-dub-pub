import React from 'react';
import '../styles/LiveMusic.css';
import bandImage from '../assets/band.jpg';

const LiveMusic: React.FC = () => {
  const upcomingEvents = [
    {
      artist: "The Dublin Rebels",
      date: "Friday, Dec 16",
      time: "21:00",
      genre: "Irish Folk Rock"
    },
    {
      artist: "Celtic Storm",
      date: "Saturday, Dec 17",
      time: "21:30",
      genre: "Traditional Irish"
    },
    {
      artist: "Green Valley Boys",
      date: "Friday, Dec 23",
      time: "21:00",
      genre: "Irish Folk/Country"
    }
  ];

  return (
    <section className="live-music" id="livemusic">
      <div className="live-music-bg">
        <div className="live-music-container">
          <h2>Live Music</h2>
          
          <div className="live-music-hero">
            <div className="hero-content">
              <h3>Experience True Irish Music</h3>
              <p>
                Every weekend, we bring you the authentic sound of Ireland. From traditional 
                folk tunes to modern Irish rock, our carefully selected musicians create an 
                atmosphere that'll transport you straight to Dublin.
              </p>
              <div className="music-stats">
                <div className="stat">
                  <span>3</span>
                  <p>Live Shows Weekly</p>
                </div>
                <div className="stat">
                  <span>20+</span>
                  <p>Regular Bands</p>
                </div>
                <div className="stat">
                  <span>100%</span>
                  <p>Irish Spirit</p>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <img src={bandImage} alt="Live band performing at our pub" />
            </div>
          </div>

          <div className="events-section">
            <h3>Upcoming Performances</h3>
            <div className="events-grid">
              {upcomingEvents.map((event, index) => (
                <div className="event-card" key={index}>
                  <div className="event-date">
                    <span className="day">{event.date.split(',')[0]}</span>
                    <span className="date">{event.date.split(',')[1]}</span>
                  </div>
                  <div className="event-details">
                    <h4>{event.artist}</h4>
                    <p className="genre">{event.genre}</p>
                    <p className="time">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="music-cta">
            <div className="cta-content">
              <h3>Want to Perform?</h3>
              <p>
                We're always looking for talented musicians to join our lineup. 
                If you've got what it takes to get our crowd going, we want to hear from you!
              </p>
              <button className="cta-button">Contact Us</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveMusic;
