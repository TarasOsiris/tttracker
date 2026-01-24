import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, BarChart3, Timer, Target, Zap, Smartphone, ChevronLeft, ChevronRight } from 'lucide-react';
import './LandingPage.css';
import appStoreBadge from './assets/app-store-badge.svg';
import googlePlayBadge from './assets/google-play-badge.svg';

// Import screenshots
import screenshot1 from './assets/screenshots/Slice 1.png';
import screenshot2 from './assets/screenshots/Slice 2.png';
import screenshot3 from './assets/screenshots/Slice 3.png';
import screenshot4 from './assets/screenshots/Slice 4.png';
import screenshot5 from './assets/screenshots/Slice 5.png';
import screenshot6 from './assets/screenshots/Slice 6.png';
import screenshot7 from './assets/screenshots/Slice 7.png';
import screenshot8 from './assets/screenshots/Slice 8.png';

const screenshots = [
  screenshot1, screenshot2, screenshot3, screenshot4,
  screenshot5, screenshot6, screenshot7, screenshot8
];

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-logo">
          🏓 TableTennis<span>Tracker</span>
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
          Track Your 🏓<br />
          <span className="hero-title-highlight">
            Training Progress
          </span>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Log training sessions in under 30 seconds. Visualize your progress with beautiful heatmaps and stay consistent on your journey to table tennis mastery.
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

      {/* Screenshot Carousel */}
      <ScreenshotCarousel />

      {/* Session Types Section */}
      <section className="session-types-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Track Every Type of Training
        </motion.h2>
        <motion.div 
          className="session-types-grid"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SessionTypeChip label="Technique" color="blue" />
          <SessionTypeChip label="Match Play" color="green" />
          <SessionTypeChip label="Serve Practice" color="purple" />
          <SessionTypeChip label="Physical" color="orange" />
          <SessionTypeChip label="Free Play" color="pink" />
        </motion.div>
      </section>

      {/* Features */}
      <section className="features-section">
        <FeatureCard
          icon={<Timer />}
          title="Quick Logging"
          desc="Log your training sessions in under 30 seconds with an intuitive interface designed for speed."
        />
        <FeatureCard
          icon={<BarChart3 />}
          title="Heatmap Analytics"
          desc="Visualize your training consistency over the past year with a beautiful GitHub-style heatmap."
        />
        <FeatureCard
          icon={<Calendar />}
          title="Calendar View"
          desc="Browse sessions by date with flexible week and month views. See your training at a glance."
        />
        <FeatureCard
          icon={<Target />}
          title="RPE Tracking"
          desc="Record intensity using the Rate of Perceived Exertion scale to balance your training load."
        />
        <FeatureCard
          icon={<Zap />}
          title="Session Details"
          desc="Add duration, notes, and session types. Review and edit your training history anytime."
        />
        <FeatureCard
          icon={<Smartphone />}
          title="Cross-Platform"
          desc="Available on iOS, Android, and Desktop. Your training data syncs seamlessly across devices."
        />
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Questions or Suggestions?
        </motion.h2>
        <motion.p
          className="contact-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We'd love to hear from you! Reach out at{' '}
          <a href="mailto:info@ninevastudios.com" className="contact-email">
            info@ninevastudios.com
          </a>
        </motion.p>
      </section>

      {/* CTA Footer */}
      <footer className="landing-footer">
        <h2 className="footer-title">Ready to level up your game?</h2>
        <p className="footer-subtitle">Start tracking your training today. It's free.</p>
        <div className="footer-buttons">
          <StoreBadge store="appstore" />
          <StoreBadge store="playstore" />
        </div>
        <p className="footer-credits">© {new Date().getFullYear()} TableTennisTracker. All rights reserved.</p>
        <p className="footer-made-with">Made with ❤️ at <a href="https://ninevastudios.com" target="_blank" rel="noopener noreferrer">Nineva Studios</a></p>
      </footer>
    </div>
  );
};

const ScreenshotCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screenshots.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  return (
    <motion.div
      className="carousel-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <button className="carousel-btn carousel-btn-left" onClick={goToPrevious} aria-label="Previous screenshot">
        <ChevronLeft size={24} />
      </button>

      <div className="carousel-phone-frame">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={screenshots[currentIndex]}
            alt={`App screenshot ${currentIndex + 1}`}
            className="carousel-screenshot"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
      </div>

      <button className="carousel-btn carousel-btn-right" onClick={goToNext} aria-label="Next screenshot">
        <ChevronRight size={24} />
      </button>

      <div className="carousel-dots">
        {screenshots.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to screenshot ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

const SessionTypeChip = ({ label, color }) => (
  <div className={`session-type-chip ${color}`}>
    {label}
  </div>
);

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
  const href = isAppStore
    ? 'https://apps.apple.com/us/app/tt-training-tracker/id6758044383'
    : 'https://play.google.com/store/apps/details?id=xyz.tleskiv.tt';

  return (
    <a
      href={href}
      className="store-badge-link"
      target={isAppStore ? undefined : '_blank'}
      rel={isAppStore ? undefined : 'noopener noreferrer'}
      aria-label={isAppStore ? 'Download on the App Store' : 'Get it on Google Play'}
    >
      <img
        src={isAppStore ? appStoreBadge : googlePlayBadge}
        alt={isAppStore ? 'Download on the App Store' : 'Get it on Google Play'}
        className="store-badge-img"
      />
    </a>
  );
};

export default LandingPage;
