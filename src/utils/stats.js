/**
 * Pure helpers that turn a list of session documents into the numbers and
 * series the UI shows. Every function takes the sessions to summarise, so the
 * same code serves real data and the demo fallback.
 */

export const DAILY_GOAL = 8

// Local calendar day (YYYY-MM-DD). Using toISOString() would give the UTC day,
// which files late-night / early-morning sessions under the wrong date.
export const dateKey = (d = new Date()) => {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getSummary(sessions) {
  const work = sessions.filter((s) => s.type === 'work')
  const focusMinutes = work.reduce((sum, s) => sum + s.duration / 60, 0)
  return {
    totalSessions: sessions.length,
    focusMinutes: Math.round(focusMinutes),
    focusHours: Math.round((focusMinutes / 60) * 10) / 10,
    workSessions: work.length,
    breakSessions: sessions.length - work.length,
  }
}

export function getDailyData(sessions, days = 7) {
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

export function getTypeDistribution(sessions) {
  const map = {}
  sessions.forEach((s) => {
    map[s.type] = (map[s.type] || 0) + 1
  })
  return Object.entries(map).map(([name, value]) => ({ name, value }))
}

export function getTodayStats(sessions) {
  const key = dateKey()
  const work = sessions.filter((s) => s.date === key && s.type === 'work')
  return {
    workSessions: work.length,
    focusMinutes: Math.round(work.reduce((sum, s) => sum + s.duration / 60, 0)),
    goal: DAILY_GOAL,
  }
}

export function getStreak(sessions) {
  const daysWithWork = new Set(sessions.filter((s) => s.type === 'work').map((s) => s.date))
  let streak = 0
  const cursor = new Date()
  // An empty today shouldn't break an otherwise-active streak
  if (!daysWithWork.has(dateKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1)
  }
  while (daysWithWork.has(dateKey(cursor))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export function getRecentSessions(sessions, count = 8) {
  return [...sessions]
    .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
    .slice(0, count)
}
