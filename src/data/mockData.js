/**
 * Mock session data for the frontend-only build.
 *
 * This stands in for Firebase while we iterate on the UI. The shape matches the
 * real Firestore session document so swapping back to live data is a one-liner.
 */

const dateKey = (d) => {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const at = (daysAgo, hour, minute = 0) => {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  d.setHours(hour, minute, 0, 0)
  return d
}

// [daysAgo, number of work sessions that day]
const PLAN = [
  [13, 4], [12, 6], [11, 3], [10, 0], [9, 5], [8, 7], [7, 4],
  [6, 8], [5, 5], [4, 2], [3, 6], [2, 9], [1, 7], [0, 5],
]

function buildSessions() {
  const sessions = []
  let id = 0

  for (const [daysAgo, workCount] of PLAN) {
    let hour = 9
    for (let i = 0; i < workCount; i++) {
      const start = at(daysAgo, hour, 0)
      sessions.push({
        id: `mock-${id++}`,
        type: 'work',
        startTime: start.toISOString(),
        endTime: at(daysAgo, hour, 25).toISOString(),
        duration: 25 * 60,
        date: dateKey(start),
        completed: true,
      })

      const isLong = (i + 1) % 4 === 0
      const breakMin = isLong ? 15 : 5
      const breakStart = at(daysAgo, hour, 25)
      sessions.push({
        id: `mock-${id++}`,
        type: isLong ? 'long break' : 'short break',
        startTime: breakStart.toISOString(),
        endTime: at(daysAgo, hour, 25 + breakMin).toISOString(),
        duration: breakMin * 60,
        date: dateKey(breakStart),
        completed: true,
      })

      hour += 1
    }
  }

  return sessions.sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
}

export const mockSessions = buildSessions()

export const DAILY_GOAL = 8

export function getSummary(sessions = mockSessions) {
  const work = sessions.filter((s) => s.type === 'work')
  const focusMinutes = work.reduce((sum, s) => sum + s.duration / 60, 0)
  return {
    totalSessions: sessions.length,
    totalMinutes: Math.round(sessions.reduce((sum, s) => sum + s.duration / 60, 0)),
    focusMinutes: Math.round(focusMinutes),
    focusHours: Math.round((focusMinutes / 60) * 10) / 10,
    workSessions: work.length,
    breakSessions: sessions.length - work.length,
  }
}

export function getDailyData(days = 7, sessions = mockSessions) {
  const out = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = dateKey(d)
    const items = sessions.filter((s) => s.date === key)
    const work = items.filter((s) => s.type === 'work')
    out.push({
      date: key,
      label: d.toLocaleDateString('en-US', { weekday: 'short' }),
      work: work.length,
      break: items.length - work.length,
      minutes: Math.round(work.reduce((sum, s) => sum + s.duration / 60, 0)),
    })
  }
  return out
}

export function getTypeDistribution(sessions = mockSessions) {
  const map = {}
  sessions.forEach((s) => {
    map[s.type] = (map[s.type] || 0) + 1
  })
  return Object.entries(map).map(([name, value]) => ({ name, value }))
}

export function getTodayStats(sessions = mockSessions) {
  const key = dateKey(new Date())
  const items = sessions.filter((s) => s.date === key)
  const work = items.filter((s) => s.type === 'work')
  return {
    workSessions: work.length,
    focusMinutes: Math.round(work.reduce((sum, s) => sum + s.duration / 60, 0)),
    goal: DAILY_GOAL,
  }
}

export function getStreak(sessions = mockSessions) {
  const daysWithWork = new Set(
    sessions.filter((s) => s.type === 'work').map((s) => s.date)
  )
  let streak = 0
  const cursor = new Date()
  // Allow today to be empty without breaking an otherwise-active streak.
  if (!daysWithWork.has(dateKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1)
  }
  while (daysWithWork.has(dateKey(cursor))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export function getRecentSessions(count = 8, sessions = mockSessions) {
  return sessions.slice(0, count)
}
