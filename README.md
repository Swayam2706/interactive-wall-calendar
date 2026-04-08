# 📅 Interactive Wall Calendar

A premium, portfolio-quality interactive wall calendar component built with React.js. Designed to look and feel like a real physical hanging wall calendar — complete with spiral binding, a hanging nail, hero photography, and smooth Framer Motion animations.

Built as a frontend internship assessment project.

---

## ✨ Features

### Wall Calendar Aesthetic
- Realistic paper card with soft drop shadow and subtle texture
- Spiral binding holes across the top
- Hanging nail and string above the calendar
- Geometric angled hero-to-grid transition (mimics physical calendar design)
- Lined-paper notes section with red margin line

### Hero Image
- Full-width monthly photography from Unsplash
- Multi-stop gradient overlay for text readability
- Animated month/year typography with Framer Motion
- Season badge (Spring / Summer / Autumn / Winter)
- Smooth directional slide + scale transition on month change

### Calendar Grid
- Full 7-column (Sun–Sat) monthly layout
- Overflow days from previous/next months (lighter color)
- Today's date highlighted with a dark circular badge
- Sunday column tinted red
- Hover scale animation on each date cell

### Date Range Selection
- Click once → sets start date (bold red circle)
- Click again → sets end date (bold red circle)
- Dates between → connected soft highlight bar
- Hover preview shows potential range before confirming
- Animated range bar below navigation showing selected dates
- One-click clear button

### Holiday & Event Indicators
- 🔴 Red dot — public holidays
- 🔵 Blue dot — events
- 🟡 Amber dot — notes attached to that date
- Tooltip on hover showing all indicators for that day

### Notes Panel
- Lined-paper styled left column
- Add notes with title + optional description
- Attach notes to a selected date range
- Notes displayed as clean cards with left accent border
- Delete individual notes
- All notes persisted in **localStorage** — survive page refresh

### Month Navigation
- Previous / Next month buttons with hover + scale animations
- "Today" shortcut pill appears when viewing a different month
- Animated calendar grid slides left/right on month change

### Responsive Design
- Desktop: centered hanging wall calendar layout
- Mobile: stacks vertically (hero → nav → grid → notes)
- Touch-friendly tap targets throughout

---

## 🛠 Tech Stack

| Technology     | Usage                                      |
|----------------|--------------------------------------------|
| React 18       | Functional components, hooks               |
| JavaScript ES6+| Arrow functions, destructuring, modules    |
| HTML5          | Semantic markup, accessibility attributes  |
| CSS3           | Custom properties, grid, clip-path, animations |
| Bootstrap 5    | Responsive grid utilities                  |
| Framer Motion  | Page transitions, micro-interactions       |
| localStorage   | Client-side note persistence               |

---

## 📁 Project Structure

```
wall-calendar/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── CalendarContainer.js   # Paper card, spiral binding, layout
│   │   ├── CalendarContainer.css
│   │   ├── HeroImage.js           # Animated monthly hero photo
│   │   ├── HeroImage.css
│   │   ├── MonthNavigation.js     # Prev/Next + Today controls
│   │   ├── MonthNavigation.css
│   │   ├── CalendarGrid.js        # Animated 7-column grid
│   │   ├── CalendarGrid.css
│   │   ├── DayCell.js             # Day cell: range, dots, tooltip
│   │   ├── DayCell.css
│   │   ├── RangeSelector.js       # Selected range display bar
│   │   ├── RangeSelector.css
│   │   ├── NotesPanel.js          # Lined-paper notes with localStorage
│   │   └── NotesPanel.css
│   ├── utils/
│   │   ├── calendarUtils.js       # Date helpers, holidays, events, images
│   │   └── storage.js             # localStorage read/write
│   ├── App.js                     # Root state management
│   ├── App.css
│   ├── index.js
│   └── index.css                  # CSS custom properties, global styles
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/your-username/wall-calendar.git

# Navigate into the project
cd wall-calendar

# Install dependencies
npm install

# Start the development server
npm start
```

The app opens at **http://localhost:3000**

### Production Build

```bash
npm run build
```

Output is in the `build/` folder — ready to serve as a static site.

---

## 🎮 How to Use

| Action | How |
|--------|-----|
| Navigate months | Click ← / → arrows |
| Jump to today | Click the "Today" pill (visible when away from current month) |
| Select a date range | Click start date, then click end date |
| Clear selection | Click ✕ in the range bar |
| Add a note | Click "+ Add" in the Notes panel |
| Attach note to range | Check "Attach to date range" in the form |
| Delete a note | Click ✕ on any note card |
| View event info | Hover over any date with a colored dot |

---

## 🔮 Future Improvements

- [ ] Export calendar as PDF or image
- [ ] Drag-to-select date ranges
- [ ] Recurring events support
- [ ] Dark mode toggle
- [ ] Custom event creation (color picker)
- [ ] Week view alongside month view
- [ ] iCal / Google Calendar import
- [ ] Multi-user sync via a backend API

---

## 📄 License

MIT — free to use for personal and commercial projects.
