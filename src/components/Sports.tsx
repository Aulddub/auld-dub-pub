import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sports.css';
import sportsCrowd from '../assets/sports-crowd.jpg';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

interface Match {
  id: string;
  league: string;
  team1: string;
  team2: string;
  date: string;
  time: string;
}

const Sports: React.FC = () => {
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpcomingMatches = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const matchesRef = collection(db, 'matches');
        const q = query(matchesRef);
        const querySnapshot = await getDocs(q);
        
        const now = new Date();
        const matches = querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Match[];

        // Filter and sort upcoming matches
        const upcomingMatches = matches
          .filter(match => {
            const matchDate = new Date(match.date + 'T' + match.time);
            return matchDate >= now;
          })
          .sort((a, b) => {
            const dateA = new Date(a.date + 'T' + a.time);
            const dateB = new Date(b.date + 'T' + b.time);
            return dateA.getTime() - dateB.getTime();
          })
          .slice(0, 3); // Get only the next 3 matches

        setUpcomingMatches(upcomingMatches);
        setIsLoading(false);
      } catch (error: any) {
        console.error('Error fetching matches:', error);
        setError(error.message || 'Failed to load matches');
        setIsLoading(false);
      }
    };

    fetchUpcomingMatches();
  }, []);

  const formatDate = (date: string, time: string) => {
    const d = new Date(date + 'T' + time);
    return {
      date: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
    };
  };

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
                {isLoading ? (
                  <div className="loading">Loading matches...</div>
                ) : error ? (
                  <div className="error">{error}</div>
                ) : upcomingMatches.length === 0 ? (
                  <div className="no-matches">No upcoming matches scheduled</div>
                ) : (
                  upcomingMatches.map((match) => {
                    const { date, time } = formatDate(match.date, match.time);
                    return (
                      <div className="match-card" key={match.id}>
                        <div className="match-league">{match.league}</div>
                        <div className="match-teams">{match.team1} vs {match.team2}</div>
                        <div className="match-time">
                          <span>{date}</span>
                          <span>{time}</span>
                        </div>
                      </div>
                    );
                  })
                )}
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
