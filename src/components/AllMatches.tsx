import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import '../styles/AllMatches.css';

interface Match {
  id: string;
  league: string;
  team1: string;
  team2: string;
  date: string;
  time: string;
}

const LEAGUES = [
  "Premier League",
  "Champions League",
  "Europa League",
  "La Liga",
  "Bundesliga",
  "Serie A",
  "Six Nations Rugby",
  "Champions Cup Rugby",
  "GAA Football",
  "GAA Hurling"
];

const AllMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedLeague, setSelectedLeague] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const matchesCollection = collection(db, 'matches');
        const matchesSnapshot = await getDocs(matchesCollection);
        const matchesList = matchesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Match[];
        
        // Sort matches by date and time
        matchesList.sort((a, b) => {
          const dateA = new Date(a.date + 'T' + a.time);
          const dateB = new Date(b.date + 'T' + b.time);
          return dateA.getTime() - dateB.getTime();
        });
        
        setMatches(matchesList);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const filteredMatches = selectedLeague
    ? matches.filter(match => match.league === selectedLeague)
    : matches;

  if (loading) {
    return (
      <section className="all-matches">
        <div className="all-matches-container">
          <div className="loading">Loading matches...</div>
        </div>
      </section>
    );
  }

  const groupedMatches = filteredMatches.reduce((groups, match) => {
    const date = new Date(match.date).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(match);
    return groups;
  }, {} as Record<string, Match[]>);

  return (
    <section className="all-matches">
      <div className="all-matches-container">
        <h2>Upcoming Matches</h2>
        
        <div className="matches-filter">
          <select
            value={selectedLeague}
            onChange={(e) => setSelectedLeague(e.target.value)}
            className="league-filter"
          >
            <option value="">All Leagues</option>
            {LEAGUES.map(league => (
              <option key={league} value={league}>{league}</option>
            ))}
          </select>
        </div>

        {Object.entries(groupedMatches).map(([date, dateMatches]) => (
          <div key={date} className="match-date-group">
            <h3 className="match-date-header">{date}</h3>
            <div className="matches-grid">
              {dateMatches.map(match => {
                const matchDate = new Date(match.date + 'T' + match.time);
                return (
                  <div key={match.id} className="match-card">
                    <div className="match-date">
                      <span className="day">{matchDate.getDate()}</span>
                      <span className="month">
                        {matchDate.toLocaleString('en-US', { month: 'short' })}
                      </span>
                    </div>
                    <div className="match-details">
                      <div className="match-league">{match.league}</div>
                      <div className="match-teams">
                        {match.team1} vs {match.team2}
                      </div>
                      <div className="match-time">
                        {matchDate.toLocaleString('en-US', { weekday: 'short' })} •{' '}
                        {matchDate.toLocaleTimeString('en-US', {
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
        {filteredMatches.length === 0 && (
          <div className="no-matches">
            No matches found {selectedLeague && `for ${selectedLeague}`}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllMatches;
