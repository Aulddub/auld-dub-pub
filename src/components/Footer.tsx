import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const foundingYear = 2025;
  const copyrightYear = currentYear > foundingYear ? `${foundingYear}-${currentYear}` : `${foundingYear}`;

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {copyrightYear} Auld Dub. All rights reserved.</p>
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