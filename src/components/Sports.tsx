import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sports.css';
import sportsCrowd from '../assets/sports-crowd.jpg';

const Sports: React.FC = () => {
  const upcomingMatches = [
    {
      league: "Premier League",
      match: "Liverpool vs Manchester United",
      date: "Saturday, Dec 17",
      time: "17:30"
    },
    {
      league: "Champions League",
      match: "Real Madrid vs Manchester City",
      date: "Tuesday, Dec 20",
      time: "21:00"
    },
    {
      league: "Six Nations Rugby",
      match: "Ireland vs England",
      date: "Sunday, Dec 18",
      time: "18:00"
    }
  ];

  return (
    <section className="sports" id="sports">
      <div className="sports-container">
        <h2>Sports</h2>
        
        <div className="sports-content">
          <div className="sports-info">
            <div className="sports-description">
              <div className="sports-image-container">
                <img src={sportsCrowd} alt="Fans watching sports in our pub" className="sports-image" />
              </div>
              <h3>Watch All Major Sports Events</h3>
              <p>
                Join us for live sports action on our multiple HD screens! We show all major sporting 
                events including Premier League, Champions League, Six Nations Rugby, GAA matches, 
                and much more.
              </p>
              <div className="sports-features">
                <div className="feature">
                  <span className="feature-number">5</span>
                  <span className="feature-text">Full HD Screens</span>
                </div>
                <div className="feature">
                  <span className="feature-number">1</span>
                  <span className="feature-text">Projector Screen</span>
                </div>
                <div className="feature">
                  <span className="feature-number">100+</span>
                  <span className="feature-text">Events Monthly</span>
                </div>
              </div>
            </div>

            <div className="upcoming-matches">
              <h3>Upcoming Matches</h3>
              <div className="matches-list">
                {upcomingMatches.map((match, index) => (
                  <div className="match-card" key={index}>
                    <div className="match-league">{match.league}</div>
                    <div className="match-teams">{match.match}</div>
                    <div className="match-time">
                      <span>{match.date}</span>
                      <span>{match.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/matches" className="view-all-button">
                View All Matches
              </Link>
            </div>
          </div>

          <div className="sports-note">
            <p>
              Can't find your game? Contact us to check if we're showing it or to request 
              a specific match. We'll do our best to accommodate your request!
            </p>
            <button className="contact-button">Contact Us</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sports;
