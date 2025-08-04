import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Link } from 'react-router-dom';
import '../styles/Entertainment.css';
import { FaMusic, FaFutbol, FaCalendarAlt } from 'react-icons/fa';
import sceneImage from '../assets/scene.jpg';
import sportsCrowd from '../assets/sports-crowd.png';
import pubquizImage from '../assets/pubquiz.png';

interface Band {
  id: string;
  name: string;
  date: string;
  time: string;
  genre: string;
}

interface Match {
  id: string;
  league: string;
  team1: string;
  team2: string;
  date: string;
  time: string;
}

type TabType = 'music' | 'sports' | 'quiz';

const Entertainment: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('music');
  const [latestBands, setLatestBands] = useState<Band[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch bands
        const bandsRef = collection(db, 'bands');
        const bandsQuery = query(bandsRef, orderBy('date', 'desc'), limit(3));
        const bandsSnapshot = await getDocs(bandsQuery);
        const bands = bandsSnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          date: doc.data().date,
          time: doc.data().time,
          genre: doc.data().genre
        }));
        setLatestBands(bands);

        // Fetch matches
        const matchesRef = collection(db, 'matches');
        const matchesQuery = query(matchesRef);
        const matchesSnapshot = await getDocs(matchesQuery);
        const now = new Date();
        const matches = matchesSnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Match[];

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
          .slice(0, 3);

        setUpcomingMatches(upcomingMatches);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle URL parameters and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const urlParams = new URLSearchParams(hash.split('?')[1] || '');
      const tabParam = urlParams.get('tab');
      
      if (tabParam && ['music', 'sports', 'quiz'].includes(tabParam)) {
        setActiveTab(tabParam as TabType);
        
        // Auto-scroll to entertainment section
        setTimeout(() => {
          const entertainmentSection = document.getElementById('entertainment');
          if (entertainmentSection) {
            entertainmentSection.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 100); // Small delay to ensure tab change is processed
      }
    };

    // Check initial URL
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const formatDate = (date: string, time: string) => {
    const d = new Date(date + 'T' + time);
    return {
      weekday: d.toLocaleDateString('en-US', { weekday: 'short' }),
      day: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
      time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
    };
  };

  const tabs = [
    { id: 'music', label: 'Live Music', icon: FaMusic },
    { id: 'sports', label: 'Live Sports', icon: FaFutbol },
    { id: 'quiz', label: 'Pub Quiz', icon: FaMusic }
  ];

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const renderMusicContent = () => (
    <motion.div
      key="music"
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="tab-content"
    >
      <div className="content-hero">
        <div className="hero-text">
          <h3>Experience True Irish Music</h3>
          <p>
            Every weekend, we bring you the authentic sound of Ireland. From traditional 
            folk tunes to modern Irish rock, our carefully selected musicians create an 
            atmosphere that'll transport you straight to Dublin.
          </p>
          <div className="stats-grid">
            <div className="stat">
              <span className="stat-number">2</span>
              <span className="stat-label">Live Shows Weekly</span>
            </div>
            <div className="stat">
              <span className="stat-number">20+</span>
              <span className="stat-label">Regular Bands</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Irish Spirit</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src={sceneImage} alt="Live band performing" />
        </div>
      </div>
      
      <div className="events-section">
        <h4>Upcoming Live Music</h4>
        <div className="events-grid">
          {isLoading ? (
            <div className="loading">Loading bands...</div>
          ) : latestBands.length === 0 ? (
            <div className="no-events">No bands scheduled</div>
          ) : (
            latestBands.map((band) => (
              <div className="event-card" key={band.id}>
                <div className="event-date">
                  <FaCalendarAlt />
                  <span>{new Date(band.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="event-details">
                  <h5>{band.name}</h5>
                  <p className="genre">{band.genre}</p>
                  <p className="time">{band.time}</p>
                </div>
              </div>
            ))
          )}
        </div>
        <Link to="/live-music" className="cta-button">View All</Link>
      </div>
    </motion.div>
  );

  const renderSportsContent = () => (
    <motion.div
      key="sports"
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="tab-content"
    >
      <div className="content-hero">
        <div className="hero-text">
          <h3>Watch All Major Sports Events</h3>
          <p>
            Join us for live sports action on our multiple HD screens! We show all major sporting 
            events including Premier League, Champions League, Six Nations Rugby, GAA matches, 
            and much more.
          </p>
          <div className="stats-grid">
            <div className="stat">
              <span className="stat-number">5</span>
              <span className="stat-label">Full HD Screens</span>
            </div>
            <div className="stat">
              <span className="stat-number">1</span>
              <span className="stat-label">Projector Screen</span>
            </div>
            <div className="stat">
              <span className="stat-number">100+</span>
              <span className="stat-label">Events Monthly</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src={sportsCrowd} alt="Sports fans watching" />
        </div>
      </div>
      
      <div className="events-section">
        <h4>Upcoming Matches</h4>
        <div className="events-grid">
          {isLoading ? (
            <div className="loading">Loading matches...</div>
          ) : upcomingMatches.length === 0 ? (
            <div className="no-events">No upcoming matches</div>
          ) : (
            upcomingMatches.map(match => {
              const formattedDate = formatDate(match.date, match.time);
              return (
                <div key={match.id} className="event-card">
                  <div className="event-date">
                    <FaCalendarAlt />
                    <span>{formattedDate.day} {formattedDate.month}</span>
                  </div>
                  <div className="event-details">
                    <h5>{match.league}</h5>
                    <p className="teams">{match.team1} vs {match.team2}</p>
                    <p className="time">{formattedDate.weekday} • {formattedDate.time}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <Link to="/all-matches" className="cta-button">View All Matches</Link>
      </div>
    </motion.div>
  );

  const renderQuizContent = () => (
    <motion.div
      key="quiz"
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="tab-content"
    >
      <div className="content-hero">
        <div className="hero-text">
          <h3>Test Your Knowledge</h3>
          <p>
            Join us every Thursday night for The Auld Dub's most entertaining pub quiz! 
            Gather your friends, form a team, and compete for exciting prizes while 
            enjoying our special quiz night deals on drinks and snacks.
          </p>
          <div className="stats-grid">
            <div className="stat">
              <span className="stat-number">8</span>
              <span className="stat-label">Teams Max</span>
            </div>
            <div className="stat">
              <span className="stat-number">6</span>
              <span className="stat-label">Rounds</span>
            </div>
            <div className="stat">
              <span className="stat-number">€100</span>
              <span className="stat-label">Prize Pool</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src={pubquizImage} alt="Pub Quiz Night" />
        </div>
      </div>



      <div className="quiz-cta">
        <div className="cta-content">
          <h4>Ready to Test Your Knowledge?</h4>
          <p>Join us this Thursday for an evening of fun, competition, and great craic!</p>
          <a href="https://booking-legacy.caspeco.net/public/webBooking?system=se_aulsto&unitId=13&v=1" className="cta-button" target="_blank" rel="noopener noreferrer">Reserve Your Table</a>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="entertainment" id="entertainment">
      <div className="entertainment-container">
        <h2>Entertainment</h2>
        
        <div className="tab-navigation">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <motion.button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id as TabType)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <IconComponent className="tab-icon" />
                <span>{tab.label}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="tab-content-container">
          <AnimatePresence mode="wait">
            {activeTab === 'music' && renderMusicContent()}
            {activeTab === 'sports' && renderSportsContent()}
            {activeTab === 'quiz' && renderQuizContent()}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Entertainment;