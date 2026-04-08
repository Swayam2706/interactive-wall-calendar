import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './RangeSelector.css';

const fmt = d =>
  d ? d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : '—';

export default function RangeSelector({ selectedRange, onClear }) {
  const { start, end } = selectedRange;

  return (
    <AnimatePresence>
      {start && (
        <motion.div
          className="range-bar"
          initial={{ opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 }}
          animate={{ opacity: 1, height: 'auto', paddingTop: 8, paddingBottom: 8 }}
          exit={{   opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 }}
          transition={{ duration: 0.22, ease: 'easeInOut' }}
        >
          <div className="range-bar-icon">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8"  y1="2" x2="8"  y2="6"/>
              <line x1="3"  y1="10" x2="21" y2="10"/>
            </svg>
          </div>

          <div className="range-bar-content">
            <span className="range-bar-label">Selected Range</span>
            <span className="range-bar-dates">
              {fmt(start)}
              {end
                ? <><span className="range-arrow"> → </span>{fmt(end)}</>
                : <em className="range-hint"> — click an end date</em>
              }
            </span>
          </div>

          <motion.button
            className="range-clear-btn"
            onClick={onClear}
            aria-label="Clear date range"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6"  y1="6" x2="18" y2="18"/>
            </svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
