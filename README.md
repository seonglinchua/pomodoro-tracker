# 🍅 Pomodoro Tracker

A modern, feature-rich productivity app built with React, Vite, and Firebase that helps you manage your time using the Pomodoro Technique. Track your work sessions, visualize your productivity trends, and build better work habits.

## ✨ Features

### Implemented
- ⏱️ **Pomodoro Timer** - A flat-vector tomato kitchen timer: 25-minute work sessions, 5-minute short breaks and 15-minute long breaks, with a rotating minute dial, the countdown in the browser tab title, and a tomato that changes colour per session type
- 📊 **Session Tracking** - Every completed session is logged in your browser (localStorage) so the app works with no setup, and also backed up to Firebase Firestore when it is configured
- 📈 **Insights Dashboard** - Charts built from your own sessions
  - Stat tiles: focus sessions, focus time, total sessions and breaks
  - Area chart of focus minutes over the last 7 days
  - Donut chart of the session mix
  - Bar chart of work and break sessions per day
  - Recent sessions list
  - Shows clearly labelled demo data until you finish your first session
- 🎯 **Daily Goal & Streak** - Home shows today's progress toward an 8-session goal, minutes focused, and your day streak
- 🎨 **Modern UI** - Aurora-glass design with frosted surfaces, soft motion (respects reduced-motion) and a responsive layout
- 🌙 **Dark Mode** - Follows your system setting by default; toggle it any time and your choice is remembered
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🔄 **Firestore backup** - When configured, completed sessions are also written to Firestore (write-only for now; the dashboards read the local log)
- 🚀 **Auto-Deploy** - GitHub Actions automatically deploys to GitHub Pages
- ⚙️ **Settings Page** - Customize appearance and manage user data
- 🛡️ **Error Boundary** - Graceful error handling with helpful troubleshooting tips
- 💾 **localStorage-only Mode** - The full app works without Firebase configuration

### Coming Soon
- 🔐 User Authentication (currently using temporary user IDs)
- 🎯 Customizable daily goal (currently fixed at 8 sessions)
- 🔔 Notifications when sessions complete
- ⏰ Customizable timer durations
- 📝 Session notes and tags
- 📤 Export session history (CSV/PDF)

## 🛠 Tech Stack

- **Frontend:** React 19.1.1 + Vite 7.1.7
- **Styling:** Tailwind CSS 4.1.15
- **Backend:** Firebase 12.4.0 (Firestore + Analytics)
- **Charts:** Recharts (for statistics visualization)
- **Routing:** React Router DOM
- **Deployment:** GitHub Pages
- **CI/CD:** GitHub Actions

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js (v20 or higher)
- npm or yarn
- Git
- A Firebase account

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/seonglinchua/pomodoro-tracker.git
cd pomodoro-tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (or use existing)
3. Enable Firestore Database in test mode
4. Enable Google Analytics (optional)
5. Copy your Firebase configuration

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

> Note: Use the `.env.example` file as a template. The actual values should come from your Firebase project settings.

### 5. Run Locally

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 6. Build for Production

```bash
npm run build
```

## 💾 Running Without Firebase (localStorage-only Mode)

**NEW**: The app now supports running without Firebase configuration! This is perfect for:
- Quick testing and development
- Running the timer without data persistence
- Environments where Firebase is not available

### How it works:

1. **Without `.env.local` file**: The app will automatically detect missing Firebase configuration and run in localStorage-only mode
2. **Timer functionality**: All timer features work normally
3. **Sessions are kept locally**: They are stored in your browser's localStorage (not synced to any server)
4. **Insights page**: Works from your local sessions (demo data is shown until you finish one)

### To use localStorage-only mode:

Simply skip step 3 and 4 (Firebase setup) in the Quick Start guide and run:

```bash
npm install
npm run dev
```

You'll see a console message:
```
Firebase configuration not found. Running in localStorage-only mode.
To enable Firebase, create a .env.local file with your Firebase credentials.
```

Everything works, including Home and Insights. The only things you lose are the Firestore backup and syncing across browsers or devices.

## 📁 Project Structure

