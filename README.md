# 🍅 Pomodoro Tracker

A productivity app built with React and Firebase that helps you manage your time using the Pomodoro Technique. Track your work sessions, monitor your productivity trends, and achieve your daily goals.

**Live Demo:** [https://your-username.github.io/pomodoro-tracker](https://your-username.github.io/pomodoro-tracker)

## ✨ Features

- ⏱️ **Pomodoro Timer** - 25-minute work sessions and 5-minute breaks
- 📊 **Session Tracking** - Real-time session history synced with Firebase
- 📈 **Productivity Charts** - Visualize your productivity trends over time
- 🎯 **Daily Goals** - Set and track daily session goals with progress indicators
- 🔐 **User Authentication** - Secure login/signup with Firebase Auth
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🌙 **Dark Mode** - Easy on the eyes during late-night work sessions
- 💾 **Cloud Sync** - All data synced to Firebase Firestore in real-time

## 🛠 Tech Stack

- **Frontend:** React.js
- **Backend:** Firebase (Authentication + Firestore)
- **Charting:** Recharts
- **Routing:** React Router
- **Deployment:** GitHub Pages
- **CI/CD:** GitHub Actions

## 📋 Prerequisites

Before you begin, make sure you have:

- Node.js (v14 or higher)
- npm or yarn
- Git
- A GitHub account
- A Firebase account

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/pomodoro-tracker.git
cd pomodoro-tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project called "pomodoro-tracker"
3. Enable Authentication (Email/Password method)
4. Create a Firestore Database in test mode
5. Copy your Firebase config

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 5. Run Locally

```bash
npm start
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
pomodoro-tracker/
├── public/
├── src/
│   ├── components/
│   │   ├── Timer.jsx           # Main timer component
│   │   ├── SessionHistory.jsx  # Display past sessions
│   │   ├── StatsChart.jsx      # Productivity charts
│   │   ├── GoalSetting.jsx     # Daily goal configuration
│   │   └── Navigation.jsx      # App navigation
│   ├── pages/
│   │   ├── Home.jsx            # Dashboard/home page
│   │   ├── Stats.jsx           # Statistics and charts
│   │   └── Settings.jsx        # User settings
│   ├── firebase/
│   │   └── config.js           # Firebase configuration
│   ├── hooks/
│   │   └── useAuth.js          # Custom auth hook
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # Global styles
│   └── index.js
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions deployment
├── .env.local                  # Environment variables (git ignored)
├── .gitignore
├── package.json
└── README.md
```

## 🎯 How to Use

### Starting a Session

1. Click the "Start" button on the timer
2. The timer will count down from 25 minutes
3. Focus on your work task
4. When the timer ends, take a 5-minute break
5. Your session is automatically saved to your history

### Tracking Progress

1. Navigate to the "Stats" page to see:
   - Daily session count
   - Weekly trends (line chart)
   - Session type breakdown (pie chart)
   - Total hours focused

### Setting Goals

1. Go to "Settings"
2. Set your daily session goal (e.g., 8 sessions)
3. On the home page, your progress toward the goal displays
4. Earn badges for hitting goals!

### Viewing History

- Sessions automatically appear in your session history
- Filter by date or session type
- See real-time stats updated as you complete sessions

## 📊 Firebase Firestore Schema

### Collections

**users**
```
{
  uid: string,
  email: string,
  dailyGoal: number,
  createdAt: timestamp
}
```

**sessions**
```
{
  userId: string,
  sessionType: "work" | "break",
  duration: number (minutes),
  completedAt: timestamp,
  date: string (YYYY-MM-DD)
}
```

## 🔄 GitHub Actions Deployment

The app automatically deploys to GitHub Pages when you push to the `main` branch.

### Setup GitHub Actions

1. Go to your repository settings
2. Navigate to **Secrets and Variables → Actions**
3. Add the following secrets:
   - `FIREBASE_API_KEY`
   - `FIREBASE_AUTH_DOMAIN`
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_STORAGE_BUCKET`
   - `FIREBASE_MESSAGING_SENDER_ID`
   - `FIREBASE_APP_ID`

The workflow will:
- ✅ Install dependencies
- ✅ Build the React app
- ✅ Deploy to GitHub Pages

### Manual Deployment

```bash
npm run deploy
```

## 🧪 Testing

```bash
# Run tests
npm test

# Build for production
npm run build

# Eject configuration (not recommended)
npm run eject
```

## 🌳 Development Workflow

### Creating a New Feature

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "Add your feature description"

# Push to GitHub
git push origin feature/your-feature-name

# Create a Pull Request on GitHub
```

### Committing Changes

Use clear, descriptive commit messages:

```bash
git commit -m "Add timer pause functionality"
git commit -m "Fix Firestore data syncing issue"
git commit -m "Improve mobile responsive design"
```

## 🚀 Using Claude Code

To build features with Claude Code:

```bash
claude-code "Create a timer component with start/pause/reset buttons"
claude-code "Add Firebase Firestore integration to save sessions"
claude-code "Create charts showing weekly productivity trends"
```

## 📈 Future Enhancements

- [ ] Push notifications when session ends
- [ ] Share productivity achievements
- [ ] Team/group sessions
- [ ] Customizable timer durations
- [ ] Session notes and tags
- [ ] Export session history (CSV/PDF)
- [ ] Achievements and badges system
- [ ] Mobile app with React Native
- [ ] Browser notifications and sound alerts
- [ ] Calendar view of completed sessions

## 🐛 Troubleshooting

### Firebase Connection Issues
- Verify `.env.local` has correct Firebase credentials
- Check Firestore is in test mode or properly configured
- Ensure Firebase project has Authentication enabled

### GitHub Pages Not Updating
- Clear your browser cache
- Check GitHub Actions tab for deployment status
- Verify secrets are set correctly in Settings

### Timer Not Saving Sessions
- Check browser console for errors
- Verify user is logged in
- Confirm Firestore rules allow writes

## 📝 Environment Variables

All environment variables should be prefixed with `REACT_APP_` to be accessible in the React app:

```
REACT_APP_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID
```

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique) by Francesco Cirillo
- [React Documentation](https://react.dev)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Recharts](https://recharts.org)

## 📧 Support

If you have questions or need help, feel free to:
- Open an [issue](https://github.com/your-username/pomodoro-tracker/issues)
- Check existing documentation
- Create a discussion

## 🎉 Happy Focusing!

Start tracking your productivity today and build better work habits with Pomodoro Tracker.

---

**Made with ❤️ using React, Firebase, and Claude**
