import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { buildCalendarDays, DAY_NAMES, toDateKey } from '../utils/calendarUtils';
import DayCell from './DayCell';
import './CalendarGrid.css';

const variants = {
  enter: (dir) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -50 : 50, opacity: 0 }),
};

export default function CalendarGrid({
  currentDate, direction, selectedRange, hoverDate, notes, onDateClick, onHoverDate,
}) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();
  const days = buildCalendarDays(year, month);
  const key = `${year}-${month}`;

  return (
    <div className="cal-grid-wrap">
      <div className="cal-day-headers">
        {DAY_NAMES.map(d => <div key={d} className="cal-day-header">{d}</div>)}
      </div>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={key}
          className="cal-days"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.28, ease: 'easeInOut' }}
        >
          {days.map((dayObj) => (
            <DayCell
              key={toDateKey(dayObj.date)}
              dayObj={dayObj}
              today={today}
              selectedRange={selectedRange}
              hoverDate={hoverDate}
              notes={notes}
              onClick={onDateClick}
              onMouseEnter={onHoverDate}
              onMouseLeave={() => onHoverDate(null)}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
