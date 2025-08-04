import React from 'react';
import '../styles/PubQuiz.css';
import { FaTrophy, FaUsers, FaBrain, FaBeer } from 'react-icons/fa';
import pubquizImage from '../assets/pubquiz.png';

const PubQuiz: React.FC = () => {
  return (
    <section className="pub-quiz" id="quiz">
      <div className="quiz-bg">
        <div className="quiz-container">
          <h2>Pub Quiz</h2>
          
          <div className="quiz-content">
            <div className="quiz-info">
              <div className="quiz-description">
                <h3>Test Your Knowledge</h3>
                <p>
                  Join us every Thursday night for The Auld Dub's most entertaining pub quiz! 
                  Gather your friends, form a team, and compete for exciting prizes while 
                  enjoying our special quiz night deals on drinks and snacks.
                </p>
                <div className="quiz-features">
                  <div className="feature">
                    <FaUsers className="feature-icon" />
                    <span className="feature-text">2-6 Players per Team</span>
                  </div>
                  <div className="feature">
                    <FaTrophy className="feature-icon" />
                    <span className="feature-text">Weekly Prizes</span>
                  </div>
                  <div className="feature">
                    <FaBrain className="feature-icon" />
                    <span className="feature-text">6 Unique Rounds</span>
                  </div>
                  <div className="feature">
                    <FaBeer className="feature-icon" />
                    <span className="feature-text">Drink Specials</span>
                  </div>
                </div>
              </div>
              <img src={pubquizImage} alt="Pub Quiz Night" className="quiz-image" />
            </div>

            <div className="quiz-details">
              <div className="quiz-card">
                <h4>Weekly Schedule</h4>
                <div className="schedule-item">
                  <span className="time">19:30</span>
                  <span className="activity">Team Registration</span>
                </div>
                <div className="schedule-item">
                  <span className="time">20:00</span>
                  <span className="activity">Quiz Starts</span>
                </div>
                <div className="schedule-item">
                  <span className="time">22:00</span>
                  <span className="activity">Winners Announced</span>
                </div>
                <div className="quiz-rounds">
                  <h5>Quiz Rounds</h5>
                  <ul>
                    <li>General Knowledge</li>
                    <li>Music & Entertainment</li>
                    <li>Sports</li>
                    <li>History & Geography</li>
                    <li>Picture Round</li>
                    <li>Irish Culture</li>
                  </ul>
                </div>
              </div>

              <div className="quiz-prizes">
                <h4>Prizes</h4>
                <div className="prize-item">
                  <div className="prize-place">1st Place</div>
                  <div className="prize-value">€100 Bar Tab</div>
                </div>
                <div className="prize-item">
                  <div className="prize-place">2nd Place</div>
                  <div className="prize-value">€50 Bar Tab</div>
                </div>
                <div className="prize-item">
                  <div className="prize-place">3rd Place</div>
                  <div className="prize-value">€25 Bar Tab</div>
                </div>
                <div className="bonus-prize">
                  <span>Bonus Prize</span>
                  <p>Best Team Name wins a round of shots!</p>
                </div>
              </div>
            </div>
          </div>

          <div className="quiz-cta">
            <h3>Ready to Join?</h3>
            <p>
              Book your table now to secure your spot at our next quiz night. 
              Early booking is recommended as spaces fill up quickly!
            </p>
            <a href="https://booking-legacy.caspeco.net/public/webBooking?system=se_aulsto&unitId=13&v=1" className="book-quiz-button" target="_blank" rel="noopener noreferrer">Book Your Table</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PubQuiz;
