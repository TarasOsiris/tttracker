import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Trophy, History } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-logo">
          TableTennis<span>Tracker</span>
        </div>
        <div>
          <button className="nav-cta">
            Get the App
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-header">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Master Your <br />
          <span className="hero-title-highlight">
            Table Tennis Game
          </span>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          The ultimate companion for table tennis enthusiasts. Track matches, analyze performance, and climb the ranks.
        </motion.p>

        <motion.div
          className="store-buttons-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <StoreBadge store="appstore" />
          <StoreBadge store="playstore" />
        </motion.div>
      </header>

      {/* Mockup / Visual */}
      <motion.div
        className="mockup-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {/* Abstract Screen Content */}
        <div className="mockup-content">
          <div className="mockup-notch"></div>
          <div className="mockup-scoreboard">
            <div className="player-score blue">
              <span>11</span>
            </div>
            <div className="vs-badge">VS</div>
            <div className="player-score red">
              <span>9</span>
            </div>
          </div>
          <div className="mockup-list">
            {[1, 2, 3].map(i => (
              <div key={i} className="list-item">
                <div className="list-avatar"></div>
                <div className="list-text"></div>
              </div>
            ))}
          </div>

          <div className="mockup-fade"></div>
        </div>
      </motion.div>

      {/* Features */}
      <section className="features-section">
        <FeatureCard
          icon={<Activity />}
          title="Match Tracking"
          desc="Log every set and point with an intuitive interface designed for speed."
        />
        <FeatureCard
          icon={<History />}
          title="History Log"
          desc="Keep a permanent record of all your games and see how you improve over time."
        />
        <FeatureCard
          icon={<Trophy />}
          title="Rankings"
          desc="Compete with friends and visualize your standing in your local club."
        />
      </section>

      {/* CTA Footer */}
      <footer className="landing-footer">
        <h2 className="footer-title">Ready to serve?</h2>
        <div className="footer-buttons">
          <StoreBadge store="appstore" />
          <StoreBadge store="playstore" />
        </div>
        <p className="footer-credits">© {new Date().getFullYear()} TableTennisTracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="feature-card">
    <div className="feature-icon-wrapper">
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <h3 className="feature-title">{title}</h3>
    <p className="feature-desc">{desc}</p>
  </div>
);

const StoreBadge = ({ store }) => {
  const isAppStore = store === 'appstore';

  return (
    <a href="#" className="store-badge">
      <div className="store-badge-icon">
        {isAppStore ? (
          <svg viewBox="0 0 384 512" width="24" height="24" fill="currentColor">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" />
          </svg>
        ) : (
          <svg viewBox="0 0 512 512" width="24" height="24" fill="currentColor">
            <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
          </svg>
        )}
      </div>
      <div className="store-badge-text">
        <span className="store-badge-label">{isAppStore ? 'Download on the' : 'GET IT ON'}</span>
        <span className="store-badge-store">{isAppStore ? 'App Store' : 'Google Play'}</span>
      </div>
    </a>
  );
};

export default LandingPage;
