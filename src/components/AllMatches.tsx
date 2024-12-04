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
    return <div className="loading">Loading matches...</div>;
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
            {dateMatches.map((match) => (
              <div key={match.id} className="match-card">
                <div className="match-league">{match.league}</div>
                <div className="teams">
                  <span className="team">{match.team1}</span>
                  <span className="vs">VS</span>
                  <span className="team">{match.team2}</span>
                </div>
                <div className="match-time">{match.time}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {filteredMatches.length === 0 && (
        <div className="no-matches">
          No matches found {selectedLeague && `for ${selectedLeague}`}
        </div>
      )}
    </div>
  );
};

export default AllMatches;
