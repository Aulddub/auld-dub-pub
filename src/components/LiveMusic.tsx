import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import '../styles/LiveMusic.css';
import bandImage from '../assets/band.jpg';

interface Band {
  id: string;
  name: string;
  date: string;
  time: string;
  genre: string;
}

const LiveMusic: React.FC = () => {
  const [latestBands, setLatestBands] = useState<Band[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestBands = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const bandsRef = collection(db, 'bands');
        const q = query(bandsRef, orderBy('date', 'desc'), limit(3));
        const querySnapshot = await getDocs(q);
        
        const bands = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          date: doc.data().date,
          time: doc.data().time,
          genre: doc.data().genre
        }));
        
        setLatestBands(bands);
      } catch (error: any) {
        setError(error.message || 'Failed to load bands');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestBands();
  }, []);

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
                  <span>2</span>
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
            <h3>Upcoming Live Music</h3>
            <div className="events-grid">
              {isLoading ? (
                <div className="loading">Loading bands...</div>
              ) : error ? (
                <div className="error">{error}</div>
              ) : latestBands.length === 0 ? (
                <div className="no-bands">No bands available</div>
              ) : (
                latestBands.map((band) => (
                  <div className="event-card" key={band.id}>
                    <div className="event-date">
                      <span className="day">{new Date(band.date).toLocaleDateString('en-US', { weekday: 'long' })}</span>
                      <span className="date">{new Date(band.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className="event-details">
                      <h4>{band.name}</h4>
                      <p className="genre">{band.genre}</p>
                      <p className="time">{band.time}</p>
                    </div>
                  </div>
                ))
              )}
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
