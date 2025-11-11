import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo-section">
          <svg className="logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="50" height="50">
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#667eea', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#764ba2', stopOpacity: 1}} />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="95" fill="url(#logoGrad)"/>
            <rect x="60" y="50" width="80" height="100" rx="5" fill="white" opacity="0.9"/>
            <rect x="70" y="70" width="60" height="4" rx="2" fill="#667eea"/>
            <rect x="70" y="85" width="50" height="4" rx="2" fill="#667eea" opacity="0.7"/>
            <rect x="70" y="100" width="55" height="4" rx="2" fill="#667eea" opacity="0.7"/>
            <rect x="70" y="115" width="45" height="4" rx="2" fill="#667eea" opacity="0.5"/>
            <path d="M100 40 L140 55 L100 70 L60 55 Z" fill="#764ba2"/>
            <rect x="95" y="70" width="10" height="25" fill="#764ba2"/>
            <circle cx="105" cy="98" r="4" fill="#fbbf24"/>
          </svg>
          <div className="logo-text">
            <h1>Student Portfolio</h1>
            <p>Showcase Your Achievements</p>
          </div>
        </div>
        <nav className="header-nav">
          <a href="#profile" className="nav-link">Profile</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#achievements" className="nav-link">Achievements</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
