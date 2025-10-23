# 🍅 Pomodoro Tracker

A modern, feature-rich productivity app built with React, Vite, and Firebase that helps you manage your time using the Pomodoro Technique. Track your work sessions, visualize your productivity trends, and build better work habits.

## ✨ Features

### Implemented
- ⏱️ **Pomodoro Timer** - 25-minute work sessions, 5-minute short breaks, 15-minute long breaks
- 📊 **Session Tracking** - All sessions automatically saved to Firebase Firestore
- 📈 **Statistics Dashboard** - Beautiful charts showing your productivity trends
  - Bar chart showing sessions by date
  - Pie chart showing session type breakdown
  - Summary cards with total sessions, minutes, and breakdowns
  - Recent sessions table with detailed history
- 🎨 **Modern UI** - Beautiful gradients, smooth animations, and responsive design
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🔄 **Real-time Sync** - All data synced to Firebase Firestore
- 🚀 **Auto-Deploy** - GitHub Actions automatically deploys to GitHub Pages
- ⚙️ **Settings Page** - Customize appearance and manage user data
- 🛡️ **Error Boundary** - Graceful error handling with helpful troubleshooting tips
- 💾 **localStorage-only Mode** - App works without Firebase configuration (timer-only mode)

### Coming Soon
- 🔐 User Authentication (currently using temporary user IDs)
- 🎯 Daily Goals with progress indicators
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
3. **No data persistence**: Session data won't be saved to Firestore (only logged to console)
4. **Statistics page**: Will show empty state with helpful message

### To use localStorage-only mode:

Simply skip step 3 and 4 (Firebase setup) in the Quick Start guide and run:

```bash
npm install
npm run dev
```

You'll see a console message:
```
Firebase configuration not found. Running in localStorage-only mode.
To enable Firebase, create a .env file with your Firebase credentials.
```

The app will work perfectly for timing your pomodoro sessions, just without the statistics persistence.

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
│   │   ├── Timer.jsx           # Main Pomodoro timer component
│   │   ├── Navigation.jsx      # Top navigation bar
│   │   ├── Layout.jsx          # App layout wrapper
│   │   └── ErrorBoundary.jsx   # Error boundary for graceful error handling
│   ├── pages/
│   │   ├── Home.jsx            # Timer page
│   │   ├── Statistics.jsx      # Charts and session history
│   │   └── Settings.jsx        # App settings and theme toggle
│   ├── contexts/
│   │   └── ThemeContext.jsx    # Dark mode context
│   ├── utils/
│   │   └── tempUser.js         # Temporary user ID management
│   ├── firebase.js             # Firebase configuration
│   ├── App.jsx                 # Main app with routing
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles
├── .env.example                # Environment variables template
├── .env.local                  # Your environment variables (gitignored)
├── .gitignore
├── package.json
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── README.md
```

## 🎯 How to Use

### Starting a Pomodoro Session

1. Select your session type (Work, Short Break, or Long Break)
2. Click the "Start" button
3. Focus on your task while the timer counts down
4. When complete, the session automatically saves to Firebase
5. Take a break or start another session!

### Viewing Statistics

1. Click "Statistics" in the navigation
2. See your productivity visualized with:
   - **Summary cards** - Total sessions, minutes, work/break counts
   - **Bar chart** - Sessions per day over the past week
   - **Pie chart** - Session type distribution
   - **Recent sessions table** - Detailed history of your last 10 sessions

### Customizing Settings

1. Click "Settings" in the navigation
2. Toggle dark mode on/off
3. View your current user ID
4. Generate a new user ID or clear all data if needed

## 📊 Firebase Firestore Schema

### Collections Structure

```
users/{tempUserId}/sessions/{sessionId}
```

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
- **Tailwind CSS** dark mode classes (`dark:`)
- **React Context** for theme state management
- **localStorage** for persistence across sessions

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

### Statistics Not Loading
- **Without Firebase**: Statistics will show "No sessions yet" message
- **With Firebase**:
  - Open browser console to check for errors
  - Verify Firebase Firestore rules allow reads
  - Ensure you have completed at least one session

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
