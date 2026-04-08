import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toDateKey, isSameDay, isInRange, HOLIDAYS, EVENTS } from '../utils/calendarUtils';
import './DayCell.css';

const DayCell = memo(function DayCell({
  dayObj, today, selectedRange, hoverDate, notes, onClick, onMouseEnter, onMouseLeave,
}) {
  const { date, isCurrentMonth } = dayObj;
  const key = toDateKey(date);

  const isToday = isSameDay(date, today);

  // Resolve effective range (real selection or hover preview)
  const effStart = selectedRange.start;
  const effEnd   = selectedRange.end || (effStart && hoverDate ? hoverDate : null);
  const rangeA   = effStart && effEnd ? (effStart <= effEnd ? effStart : effEnd) : effStart;
  const rangeB   = effStart && effEnd ? (effStart <= effEnd ? effEnd   : effStart) : null;

  const isStart  = isSameDay(date, rangeA);
  const isEnd    = rangeB ? isSameDay(date, rangeB) : false;
  const inRange  = isInRange(date, rangeA, rangeB);

  // Indicators
  const holiday  = HOLIDAYS[key];
  const event    = EVENTS[key];
  const dayNotes = notes.filter(n => {
    if (!n.startDate) return false;
    const s = new Date(n.startDate + 'T00:00:00');
    const e = n.endDate ? new Date(n.endDate + 'T00:00:00') : s;
    return date >= s && date <= e;
  });

  const hasTooltip = !!(holiday || event || dayNotes.length);
  const [showTip, setShowTip] = useState(false);

  const handleEnter = () => {
    onMouseEnter(date);
    if (hasTooltip) setShowTip(true);
  };
  const handleLeave = () => {
    onMouseLeave();
    setShowTip(false);
  };

  // Range strip visibility
  const showStrip = inRange || (isStart && rangeB) || (isEnd && rangeA);
  const stripCls  = ['range-strip', isStart && rangeB ? 'strip-start' : '', isEnd ? 'strip-end' : '']
    .filter(Boolean).join(' ');

  const cellCls = [
    'day-cell',
    !isCurrentMonth          && 'day-faded',
    isToday && !isStart && !isEnd && 'day-today',
    (isStart || isEnd)       && 'day-endpoint',
    inRange                  && 'day-in-range',
  ].filter(Boolean).join(' ');

  return (
    <div
      className="day-wrapper"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {showStrip && <div className={stripCls} />}

      <motion.div
        className={cellCls}
        onClick={() => isCurrentMonth && onClick(date)}
        whileHover={isCurrentMonth && !isStart && !isEnd ? { scale: 1.18 } : {}}
        whileTap={isCurrentMonth ? { scale: 0.88 } : {}}
        transition={{ type: 'spring', stiffness: 480, damping: 26 }}
        layout
      >
        <span className="day-num">{date.getDate()}</span>
        {(holiday || event || dayNotes.length > 0) && (
          <div className="day-dots">
            {holiday          && <span className="dot dot-red"   aria-label={holiday} />}
            {event            && <span className="dot dot-blue"  aria-label={event} />}
            {dayNotes.length > 0 && <span className="dot dot-amber" aria-label="Note" />}
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {showTip && hasTooltip && (
          <motion.div
            className="day-tip"
            role="tooltip"
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{   opacity: 0, y: 6, scale: 0.92 }}
            transition={{ duration: 0.13 }}
          >
            {holiday && <div className="tip-row">🔴 {holiday}</div>}
            {event   && <div className="tip-row">🔵 {event}</div>}
            {dayNotes.map(n => (
              <div key={n.id} className="tip-row">📝 {n.title}</div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default DayCell;
