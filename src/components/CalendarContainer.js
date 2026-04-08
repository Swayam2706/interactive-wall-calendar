import React, { useState, useCallback } from 'react';
import HeroImage from './HeroImage';
import MonthNavigation from './MonthNavigation';
import CalendarGrid from './CalendarGrid';
import NotesPanel from './NotesPanel';
import RangeSelector from './RangeSelector';
import './CalendarContainer.css';

// Spiral holes across the top
function SpiralBinding() {
  const holes = Array.from({ length: 14 });
  return (
    <div className="spiral-binding" aria-hidden="true">
      {holes.map((_, i) => (
        <div key={i} className="spiral-hole">
          <div className="spiral-coil" />
        </div>
      ))}
    </div>
  );
}

function HangingHook() {
  return (
    <div className="hanging-hook" aria-hidden="true">
      <div className="hook-nail" />
      <div className="hook-string" />
    </div>
  );
}

export default function CalendarContainer({
  currentDate, direction, selectedRange, hoverDate,
  onMonthChange, onDateClick, onHoverDate,
}) {
  const [notes, setNotes] = useState([]);

  const handleNotesChange = useCallback((n) => setNotes(n), []);

  return (
    <div className="wall-scene">
      <HangingHook />
      <div className="calendar-paper">
        <SpiralBinding />

        {/* Hero image top section */}
        <HeroImage currentDate={currentDate} direction={direction} />

        {/* Angled divider */}
        <div className="angled-divider" aria-hidden="true" />

        {/* Month nav sits just below hero */}
        <MonthNavigation currentDate={currentDate} onMonthChange={onMonthChange} />

        {/* Range indicator */}
        <RangeSelector
          selectedRange={selectedRange}
          onClear={() => onDateClick({ _reset: true })}
        />

        {/* Two-column body */}
        <div className="calendar-body">
          {/* Left: Notes (lined paper) */}
          <div className="notes-column">
            <NotesPanel
              selectedRange={selectedRange}
              currentDate={currentDate}
              onNotesChange={handleNotesChange}
            />
          </div>

          {/* Right: Calendar grid */}
          <div className="grid-column">
            <CalendarGrid
              currentDate={currentDate}
              direction={direction}
              selectedRange={selectedRange}
              hoverDate={hoverDate}
              notes={notes}
              onDateClick={onDateClick}
              onHoverDate={onHoverDate}
            />
          </div>
        </div>

        {/* Paper bottom curl */}
        <div className="paper-footer" />
      </div>
    </div>
  );
}
