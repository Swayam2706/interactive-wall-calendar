import React from 'react';
import { motion } from 'framer-motion';
import { MONTH_NAMES } from '../utils/calendarUtils';
import './MonthNavigation.css';

const ChevronLeft = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function MonthNavigation({ currentDate, onMonthChange }) {
  const month = currentDate.getMonth();
  const year  = currentDate.getFullYear();
  const isCurrentMonth =
    currentDate.getMonth() === new Date().getMonth() &&
    currentDate.getFullYear() === new Date().getFullYear();

  return (
    <div className="month-nav">
      <motion.button
        className="nav-btn"
        onClick={() => onMonthChange(-1)}
        whileHover={{ scale: 1.12, color: '#fff', backgroundColor: 'var(--ink)' }}
        whileTap={{ scale: 0.88 }}
        aria-label="Previous month"
      >
        <ChevronLeft />
      </motion.button>

      <div className="nav-center">
        <span className="nav-month">{MONTH_NAMES[month]}</span>
        <span className="nav-year">{year}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {!isCurrentMonth && (
          <motion.button
            className="nav-today-btn"
            onClick={() => onMonthChange(0)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Jump to today"
          >
            Today
          </motion.button>
        )}
        <motion.button
          className="nav-btn"
          onClick={() => onMonthChange(1)}
          whileHover={{ scale: 1.12, color: '#fff', backgroundColor: 'var(--ink)' }}
          whileTap={{ scale: 0.88 }}
          aria-label="Next month"
        >
          <ChevronRight />
        </motion.button>
      </div>
    </div>
  );
}
