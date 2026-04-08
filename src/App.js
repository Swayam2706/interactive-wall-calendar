import React, { useState, useCallback } from 'react';
import CalendarContainer from './components/CalendarContainer';
import './App.css';

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
  const [hoverDate, setHoverDate] = useState(null);
  const [direction, setDirection] = useState(1);

  const handleMonthChange = useCallback((dir) => {
    // dir === 0 means "jump to today"
    if (dir === 0) {
      const now = new Date();
      const diff =
        (now.getFullYear() - currentDate.getFullYear()) * 12 +
        (now.getMonth() - currentDate.getMonth());
      setDirection(diff >= 0 ? 1 : -1);
      setCurrentDate(new Date());
    } else {
      setDirection(dir);
      setCurrentDate(prev => {
        const d = new Date(prev);
        d.setMonth(d.getMonth() + dir);
        return d;
      });
    }
    setSelectedRange({ start: null, end: null });
    setHoverDate(null);
  }, [currentDate]);

  const handleDateClick = useCallback((date) => {
    if (!date || date?._reset) {
      setSelectedRange({ start: null, end: null });
      return;
    }
    setSelectedRange(prev => {
      if (!prev.start || (prev.start && prev.end)) return { start: date, end: null };
      if (date < prev.start) return { start: date, end: prev.start };
      return { start: prev.start, end: date };
    });
  }, []);

  return (
    <div className="app-root">
      <CalendarContainer
        currentDate={currentDate}
        direction={direction}
        selectedRange={selectedRange}
        hoverDate={hoverDate}
        onMonthChange={handleMonthChange}
        onDateClick={handleDateClick}
        onHoverDate={setHoverDate}
      />
    </div>
  );
}
