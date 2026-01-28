import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, BarChart3, Timer, Target, Zap, Smartphone, ChevronLeft, ChevronRight, Send } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col items-center overflow-x-hidden relative">
      {/* Background decorations */}
      <div className="fixed w-[280px] h-[400px] top-[-60px] right-[-80px] opacity-[0.06] -z-10 pointer-events-none bg-[url('/racket.svg')] bg-no-repeat bg-contain rotate-[15deg]" />
      <div className="fixed w-[200px] h-[280px] bottom-[10%] left-[-50px] opacity-[0.06] -z-10 pointer-events-none bg-[url('/racket.svg')] bg-no-repeat bg-contain -rotate-[25deg]" />

      {/* Navigation */}
      <nav className="w-full px-6 py-6 flex justify-between items-center max-w-6xl mx-auto">
        <div className="text-2xl font-bold tracking-tighter text-primary">
          🏓 TableTennis<span className="text-tertiary">Tracker</span>
        </div>
      </nav>

      {/* Telegram Community Banner */}
      <motion.div
        className="w-full max-w-6xl mt-8 px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-gradient-to-br from-green-500/15 to-emerald-500/10 border-2 border-green-500/30 rounded-2xl px-6 py-6 flex flex-col md:flex-row items-center gap-4 text-center md:text-left shadow-[0_8px_32px_rgba(34,197,94,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(34,197,94,0.2)] hover:border-green-500/40 md:justify-between md:px-8 md:py-8">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white flex-shrink-0 shadow-[0_4px_16px_rgba(34,197,94,0.3)]">
            <Send size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold mb-1 text-green-300">Join Our Community</h3>
            <p className="text-[0.95rem] md:text-base opacity-85 text-white/90">Get support, share feedback, and connect with other players</p>
          </div>
          <a
            href="https://t.me/tttrackerapp"
            target="_blank"
            rel="noopener noreferrer"
            className="py-3.5 px-8 rounded-full font-bold text-base bg-gradient-to-br from-green-500 to-emerald-600 text-white transition-all duration-300 whitespace-nowrap shadow-[0_4px_16px_rgba(34,197,94,0.3)] hover:scale-105 hover:shadow-[0_6px_20px_rgba(34,197,94,0.4)] active:scale-[0.98]"
          >
            Join @tttrackerapp
          </a>
        </div>
      </motion.div>

      {/* Hero Section */}
      <header className="flex flex-col items-center text-center mt-20 px-6 max-w-4xl mx-auto">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Track Your 🏓<br />
          <span className="bg-gradient-to-br from-primary to-tertiary bg-clip-text text-transparent">
            Training Progress
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-12 max-w-2xl opacity-80 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Log training sessions in under 30 seconds. Visualize your progress with beautiful heatmaps and stay consistent on your journey to table tennis mastery.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
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
      <section className="py-16 px-6 w-full max-w-6xl mx-auto text-center">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Track Every Type of Training
        </motion.h2>
        <motion.div 
          className="flex flex-wrap justify-center gap-3"
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
      <section className="pt-16 pb-32 px-6 w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <section className="pt-16 pb-16 px-6 w-full max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-2xl md:text-3xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Questions or Suggestions?
        </motion.h2>
        <motion.p
          className="text-lg opacity-80 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We'd love to hear from you! Reach out at{' '}
          <a href="mailto:info@ninevastudios.com" className="text-primary font-semibold hover:opacity-80 hover:underline transition-opacity duration-200">
            info@ninevastudios.com
          </a>
        </motion.p>
      </section>

      {/* CTA Footer */}
      <footer className="w-full py-20 px-6 text-center bg-black/20">
        <h2 className="text-3xl font-bold mb-3">Ready to level up your game?</h2>
        <p className="text-lg opacity-70 mb-8">Start tracking your training today. It's free.</p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
          <StoreBadge store="appstore" />
          <StoreBadge store="playstore" />
        </div>
        <p className="mt-12 opacity-40 text-sm">© {new Date().getFullYear()} TableTennisTracker. All rights reserved.</p>
        <p className="mt-3 opacity-50 text-sm">
          Made with ❤️ at <a href="https://ninevastudios.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-80 transition-opacity duration-200">Nineva Studios</a>
        </p>
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
      className="mt-20 relative flex items-center justify-center gap-4 px-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <button 
        className="absolute top-1/2 -translate-y-1/2 left-0 md:left-[-60px] w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white/80 flex items-center justify-center cursor-pointer transition-all duration-200 z-10 hover:bg-white/20 hover:text-white" 
        onClick={goToPrevious} 
        aria-label="Previous screenshot"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="relative w-full max-w-[320px] md:max-w-[400px] overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={screenshots[currentIndex]}
            alt={`App screenshot ${currentIndex + 1}`}
            className="w-full h-auto block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
      </div>

      <button 
        className="absolute top-1/2 -translate-y-1/2 right-0 md:right-[-60px] w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white/80 flex items-center justify-center cursor-pointer transition-all duration-200 z-10 hover:bg-white/20 hover:text-white" 
        onClick={goToNext} 
        aria-label="Next screenshot"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-[-2.5rem] left-1/2 -translate-x-1/2 flex gap-2">
        {screenshots.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full border-none cursor-pointer transition-all duration-200 p-0 ${
              index === currentIndex 
                ? 'bg-primary w-6 rounded' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to screenshot ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

const SessionTypeChip = ({ label, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    green: 'bg-green-500/20 text-green-300 border border-green-500/30',
    purple: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    orange: 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
    pink: 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
  };

  return (
    <div className={`py-2.5 px-5 rounded-full font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] ${colorClasses[color]}`}>
      {label}
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 rounded-2xl bg-white/5 border border-white/10 transition-colors duration-300 hover:bg-white/10">
    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-secondary-container text-on-secondary-container">
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="opacity-70 leading-relaxed">{desc}</p>
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
      className="inline-block transition-all duration-200 hover:scale-105 active:scale-[0.98]"
      target={isAppStore ? undefined : '_blank'}
      rel={isAppStore ? undefined : 'noopener noreferrer'}
      aria-label={isAppStore ? 'Download on the App Store' : 'Get it on Google Play'}
    >
      <img
        src={isAppStore ? appStoreBadge : googlePlayBadge}
        alt={isAppStore ? 'Download on the App Store' : 'Get it on Google Play'}
        className="h-[54px] md:h-16 w-auto"
      />
    </a>
  );
};

export default LandingPage;
