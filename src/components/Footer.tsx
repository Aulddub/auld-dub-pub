import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 Auld Dub. All rights reserved.</p>
        <p>
          Website by{' '}
          <a 
            href="https://www.linkedin.com/in/shamilmusaev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="branding-link"
          >
            Musaev Branding
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;