```
pomodoro-tracker/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Auto-deployment to GitHub Pages
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Timer.jsx           # SVG tomato timer + controls
│   │   ├── Navigation.jsx      # Top navigation bar
│   │   ├── Layout.jsx          # App layout wrapper
│   │   └── ErrorBoundary.jsx   # Error boundary for graceful error handling
│   ├── pages/
│   │   ├── Home.jsx            # Timer page with today's goal and streak
│   │   ├── Statistics.jsx      # Insights: charts and recent sessions
│   │   └── Settings.jsx        # App settings and theme toggle
│   ├── data/
│   │   └── mockData.js         # Demo sessions shown until you have real ones
│   ├── contexts/
│   │   ├── ThemeContext.jsx    # Dark mode context
│   │   └── TimerContext.jsx    # Timer state and session saving
│   ├── utils/
│   │   ├── sessionStore.js     # Local session log (localStorage) + useSessions hook
│   │   ├── stats.js            # Pure helpers: summaries, daily series, streak
│   │   ├── time.js             # mm:ss formatter
│   │   └── tempUser.js         # Temporary user ID management
│   ├── firebase.js             # Firebase configuration
│   ├── App.jsx                 # Main app with routing
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles (Tailwind v4 CSS config lives here)
├── .env.example                # Environment variables template
├── .env.local                  # Your environment variables (create locally, gitignored)
├── .gitignore
├── package.json
├── postcss.config.js           # PostCSS / Tailwind plugin configuration
├── vite.config.js              # Vite configuration
└── README.md
```

## 🎯 How to Use

### Starting a Pomodoro Session

1. Select your session type (Work, Short Break, or Long Break)
2. Click the "Start" button
3. Focus on your task while the timer counts down
4. When complete, the session is logged in your browser (and backed up to Firebase if configured)
5. Take a break or start another session!

### Viewing Insights

1. Click "Insights" in the navigation
2. See your productivity visualized with:
   - **Stat tiles** - Focus sessions, focus time, total sessions and breaks
   - **Area chart** - Focus minutes per day over the past week
   - **Donut chart** - Session type distribution
   - **Bar chart** - Work vs break sessions per day
   - **Recent sessions** - Your latest sessions

Until you finish a session, the page shows demo data and says so.

### Customizing Settings

1. Click "Settings" in the navigation
2. Toggle dark mode on/off
3. View your current user ID
4. Generate a new user ID, or clear your session history and user ID from this browser

## 📊 Firebase Firestore Schema

### Collections Structure

```
users/{tempUserId}/sessions/{sessionId}
```

> Firestore is currently a **write-only backup**: the app records sessions here but the dashboards read the local log. `date` is the **local** calendar day of the session.

### Session Document

```javascript
{
  type: "work" | "short break" | "long break",
  startTime: "2025-10-23T10:30:00.000Z",  // ISO timestamp
  endTime: "2025-10-23T10:55:00.000Z",    // ISO timestamp
  duration: 1500,                         // seconds (25 min = 1500s)
  date: "2025-10-23",                     // YYYY-MM-DD format
  completed: true
}
```

> ⚠️ **Security:** there is no authentication yet, and sessions are stored under a guessable temporary user ID. With Firestore in test mode, anyone can read or write the database. Treat this as a demo, and add Firebase Auth and security rules before storing real user data.

## 🔄 Automatic Deployment

The app automatically deploys to GitHub Pages when you push to the `main` branch.

### Setup GitHub Secrets (Optional for Full Features)

**Note**: GitHub secrets are **optional**. Without them, the deployed app will run in localStorage-only mode (timer-only, no statistics persistence).

To enable full Firebase features on GitHub Pages:

1. Go to your GitHub repository
2. Navigate to **Settings → Secrets and variables → Actions**
3. Add the following secrets with your Firebase credentials:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_MEASUREMENT_ID`

If you skip this step, the app will still deploy successfully but will run without Firebase (localStorage-only mode).

### Deployment Workflow

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will:
1. ✅ Checkout code
2. ✅ Setup Node.js 20
3. ✅ Install dependencies
4. ✅ Build with environment variables from secrets
5. ✅ Deploy to GitHub Pages

### Enable GitHub Pages

1. Go to **Settings → Pages**
2. Set **Source** to "GitHub Actions"
3. Your app will be available at: `https://seonglinchua.github.io/pomodoro-tracker/`

