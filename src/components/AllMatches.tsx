import React from 'react';
import '../styles/AllMatches.css';

const AllMatches: React.FC = () => {
  const allMatches = [
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
    },
    {
      league: "Premier League",
      match: "Arsenal vs Chelsea",
      date: "Sunday, Dec 17",
      time: "16:30"
    },
    {
      league: "Champions League",
      match: "Bayern Munich vs Barcelona",
      date: "Wednesday, Dec 21",
      time: "20:00"
    },
    {
      league: "GAA Football",
      match: "Dublin vs Kerry",
      date: "Saturday, Dec 24",
      time: "15:00"
    },
    {
      league: "Rugby Champions Cup",
      match: "Leinster vs Toulouse",
      date: "Friday, Dec 23",
      time: "19:45"
    },
    {
      league: "Premier League",
      match: "Manchester City vs Tottenham",
      date: "Monday, Dec 19",
      time: "20:00"
    }
  ];

  return (
    <div className="all-matches">
      <div className="all-matches-container">
        <h2>All Upcoming Matches</h2>
        
        <div className="matches-filters">
          <button className="filter-button active">All</button>
          <button className="filter-button">Football</button>
          <button className="filter-button">Rugby</button>
          <button className="filter-button">GAA</button>
        </div>

        <div className="matches-grid">
          {allMatches.map((match, index) => (
            <div className="match-card" key={index}>
              <div className="match-league">{match.league}</div>
              <div className="match-teams">{match.match}</div>
              <div className="match-datetime">
                <div className="match-date">{match.date}</div>
                <div className="match-time">{match.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMatches;
