import { useState, useEffect } from 'react'
import { db, firebaseEnabled } from '../firebase'
import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore'
import { getTempUserId } from '../utils/tempUser'
import { useTheme } from '../contexts/ThemeContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const COLORS = {
  work: '#f43f5e',
  'short break': '#14b8a6',
  'long break': '#a855f7'
}

export default function Statistics() {
  const { darkMode } = useTheme()
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalMinutes: 0,
    workSessions: 0,
    breakSessions: 0
  })

  useEffect(() => {
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    // If Firebase is not configured, just show empty state
    if (!firebaseEnabled || !db) {
      console.log('Firebase not available. Statistics will show empty.')
      setSessions([])
      setLoading(false)
      return
    }

    try {
      const userId = getTempUserId()
      const sessionsRef = collection(db, 'users', userId, 'sessions')
      const q = query(sessionsRef, orderBy('startTime', 'desc'), limit(100))
      const querySnapshot = await getDocs(q)

      const sessionData = []
      querySnapshot.forEach((doc) => {
        sessionData.push({ id: doc.id, ...doc.data() })
      })

      setSessions(sessionData)
      calculateStats(sessionData)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching sessions:', error)
      setLoading(false)
    }
  }

  const calculateStats = (sessionData) => {
    const totalSessions = sessionData.length
    const totalMinutes = sessionData.reduce((sum, session) => sum + (session.duration / 60), 0)
    const workSessions = sessionData.filter(s => s.type === 'work').length
    const breakSessions = sessionData.filter(s => s.type !== 'work').length

    setStats({ totalSessions, totalMinutes, workSessions, breakSessions })
  }

  // Prepare data for charts
  const getSessionsByDate = () => {
    const dateMap = {}
    sessions.forEach(session => {
      const date = session.date
      if (!dateMap[date]) {
        dateMap[date] = { date, work: 0, break: 0 }
      }
      if (session.type === 'work') {
        dateMap[date].work++
      } else {
        dateMap[date].break++
      }
    })
    return Object.values(dateMap).slice(0, 7).reverse()
  }

  const getSessionsByType = () => {
    const typeMap = {}
    sessions.forEach(session => {
      typeMap[session.type] = (typeMap[session.type] || 0) + 1
    })
    return Object.entries(typeMap).map(([name, value]) => ({ name, value }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading statistics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Statistics</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Sessions</div>
          <div className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
            {stats.totalSessions}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Minutes</div>
          <div className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
            {Math.round(stats.totalMinutes)}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Work Sessions</div>
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            {stats.workSessions}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Break Sessions</div>
          <div className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            {stats.breakSessions}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Sessions by Date */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Sessions by Date</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getSessionsByDate()}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="date" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: darkMode ? 'none' : '1px solid #e5e7eb',
                  borderRadius: '8px',
                  color: darkMode ? '#f3f4f6' : '#1f2937'
                }}
                labelStyle={{ color: darkMode ? '#f3f4f6' : '#1f2937' }}
              />
              <Legend />
              <Bar dataKey="work" fill="#f43f5e" name="Work" />
              <Bar dataKey="break" fill="#14b8a6" name="Break" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Sessions by Type */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Sessions by Type</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={getSessionsByType()}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {getSessionsByType().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#666'} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: darkMode ? 'none' : '1px solid #e5e7eb',
                  borderRadius: '8px',
                  color: darkMode ? '#f3f4f6' : '#1f2937'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Sessions Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Recent Sessions</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold">Date</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold">Type</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold">Duration</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold">Time</th>
              </tr>
            </thead>
            <tbody>
              {sessions.slice(0, 10).map((session) => (
                <tr key={session.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-300">{session.date}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white`} style={{ backgroundColor: COLORS[session.type] }}>
                      {session.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-300">{session.duration / 60} min</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400 text-sm">
                    {new Date(session.startTime).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {sessions.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No sessions yet. Complete a pomodoro session to see statistics!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
