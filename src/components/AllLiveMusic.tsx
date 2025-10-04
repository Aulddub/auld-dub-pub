import React, { useEffect, useState } from 'react';
import { databaseService } from '../services/database';
import { useNavigate } from 'react-router-dom';
import '../styles/AllLiveMusic.css';

interface Band {
  id: string;
  name: string;
  date: string;
  time: string;
  genre: string;
}

const AllLiveMusic = () => {
  const [bands, setBands] = useState<Band[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBands = async () => {
      try {
        const bandsList = await databaseService.getBands();

        // Get end of today for comparison (23:59:59)
        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);

        // Filter and sort bands by date and time, earliest first
        const upcomingBands = bandsList
          .filter(band => {
            const bandDate = new Date(band.date + 'T' + band.time);
            // Show events only if they're today or in the future
            return bandDate > endOfToday;
          })
          .sort((a, b) => {
            const dateA = new Date(a.date + 'T' + a.time);
            const dateB = new Date(b.date + 'T' + b.time);
            return dateA.getTime() - dateB.getTime();
          });

        setBands(upcomingBands);
      } catch (error) {
        console.error('Error fetching bands:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBands();
  }, []);

  if (loading) {
    return (
      <section className="all-live-music">
        <div className="all-live-music-container">
          <div className="loading">Loading bands...</div>
        </div>
      </section>
    );
  }

  const groupedBands = bands.reduce((groups, band) => {
    const date = new Date(band.date).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(band);
    return groups;
  }, {} as Record<string, Band[]>);

  return (
    <section className="all-live-music">
      <div className="all-live-music-container">
        <div className="all-live-music-header">
          <button 
            className="back-button" 
            onClick={() => navigate('/')}
            aria-label="Back to home"
          >
            ← Back to Home
          </button>
          <h2>All Live Music Events</h2>
        </div>
        
        {Object.entries(groupedBands).map(([date, dateBands]) => (
          <div key={date} className="band-date-group">
            <h3 className="band-date-header">{date}</h3>
            <div className="bands-grid">
              {dateBands.map(band => {
                const bandDate = new Date(band.date + 'T' + band.time);
                return (
                  <div key={band.id} className="band-card">
                    <div className="band-date">
                      <span className="day">{bandDate.getDate()}</span>
                      <span className="month">
                        {bandDate.toLocaleString('en-US', { month: 'short' })}
                      </span>
                    </div>
                    <div className="band-details">
                      <div className="band-name">{band.name}</div>
                      <div className="band-genre">{band.genre}</div>
                      <div className="band-time">
                        {bandDate.toLocaleString('en-US', { weekday: 'short' })} •{' '}
                        {bandDate.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {bands.length === 0 && (
          <div className="no-bands">
            No live music events scheduled
          </div>
        )}
      </div>
    </section>
  );
};

export default AllLiveMusic;