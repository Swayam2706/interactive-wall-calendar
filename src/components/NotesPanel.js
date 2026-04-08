import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { loadNotes, saveNotes } from '../utils/storage';
import { toDateKey } from '../utils/calendarUtils';
import './NotesPanel.css';

const fmtShort = dateStr => {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export default function NotesPanel({ selectedRange, currentDate, onNotesChange }) {
  const [notes,       setNotes]       = useState(() => loadNotes());
  const [title,       setTitle]       = useState('');
  const [body,        setBody]        = useState('');
  const [attachRange, setAttachRange] = useState(false);
  const [formOpen,    setFormOpen]    = useState(false);

  // Persist + bubble up whenever notes change
  useEffect(() => {
    saveNotes(notes);
    onNotesChange(notes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes]);

  // Auto-check "attach range" when user has a selection
  useEffect(() => {
    if (selectedRange.start) setAttachRange(true);
  }, [selectedRange.start]);

  const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;

  const monthNotes = notes.filter(n => {
    if (n.monthKey === monthKey) return true;
    if (n.startDate) {
      const d = new Date(n.startDate + 'T00:00:00');
      return (
        d.getFullYear() === currentDate.getFullYear() &&
        d.getMonth()    === currentDate.getMonth()
      );
    }
    return false;
  });

  const handleAdd = useCallback((e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const note = {
      id:        Date.now().toString(),
      title:     title.trim(),
      body:      body.trim(),
      startDate: attachRange && selectedRange.start ? toDateKey(selectedRange.start) : null,
      endDate:   attachRange && selectedRange.end   ? toDateKey(selectedRange.end)   : null,
      monthKey,
      createdAt: new Date().toISOString(),
    };
    setNotes(prev => [note, ...prev]);
    setTitle('');
    setBody('');
    setFormOpen(false);
  }, [title, body, attachRange, selectedRange, monthKey]);

  const handleDelete = useCallback((id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <div className="notes-panel">
      {/* Header */}
      <div className="notes-header">
        <div className="notes-title-group">
          <span className="notes-title">Notes</span>
          {monthNotes.length > 0 && (
            <span className="notes-badge">{monthNotes.length}</span>
          )}
        </div>
        <motion.button
          className={`notes-toggle-btn ${formOpen ? 'is-open' : ''}`}
          onClick={() => setFormOpen(v => !v)}
          whileTap={{ scale: 0.92 }}
          aria-label={formOpen ? 'Close note form' : 'Add note'}
        >
          {formOpen ? '✕' : '+ Add'}
        </motion.button>
      </div>

      {/* Add-note form */}
      <AnimatePresence>
        {formOpen && (
          <motion.form
            className="notes-form"
            onSubmit={handleAdd}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{   opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
          >
            <input
              className="notes-input"
              type="text"
              placeholder="Note title *"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              autoFocus
            />
            <textarea
              className="notes-input notes-textarea"
              placeholder="Details (optional)"
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={2}
            />
            <label className="notes-attach-label">
              <input
                type="checkbox"
                checked={attachRange}
                onChange={e => setAttachRange(e.target.checked)}
              />
              <span>Attach to date range</span>
              {attachRange && selectedRange.start && (
                <span className="attach-preview">
                  {fmtShort(toDateKey(selectedRange.start))}
                  {selectedRange.end ? ` → ${fmtShort(toDateKey(selectedRange.end))}` : ''}
                </span>
              )}
            </label>
            <div className="notes-form-actions">
              <button type="button" className="btn-ghost" onClick={() => setFormOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="btn-save">Save Note</button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Notes list */}
      <div className="notes-list">
        <AnimatePresence mode="popLayout">
          {monthNotes.length === 0 ? (
            <motion.div
              key="empty"
              className="notes-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              <p>No notes this month</p>
            </motion.div>
          ) : (
            monthNotes.map(note => (
              <motion.div
                key={note.id}
                className="note-card"
                initial={{ opacity: 0, x: -12, scale: 0.97 }}
                animate={{ opacity: 1, x: 0,   scale: 1 }}
                exit={{   opacity: 0, x: -12,  scale: 0.97 }}
                transition={{ duration: 0.22 }}
                layout
              >
                <div className="note-card-header">
                  <span className="note-card-title">{note.title}</span>
                  <button
                    className="note-card-del"
                    onClick={() => handleDelete(note.id)}
                    aria-label="Delete note"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6"  y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
                {note.body && <p className="note-card-body">{note.body}</p>}
                {note.startDate && (
                  <div className="note-card-range">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8"  y1="2" x2="8"  y2="6"/>
                      <line x1="3"  y1="10" x2="21" y2="10"/>
                    </svg>
                    <span>
                      {fmtShort(note.startDate)}
                      {note.endDate && note.endDate !== note.startDate
                        ? ` → ${fmtShort(note.endDate)}`
                        : ''}
                    </span>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
