import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MONTH_IMAGES, MONTH_NAMES } from '../utils/calendarUtils';
import './HeroImage.css';

const SEASONS = {
  0: 'Winter', 1: 'Winter', 2: 'Spring',
  3: 'Spring', 4: 'Spring', 5: 'Summer',
  6: 'Summer', 7: 'Summer', 8: 'Autumn',
  9: 'Autumn', 10: 'Autumn', 11: 'Winter',
};

export default function HeroImage({ currentDate, direction }) {
  const month = currentDate.getMonth();
  const year  = currentDate.getFullYear();
  const key   = `${year}-${month}`;

  return (
    <div className="hero-wrap">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={key}
          className="hero-inner"
          custom={direction}
          initial={{ opacity: 0, scale: 1.06, x: direction > 0 ? 40 : -40 }}
          animate={{ opacity: 1, scale: 1,    x: 0 }}
          exit={{   opacity: 0, scale: 0.96,  x: direction > 0 ? -40 : 40 }}
          transition={{ duration: 0.52, ease: [0.4, 0, 0.2, 1] }}
        >
          <img
            src={MONTH_IMAGES[month]}
            alt={`${MONTH_NAMES[month]} ${year}`}
            className="hero-img"
            onError={e => {
              e.target.style.display = 'none';
            }}
          />
          <div className="hero-overlay" />
          <div className="hero-angle" />

          <div className="hero-text">
            <motion.div
              className="hero-month-name"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0,  opacity: 1 }}
              transition={{ delay: 0.16, duration: 0.42, ease: 'easeOut' }}
            >
              {MONTH_NAMES[month]}
            </motion.div>
            <motion.div
              className="hero-year"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0,  opacity: 1 }}
              transition={{ delay: 0.26, duration: 0.38, ease: 'easeOut' }}
            >
              {year}
            </motion.div>
          </div>

          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.32, duration: 0.35 }}
          >
            {SEASONS[month]}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
