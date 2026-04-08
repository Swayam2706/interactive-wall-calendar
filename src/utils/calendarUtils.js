export const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];
export const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
export const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

// Curated Unsplash images per month
export const MONTH_IMAGES = [
  'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=900&q=85', // Jan
  'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&q=85', // Feb
  'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=900&q=85', // Mar
  'https://images.unsplash.com/photo-1490750967868-88df5691cc5e?w=900&q=85', // Apr
  'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&q=85', // May
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=85', // Jun
  'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=900&q=85', // Jul
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=85', // Aug
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=85', // Sep
  'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&q=85', // Oct
  'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=900&q=85', // Nov
  'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=900&q=85', // Dec
];

export const HOLIDAYS = {
  '2026-01-01': "New Year's Day",
  '2026-01-19': 'MLK Day',
  '2026-02-16': "Presidents' Day",
  '2026-04-03': 'Good Friday',
  '2026-05-25': 'Memorial Day',
  '2026-07-04': 'Independence Day',
  '2026-09-07': 'Labor Day',
  '2026-11-26': 'Thanksgiving',
  '2026-12-25': 'Christmas Day',
  '2025-01-01': "New Year's Day",
  '2025-07-04': 'Independence Day',
  '2025-12-25': 'Christmas Day',
};

export const EVENTS = {
  '2026-04-10': 'Team Meeting',
  '2026-04-15': 'Project Deadline',
  '2026-04-22': 'Earth Day',
  '2026-05-01': 'Sprint Review',
  '2026-03-08': "Int'l Women's Day",
  '2026-06-21': 'Summer Solstice',
};

export function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
export function getFirstDayOfMonth(y, m) { return new Date(y, m, 1).getDay(); }

export function toDateKey(date) {
  if (!date) return null;
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}

export function isSameDay(a, b) {
  if (!a || !b) return false;
  return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();
}

export function isInRange(date, start, end) {
  if (!start || !end) return false;
  const t = date.getTime();
  const s = Math.min(start.getTime(), end.getTime());
  const e = Math.max(start.getTime(), end.getTime());
  return t > s && t < e;
}

export function buildCalendarDays(year, month) {
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  const daysInPrev = getDaysInMonth(year, month - 1);
  const days = [];
  for (let i = firstDay - 1; i >= 0; i--)
    days.push({ date: new Date(year, month - 1, daysInPrev - i), isCurrentMonth: false });
  for (let i = 1; i <= daysInMonth; i++)
    days.push({ date: new Date(year, month, i), isCurrentMonth: true });
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++)
    days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
  return days;
}