## 🧪 Development

### Available Scripts

```bash
npm run dev       # Start development server (Vite)
npm run build     # Build for production
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

### Development Workflow

```bash
# Create a feature branch
git checkout -b feature/your-feature

# Make changes and test
npm run dev

# Build and verify
npm run build
npm run preview

# Commit and push
git add .
git commit -m "Add feature: your feature description"
git push origin feature/your-feature
```

## 🌙 Dark Mode

Dark mode is implemented using:
- **Tailwind CSS** `dark:` classes, wired to the `.dark` class with a `@custom-variant` in `src/index.css` (Tailwind v4 defaults to the system setting)
- **React Context** for theme state management
- **localStorage** to remember an explicit choice; otherwise the system preference is used, applied before first paint by a small script in `index.html` so there is no flash

The theme automatically applies to all pages and components.

## 🔒 Security Note

Firebase credentials in `.env.local` are never committed to Git. For deployment, they're stored as GitHub Secrets and injected during the build process. This keeps your Firebase configuration secure while allowing automated deployments.

## 📈 Future Roadmap

- [ ] Firebase Authentication (Email/Password, Google Sign-in)
- [ ] User profiles and avatars
- [ ] Customizable timer durations in Settings
- [ ] Browser notifications when sessions complete
- [ ] Sound alerts (optional)
- [ ] Daily/weekly goal setting
- [ ] Achievement badges
- [ ] Session notes and tags
- [ ] Advanced filtering in statistics
- [ ] Export data to CSV/PDF
- [ ] Calendar view of sessions
- [ ] Team collaboration features
- [ ] Mobile app (React Native)

## 🐛 Troubleshooting

### Blank Page / App Not Loading

**FIXED**: This issue has been resolved! The app now includes:
- ✅ **Error Boundary**: Catches and displays errors with helpful troubleshooting tips
- ✅ **Graceful Firebase Handling**: App works without Firebase configuration
- ✅ **localStorage-only Mode**: Timer works even without database connection

If you still see a blank page:
1. Check browser console for errors (F12)
2. Clear browser cache and localStorage
3. Ensure dependencies are installed: `npm install`
4. Try building: `npm run build && npm run preview`

### Build Fails Locally
- Ensure Node.js version is v20+
- Run `npm install` to ensure dependencies are up to date
- Check for syntax errors in console output

### Firebase Connection Issues
- **Without Firebase**: App works fine in localStorage-only mode
- **With Firebase**: Verify `.env.local` has correct credentials
- Check Firebase Console for project status
- Ensure Firestore is enabled and in test mode

### GitHub Pages Deployment Fails
- Check GitHub Actions tab for error details
- Verify all secrets are set in repository settings
- Ensure `vite.config.js` has correct `base` path

### Insights Shows Demo Data
- That's expected until you finish your first session. Complete one on the Timer page and the page switches to your own stats.
- Sessions live in your browser's localStorage, so clearing site data, using a private window or switching browsers starts you from zero.

### Error Boundary Displayed
If you see the error boundary page:
1. Read the error message and stack trace
2. Check if `.env.local` file exists and is configured correctly
3. Try "Clear Data & Reload" button
4. Check browser console for additional details

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly (`npm run dev` and `npm run build`)
5. Commit with clear messages (`git commit -m 'Add amazing feature'`)
6. Push to your fork (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique) by Francesco Cirillo
- [React](https://react.dev) - UI library
- [Vite](https://vite.dev) - Build tool
- [Firebase](https://firebase.google.com) - Backend services
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Recharts](https://recharts.org) - Chart library
- Built with assistance from [Claude Code](https://claude.com/claude-code)

## 📧 Support

Need help? Here's how to get support:
- Open an [issue](https://github.com/seonglinchua/pomodoro-tracker/issues)
- Check the [troubleshooting section](#-troubleshooting)
- Review Firebase and React documentation

## 🎉 Start Your Productive Journey!

Track your focus sessions, visualize your productivity, and build better work habits with Pomodoro Tracker. Every session counts toward your goals!

---

**Made with ❤️ using React, Vite, Firebase, and Claude Code**
